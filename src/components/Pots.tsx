"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { GoTriangleRight } from "react-icons/go";
import PotsIcon from "../../public/pots.svg";
import OverviewCard from "./OverviewCard";
import Pot from "./Pot";
import { getPots } from "@/server/actions";

export default function Pots() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["pots", "home"],
    queryFn: getPots,
  });

  const totalSaved = data?.data?.reduce(
    (acc, pot) => acc + Number(pot.total),
    0
  );

  const latestPots = data?.data
    ?.sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 4);

  if (isLoading) return <p>Loading pots.</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!data) return <p>No transactions found.</p>;

  return (
    <section className='flex flex-col gap-5 w-full bg-white mt-8 px-5 py-6 rounded-[12px]'>
      {/* Header */}
      <div className='flex justify-between'>
        <h2 className='heading-l'>Pots</h2>
        <button
          className='body-m text-grey-500 flex items-center gap-2 cursor-pointer'
          onClick={() => router.push("/pots")}>
          See Details <GoTriangleRight />
        </button>
      </div>

      {/* Responsive container for OverviewCard + Pots */}
      <div className='flex flex-wrap gap-5 mt-5 md:mt-0 items-center'>
        {/* OverviewCard */}
        <div className='flex-shrink-0 md:flex-1 min-w-[200px] max-w-[300px]'>
          <OverviewCard
            icon={PotsIcon}
            iconColor='green'
            text='Total Saved'
            sum={`$${totalSaved}`}
            color='gray'
            sumColor='gray'
            background='beige'
            className='items-center w-full h-full'
          />
        </div>

        {/* Pots grid */}
        <div className='flex flex-wrap gap-5'>
          {latestPots?.map((pot) => (
            <Pot
              key={pot.id}
              id={pot.id}
              name={pot.name}
              total={pot.total}
              theme={pot.theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
