import BillsIcon from "../../../public/bills.svg";
export default function Summary({ total }: { total: number }) {
  return (
    <div className='bg-grey-900 text-white flex flex-col gap-8 p-6 rounded-[12px]'>
      <div className='text-white'>
        <BillsIcon width='32' height='32' />
      </div>
      <div>
        <h3 className='body-m mb-2.5'>Total Bills</h3>
        <span className='heading-xl'>${total}</span>
      </div>
    </div>
  );
}
