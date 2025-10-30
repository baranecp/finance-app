export interface BillType {
  name: string;
  total: string | number;
  color: string;
}

export default function BillCard({ total, name, color }: BillType) {
  return (
    <span
      style={{ borderColor: color }}
      className='flex justify-between items-center py-5 px-4 bg-beige-100 border-l-4 rounded-l-md rounded-r-md'>
      <h3 className='text-grey-500 body-m'>{name}</h3>
      <p className='text-grey-900 body-m-bold'>${total}</p>
    </span>
  );
}
