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
    <div className='flex flex-wrap relative overflow-hidden items-center pb-4 justify-between after:content-[""] after:absolute after:left-0 after:right-0 after:bottom-0  after:h-px after:bg-grey-100 last:after:hidden last:pb-0 last:mb-0'>
      <div className='flex items-center gap-4'>
        <div
          style={{ backgroundColor: theme }}
          className={`w-[4px] h-[20px] rounded-full shrink-0`}></div>
        <span className='body-m text-grey-500'>{category}</span>
      </div>
      <div className='flex gap-2 pl-4'>
        <span className='body-m-bold'>${spent}</span>
        <span className='body-s text-grey-500'>of ${maximum}</span>
      </div>
    </div>
  );
}
