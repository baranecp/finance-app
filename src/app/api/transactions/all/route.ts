import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { transactions } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allTransactions = await db.select().from(transactions).orderBy(desc(transactions.date));
    return NextResponse.json(allTransactions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}
