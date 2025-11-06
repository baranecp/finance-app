"use client";
import Summary from "./Summary";
import { Bill, categorizeBills } from "@/util/bills";
import { useReccuringBills } from "@/hooks/useBills";
import TotalBills from "./TotalBills";
import { useMemo } from "react";

export default function SummaryBills() {
  const { data } = useReccuringBills({});
  const bills = data?.data?.filter((t: Bill) => t.recurring);
  const { totals } = useMemo(() => categorizeBills(bills || []), [bills]);

  return (
    <div className='flex flex-col flex-wrap  gap-6'>
      <Summary total={totals.totalBills} />
      <TotalBills />
    </div>
  );
}
