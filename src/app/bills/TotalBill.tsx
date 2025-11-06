"use client";
import { useEffect, useState } from "react";

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
  const [displayBills, setDisplayBills] = useState(0);
  const [displayTotal, setDisplayTotal] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 700; // animation duration in ms

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setDisplayBills(Math.floor(eased * totalBills));
      setDisplayTotal(eased * total);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [totalBills, total]);

  return (
    <div className='flex justify-between items-center'>
      <p style={{ color: color }} className='text-grey-500 body-m'>
        {name}
      </p>
      <span
        style={{ color: color }}
        className='text-grey-900 body-m-bold'>{`${displayBills} ($${displayTotal.toFixed(
        2
      )})`}</span>
    </div>
  );
}
