import { categorizeBills } from "@/util/bills";
import TotalBill from "./TotalBill";
import { useReccuringBills } from "@/hooks/useBills";
import { useMemo } from "react";

export default function TotalBills() {
  const { data } = useReccuringBills({});

  const recurringBills = useMemo(() => data?.data || [], [data]);
  const { paid, due, upcoming, totals } = useMemo(
    () => categorizeBills(recurringBills),
    [recurringBills]
  );

  return (
    <div className='p-5 bg-white rounded-[12px]'>
      <h3 className='text-grey-900 heading-l mb-5'>Summary</h3>
      <div className='flex flex-col gap-8'>
        <TotalBill
          name='Paid Bills'
          totalBills={paid.length}
          total={totals.paidTotal}
        />
        <TotalBill
          name='Total Upcoming'
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
