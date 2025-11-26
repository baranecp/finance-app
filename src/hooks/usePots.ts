"use client";
import { useQuery } from "@tanstack/react-query";
import { getPots } from "@/server/actions";

export function usePots() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["pots"],
    queryFn: getPots,
  });

  const pots =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?.data?.map((pot: any) => ({
      ...pot,
      total: Number(pot.total),
      target: Number(pot.target),
      percentage:
        Math.floor((Number(pot.total) / Number(pot.target)) * 10000) / 100,
    })) || [];

  return { pots, error, isLoading };
}
