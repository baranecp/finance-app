import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { desc } from "drizzle-orm";
import { transactions } from "@/db/schema";

export async function GET() {
  try {
    const lastFive = await db.select().from(transactions).orderBy(desc(transactions.date)).limit(5);
    return NextResponse.json(lastFive);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}
