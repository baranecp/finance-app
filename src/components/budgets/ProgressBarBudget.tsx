export default function ProgressBarBudget({
  percentage,
  theme,
}: {
  percentage: number;
  theme: string;
}) {
  return (
    <div className='w-full bg-gray-100 rounded-full h-6'>
      <div className='relative w-full h-6 rounded-full overflow-hidden'>
        <div
          className='absolute left-0 top-0 h-full'
          style={{
            width: `${percentage.toFixed(2)}%`,
            backgroundColor: `${theme}`,
          }}
        />
      </div>
    </div>
  );
}
