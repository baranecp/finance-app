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
  return (
    <div className='flex justify-between items-center'>
      <p style={{ color: color }} className='text-grey-500 body-s'>
        {name}
      </p>
      <span
        style={{ color: color }}
        className='text-grey-900 body-s-bold'>{`${totalBills} ($${total.toFixed(
        2
      )})`}</span>
    </div>
  );
}
