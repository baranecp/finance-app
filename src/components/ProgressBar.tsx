export default function ProgressBar({
  type,
  percentage,
  addPercentage,
  withdrawStart,
}: {
  type: string;
  height?: string;
  percentage: number;
  addPercentage: number;
  withdrawStart: number;
}) {
  return (
    <div className='w-full bg-gray-100 rounded-full h-2.5'>
      <div className='relative w-full h-2.5 rounded-full overflow-hidden'>
        <div
          className='absolute left-0 top-0 h-full bg-black'
          style={{ width: `${percentage.toFixed(2)}%` }}
        />
        {type === "add" && (
          <div
            className='absolute top-0 h-full bg-green-600 transition-all duration-100'
            style={{
              left: `${percentage.toFixed(2)}%`,
              width: `${addPercentage.toFixed(2)}%`,
            }}
          />
        )}
        {type === "withdraw" && (
          <div
            className='absolute top-0 h-full bg-red-500 transition-all duration-100'
            style={{
              left: `${withdrawStart.toFixed(2)}%`,
              width: `${addPercentage.toFixed(2)}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}
