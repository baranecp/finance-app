"use client";

import { useQuery } from "@tanstack/react-query";
import type { Pots } from "@/types/finance";
import PotsIcon from "../../public/pots.svg";
import OverviewCard from "./OverviewCard";

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
    <section className='flex flex-col gap-5  w-full md:w-1/2 -5 bg-white mt-8 px-5 py-6 rounded-[12px]'>
      <div className='flex justify-between'>
        <h2 className='heading-l'>Pots</h2>
        <button className='body-m text-grey-500'>See Details</button>
      </div>
      <OverviewCard
        icon={PotsIcon}
        iconColor='text-[#277C78]'
        text='Total Saved'
        sum='$850'
        color='text-grey-500'
        sumColor='text-grey-900'
        background='bg-beige-100'
      />
      <div className='grid grid-cols-2 grid-rows-2 gap-4'>
        {data.map((pot) => (
          <div key={pot.id} className='flex overflow-hidden'>
            <div className='w-[4px] h-full bg-amber-300 rounded-full'></div>
            <div className='flex flex-col gap-2 pl-4'>
              <span className='body-s text-grey-500'>{pot.name}</span>
              <span className='body-m-bold'>${pot.saved}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
