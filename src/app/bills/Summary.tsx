"use client";
import { useAnimatedValue } from "@/hooks/useAnimatedValue";
import BillsIcon from "../../../public/bills.svg";
export default function Summary({ total }: { total: number }) {
  const totalBills = useAnimatedValue(total, 700, {
    isCurrency: false,
    decimals: 2,
  });
  return (
    <div className='bg-grey-900 text-white flex flex-col gap-8 p-6 rounded-[12px]'>
      <div className='text-white'>
        <BillsIcon width='32' height='32' />
      </div>
      <div>
        <h3 className='body-m mb-2.5'>Total Bills</h3>
        <span className='heading-xl'>${totalBills}</span>
      </div>
    </div>
  );
}
