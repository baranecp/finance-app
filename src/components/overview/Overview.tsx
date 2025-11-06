"use client";
import OverviewCard from "./OverviewCard";
export default function Overview() {
  return (
    <>
      <h1 className='heading-xl'>Overview</h1>
      <section className='flex  flex-col md:flex-row gap-6 mt-8 md:mt-10'>
        <OverviewCard
          color='white'
          background='gray'
          text='Current Balance'
          sum='$4,835.00'
        />
        <OverviewCard
          color='gray'
          sumColor='gray'
          background='white'
          text='Income'
          sum='$3,814.25'
        />
        <OverviewCard
          color='gray'
          sumColor='gray'
          background='white'
          text='Expenses'
          sum='$1,700.50'
        />
      </section>
    </>
  );
}
