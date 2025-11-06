"use client";

import { useAnimatedValue } from "@/hooks/useAnimatedValue";

export default function TotalBill({
  name,
  totalBills,
  total,
  color,
}: {
  name: string;
  totalBills: number;
  total: number;
  color?: string;
}) {
  const displayBills = useAnimatedValue(totalBills, 700, {
    isCurrency: false,
    decimals: 0,
  });

  const displayTotal = useAnimatedValue(total, 700, {
    isCurrency: true,
  });

  return (
    <div className='flex justify-between items-center'>
      <p style={{ color: color }} className='text-grey-500 body-m'>
        {name}
      </p>
      <span
        style={{ color: color }}
        className='text-grey-900 body-m-bold'>{`${displayBills} ${displayTotal}`}</span>
    </div>
  );
}
