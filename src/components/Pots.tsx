"use client";

import { useQuery } from "@tanstack/react-query";
import type { Pots } from "@/types/finance";
import PotsIcon from "../../public/pots.svg";
import OverviewCard from "./OverviewCard";
import Pot from "./Pot";

export default function Pots() {
  const { data, isLoading, error } = useQuery<Pots[]>({
    queryKey: ["pots"],
    queryFn: async () => {
      const res = await fetch("/api/pots");
      if (!res.ok) throw new Error("Failed to fecth transactions");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!data) return <p>No transactions found.</p>;

  return (
    <section className='flex flex-col gap-5 w-full lg:max-w-[700px] bg-white mt-8 px-5 py-6 rounded-[12px]'>
      <div className='flex justify-between'>
        <h2 className='heading-l'>Pots</h2>
        <button className='body-m text-grey-500'>See Details</button>
      </div>
      <div className='md:flex gap-5'>
        <OverviewCard
          icon={PotsIcon}
          iconColor='green'
          text='Total Saved'
          sum='$850'
          color='gray'
          sumColor='gray'
          background='beige'
          className='max-w-[300px]'
        />
        <div className='grid grid-cols-2 grid-rows-2 gap-4 md:gap-x-20 mt-5 md:mt-0'>
          {data.map((pot) => (
            <Pot
              key={pot.id}
              id={pot.id}
              name={pot.name}
              saved={pot.saved}
              color={pot.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
