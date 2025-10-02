import { db } from "@/db/drizzle";
import { pots } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
 try {
    const firstFour = await db.select().from(pots).orderBy(desc(pots.total)).limit(4);
    return NextResponse.json(firstFour);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}

