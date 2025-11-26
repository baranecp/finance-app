"use client";
import { useState, useEffect, ReactNode } from "react";
import { useIsFetching } from "@tanstack/react-query";

type Props = { children: ReactNode };

export default function HomePageWrapper({ children }: Props) {
  const isFetching = useIsFetching({
    predicate: (query) => {
      const key = query.queryKey;
      return (
        Array.isArray(key) &&
        [
          "latest-transactions",
          "budgetsWithTransactions",
          "pots",
          "bills",
        ].includes(key[0] as string)
      );
    },
  });

  const [hydrated, setHydrated] = useState(false);

  // Wait for client hydration
  useEffect(() => setHydrated(true), []);

  // Block rendering until hydrated AND all queries done
  if (!hydrated || isFetching > 0) return null;

  return <>{children}</>;
}
