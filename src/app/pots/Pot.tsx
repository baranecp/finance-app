"use client";

import { getPots } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";

export default function Pot() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["pots"],
    queryFn: getPots,
  });
  if (error) <h2>{error.message}</h2>;
  if (isLoading) <h2>Fetching data...</h2>;
  if (data)
    return (
      <div>
        <h1>{data.data?.map((pot) => pot.name)}</h1>
      </div>
    );
}
