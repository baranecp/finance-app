interface BudgetSpending {
  category: string;
  theme: string;
  maximum: number;
  spent: number;
}

export default function BudgetSpending({
  category,
  theme,
  maximum,
  spent,
}: BudgetSpending) {
  return (
    <div className='flex overflow-hidden items-center justify-between'>
      <div className='flex items-center gap-4'>
        <div
          style={{ backgroundColor: theme }}
          className={`w-[4px] h-[45px] rounded-full shrink-0`}></div>
        <span className='body-s text-grey-500'>{category}</span>
      </div>
      <div className='flex gap-2 pl-4'>
        <span className='body-m-bold'>${spent}</span>
        <span className='body-s text-grey-500'>of ${maximum}</span>
      </div>
    </div>
  );
}
