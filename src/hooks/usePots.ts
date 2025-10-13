"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPots } from "@/server/actions";
import { usePotsStore } from "@/store/potsStore";

export function usePots() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["pots"],
    queryFn: getPots,
  });

  const { pots, setPots } = usePotsStore();

  useEffect(() => {
    if (data?.data) {
      const formatted = data.data.map((pot) => ({
        ...pot,
        total: Number(pot.total),
        target: Number(pot.target),
        percentage:
          Math.floor((Number(pot.total) / Number(pot.target)) * 10000) / 100,
      }));
      setPots(formatted);
    }
  }, [data, setPots]);

  return { pots, error, isLoading };
}
