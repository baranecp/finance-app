"use server";
import { db } from "@/db/drizzle";
import { pots } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getPots({
  queryKey,
}: {
  queryKey: (string | number | undefined)[];
}) {
  const limit = queryKey[1] as number | undefined;

  try {
    const baseQuery = db.select().from(pots).orderBy(desc(pots.name));
    const queryWithLimit = limit ? baseQuery.limit(limit) : baseQuery;

    const data = await queryWithLimit;
    return { data };
  } catch (error) {
    return { error };
  }
}
