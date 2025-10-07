import Transaction from "@/components/Transaction";
import { db } from "@/db/drizzle";
import { transactions } from "@/db/schema";
import { ilike, sql } from "drizzle-orm";
import { Pagination } from "./Pagination";

const ITEMS_PER_PAGE = 10;

const TransactionsList = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const all = await db
    .select()
    .from(transactions)
    .where(query ? ilike(transactions.name, `%${query}%`) : sql`true`)
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  const filteredTransactions = all
    ? all.filter((transaction) => {
        return transaction.name
          .toLowerCase()
          .includes(query.toLocaleLowerCase());
      })
    : [];

  const totalCount = (
    await db
      .select({ count: sql<number>`count(*)` })
      .from(transactions)
      .where(query ? ilike(transactions.name, `%${query}%`) : sql`true`)
  )[0].count;

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div>
      {all && all.length === 0 && <p>No transactions found</p>}
      {all &&
        filteredTransactions.map((transaction) => {
          const formattedDate = new Date(transaction.date).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          );
          return (
            <Transaction
              key={transaction.id}
              id={transaction.id}
              avatar={transaction.avatar || ""}
              name={transaction.name}
              type={transaction.type}
              amount={transaction.amount}
              date={formattedDate}
            />
          );
        })}

      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};
export default TransactionsList;
