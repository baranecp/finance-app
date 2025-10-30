import { Bill, categorizeBills } from "@/util/bills";
import TotalBill from "./TotalBill";
import { useMemo } from "react";
import { useBills } from "@/hooks/useBills";

export default function TotalBills() {
  const { data } = useBills();
  const bills = data?.data?.filter((t: Bill) => t.recurring);
  const { totals, due, upcoming, paid } = useMemo(
    () => categorizeBills(bills || []),
    [bills]
  );

  return (
    <div className='p-5 bg-white rounded-[12px]'>
      <h3 className='text-grey-900 heading-m mb-5'>Summary</h3>
      <div className='flex flex-col gap-8'>
        <TotalBill
          name='Paid Bills'
          totalBills={paid.length}
          total={totals.paidTotal}
        />
        <TotalBill
          name='Totla Upcoming'
          totalBills={upcoming.length}
          total={totals.upcomingTotal}
        />
        <TotalBill
          name='Due Soon'
          color='#C94736'
          totalBills={due.length}
          total={totals.dueTotal}
        />
      </div>
    </div>
  );
}
