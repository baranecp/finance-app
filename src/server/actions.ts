"use server";
import { db } from "@/db/drizzle";
import { budgets, pots, transactions } from "@/db/schema";
import {
  BudgetWithTransactions,
  RawTransactionRow,
  Transaction,
} from "@/types/finance";
import { desc } from "drizzle-orm";
import { eq, sql } from "drizzle-orm";

interface FetchTransactionsOptions {
  query?: string;
  sortBy?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}

export async function getPots({
  queryKey,
}: {
  queryKey: (string | number | undefined)[];
}) {
  const limit = queryKey[1] as number | undefined;

  try {
    const baseQuery = db.select().from(pots).orderBy(desc(pots.createdAt));
    const queryWithLimit = limit ? baseQuery.limit(limit) : baseQuery;

    const data = await queryWithLimit;
    return { data };
  } catch (error) {
    return { error };
  }
}

export async function updatePotTotal(
  id: string,
  amount: number,
  type: "add" | "withdraw"
) {
  try {
    const sign = type === "add" ? "+" : "-";

    const [updatedPot] = await db
      .update(pots)
      .set({
        total: sql`${pots.total} ${sql.raw(sign)} ${amount}`,
      })
      .where(eq(pots.id, id))
      .returning();

    return { data: updatedPot };
  } catch (error) {
    console.error("Error updating pot total:", error);
    return { error };
  }
}

export async function updatePot(
  id: string,
  data: {
    name?: string;
    target?: number;
    theme?: string;
  }
) {
  try {
    await db
      .update(pots)
      .set({
        ...(data.name !== undefined && { name: data.name }),
        ...(data.target !== undefined && { target: data.target.toString() }),
        ...(data.theme !== undefined && { theme: data.theme }),
      })
      .where(eq(pots.id, id))
      .returning();

    return { success: true };
  } catch (error) {
    console.error("Failed to update pot:", error);
    throw new Error("Failed to update pot");
  }
}

export async function createPot(name: string, theme: string, target: number) {
  await db.insert(pots).values({
    name,
    theme,
    target: target.toString(),
    total: "0",
  });
}

export async function deletePot(potId: string) {
  await db.delete(pots).where(eq(pots.id, potId));
}

/* TRANSACTIONS */

export async function getTransactions({
  queryKey,
}: {
  queryKey: (string | number | undefined)[];
}) {
  // Only use limit if the second item is actually a number
  const limit =
    typeof queryKey[1] === "number" ? (queryKey[1] as number) : undefined;

  try {
    const baseQuery = db
      .select()
      .from(transactions)
      .orderBy(desc(transactions.name));

    const queryWithLimit =
      typeof limit === "number" ? baseQuery.limit(limit) : baseQuery;

    const data = await queryWithLimit;
    return { data };
  } catch (error) {
    return { error };
  }
}

export async function fetchTransactions({
  query,
  sortBy = "latest",
  category = "all",
  page = 1,
  pageSize = 10,
}: FetchTransactionsOptions) {
  let all = await db.select().from(transactions);

  // Filter by category
  if (category.toLowerCase() !== "all") {
    all = all.filter(
      (t) => t.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by search query
  if (query) {
    all = all.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()));
  }

  // Sort
  all.sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "a-z":
        return a.name
          .trim()
          .toLowerCase()
          .localeCompare(b.name.trim().toLowerCase());
      case "z-a":
        return b.name
          .trim()
          .toLowerCase()
          .localeCompare(a.name.trim().toLowerCase());
      case "highest":
        return +b.amount - +a.amount;
      case "lowest":
        return +a.amount - +b.amount;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(all.length / pageSize);
  const start = (page - 1) * pageSize;

  const paginatedTransactions = all.slice(start, start + pageSize).map((t) => ({
    ...t,
    date: t.date,
  }));

  return { data: paginatedTransactions, totalPages };
}

export async function fetchCategories() {
  const all = await db
    .select({ category: transactions.category })
    .from(transactions);
  const unique = Array.from(new Set(all.map((t) => t.category)));
  return unique;
}

export async function fetchLatestTransactions() {
  const latest = await db
    .select()
    .from(transactions)
    .orderBy(desc(transactions.date))
    .limit(5);

  const formatted = latest.map((t) => ({
    ...t,
    avatar: t.avatar || "/default-avatar.png", // fallback for null
    date: new Date(t.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));

  return formatted;
}

interface FetchBillsOptions {
  query?: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export async function fetchBills({
  query,
  sortBy = "latest",
  page = 1,
  pageSize = 10,
}: FetchBillsOptions) {
  // Get all transactions
  let all = await db.select().from(transactions);

  // Filter recurring only
  all = all.filter((t) => t.recurring);

  // Filter by search query
  if (query) {
    all = all.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()));
  }

  // Sort
  all.sort((a, b) => {
    console.log("SortBy:", sortBy);
    switch (sortBy) {
      case "latest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "a-z":
        return a.name
          .trim()
          .toLowerCase()
          .localeCompare(b.name.trim().toLowerCase());
      case "z-a":
        return b.name
          .trim()
          .toLowerCase()
          .localeCompare(a.name.trim().toLowerCase());
      case "highest":
        return +b.amount - +a.amount;
      case "lowest":
        return +a.amount - +b.amount;
      default:
        return 0;
    }
  });

  // Deduplicate by name (keep first occurrence, which is already sorted)
  const uniqueMap = new Map<string, (typeof all)[0]>();
  all.forEach((t) => {
    if (!uniqueMap.has(t.name)) {
      uniqueMap.set(t.name, t);
    }
  });
  all = Array.from(uniqueMap.values());

  // Pagination
  const totalPages = Math.ceil(all.length / pageSize);
  const start = (page - 1) * pageSize;

  const paginatedBills = all.slice(start, start + pageSize).map((t) => ({
    id: t.id,
    name: t.name,
    avatar: t.avatar || "/default-avatar.png",
    category: t.category,
    type: t.type,
    recurring: t.recurring,
    amount: t.amount,
    date: t.date,
  }));

  return { data: paginatedBills, totalPages };
}

/* BUDGETS */

export async function getBudgetsWithTransactions(
  limitPerCategory = 3
): Promise<BudgetWithTransactions[]> {
  const allBudgets = await db
    .select()
    .from(budgets)
    .orderBy(desc(budgets.createdAt));
  const latestTxResult = await db.execute(
    sql`
      SELECT *
      FROM (
        SELECT *,
               ROW_NUMBER() OVER (PARTITION BY category ORDER BY date DESC) as rn
        FROM ${transactions}
      ) sub
      WHERE rn <= ${limitPerCategory};
    `
  );

  const transactionsRows = latestTxResult.rows as RawTransactionRow[];

  const combined: BudgetWithTransactions[] = allBudgets.map((budget) => ({
    id: budget.id,
    category: budget.category,
    maximum: Number(budget.maximum),
    theme: budget.theme,
    transactions: transactionsRows
      .filter((t) => t.category === budget.category)
      .map(
        (t): Transaction => ({
          id: String(t.id),
          name: String(t.name),
          avatar: t.avatar || "/default-avatar.png",
          category: String(t.category),
          type: t.type === "income" ? "income" : "expense",
          amount: Number(t.amount),
          date: new Date(t.date).toISOString(),
          recurring: Boolean(t.recurring),
        })
      ),
  }));

  return combined;
}

export async function getBudgets({
  queryKey,
}: {
  queryKey: (string | number | undefined)[];
}) {
  const limit = queryKey[1] as number | undefined;

  try {
    const baseQuery = db
      .select()
      .from(budgets)
      .orderBy(desc(budgets.createdAt));
    const queryWithLimit = limit ? baseQuery.limit(limit) : baseQuery;

    const data = await queryWithLimit;
    return { data };
  } catch (error) {
    return { error };
  }
}

export async function createBudget(
  category: string,
  theme: string,
  maximum: number
): Promise<BudgetWithTransactions> {
  const [newBudget] = await db
    .insert(budgets)
    .values({
      category,
      theme,
      maximum: maximum.toString(),
    })
    .returning();

  return {
    id: newBudget.id,
    category: newBudget.category,
    maximum: Number(newBudget.maximum),
    theme: newBudget.theme,
    transactions: [],
  };
}

export async function updateBudget(
  id: string,
  data: {
    category?: string;
    theme?: string;
    maximum?: number;
  }
) {
  try {
    await db
      .update(budgets)
      .set({
        ...(data.category !== undefined && { category: data.category }),
        ...(data.maximum !== undefined && { maximum: data.maximum.toString() }),
        ...(data.theme !== undefined && { theme: data.theme }),
      })
      .where(eq(budgets.id, id))
      .returning();

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to update budget:", error);
    return { success: false, error: "Failed to update budget" };
  }
}

export async function deleteBudget(budgetId: string) {
  await db.delete(budgets).where(eq(budgets.id, budgetId));
  console.log(budgets.id);
}
