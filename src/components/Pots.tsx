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
    queryKey: ["pots", 4],
    queryFn: getPots,
  });

  const totalSaved = data?.data?.reduce(
    (acc, pot) => acc + Number(pot.total),
    0
  );

  if (isLoading) return <p>Loading pots.</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!data) return <p>No transactions found.</p>;

  return (
    <section className='flex flex-col gap-5 w-full lg:max-w-[700px] bg-white mt-8 px-5 py-6 rounded-[12px]'>
      <div className='flex justify-between'>
        <h2 className='heading-l'>Pots</h2>
        <button
          className='body-m text-grey-500 flex items-center gap-2 cursor-pointer'
          onClick={() => router.push("/pots")}>
          See Details <GoTriangleRight />
        </button>
      </div>
      <div className='md:flex gap-5'>
        <OverviewCard
          icon={PotsIcon}
          iconColor='green'
          text='Total Saved'
          sum={`$${totalSaved}`}
          color='gray'
          sumColor='gray'
          background='beige'
          className='max-w-[300px] max-h-[200px] items-center'
        />
        <div className='grid grid-cols-2 grid-rows-2 gap-4 md:gap-x-20 mt-5 md:mt-0'>
          {data.data?.map((pot) => (
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
