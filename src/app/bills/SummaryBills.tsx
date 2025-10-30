"use client";
import Summary from "./Summary";
import { useMemo } from "react";
import { Bill, categorizeBills } from "@/util/bills";
import { useBills } from "@/hooks/useBills";
import TotalBills from "./TotalBills";

export default function SummaryBills() {
  const { data } = useBills();
  const bills = data?.data?.filter((t: Bill) => t.recurring);
  const { totals } = useMemo(() => categorizeBills(bills || []), [bills]);

  return (
    <div className='flex flex-col flex-wrap  gap-6'>
      <Summary total={totals.totalBills} />
      <TotalBills />
    </div>
  );
}
