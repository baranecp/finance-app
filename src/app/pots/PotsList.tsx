"use client";
import Pot from "./Pot";
import { getPots } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";

export default function PotsList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["pots"],
    queryFn: getPots,
  });
  if (error) <h2>{error.message}</h2>;
  if (isLoading) <h2>Fetching data...</h2>;
  if (data)
    return (
      <div className='grid lg:grid-cols-2 gap-6 grid-cols-1'>
        {data.data?.map((pot) => {
          const total = Number(pot.total);
          const target = Number(pot.target);
          const percentage = Math.floor((total / target) * 100 * 100) / 100;
          return (
            <Pot
              key={pot.id}
              name={pot.name}
              theme={pot.theme}
              total={total}
              target={target}
              percentage={percentage}
            />
          );
        })}
      </div>
    );
}
