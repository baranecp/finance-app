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
    <div className='w-full bg-gray-100 rounded-full h-2.5 overflow-hidden'>
      <div className='relative w-full h-2.5 rounded-full'>
        {/* Current filled portion */}
        <div
          className='absolute left-0 top-0 h-full bg-black transition-all duration-500 ease-out'
          style={{ width: `${percentage.toFixed(2)}%` }}
        />

        {/* Add animation (green overlay) */}
        {type === "add" && (
          <div
            className='absolute top-0 h-full bg-green-600 transition-all duration-500 ease-out'
            style={{
              left: `${percentage.toFixed(2)}%`,
              width: `${addPercentage.toFixed(2)}%`,
            }}
          />
        )}

        {/* Withdraw animation (red overlay) */}
        {type === "withdraw" && (
          <div
            className='absolute top-0 h-full bg-red-500 transition-all duration-500 ease-out'
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
