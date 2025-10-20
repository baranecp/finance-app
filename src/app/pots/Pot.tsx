"use client";
import PotDropdownButton from "./PotDropdownButton";

type PotProps = {
  pot: {
    id: string;
    name: string;
    total: number;
    target: number;
    theme?: string;
    percentage?: number;
  };
  onAddMoney: () => void;
  onWithdraw: () => void;
};

export default function Pot({ pot, onAddMoney, onWithdraw }: PotProps) {
  const { name, total, target, theme, percentage } = pot;

  return (
    <div className='bg-white  p-6 flex flex-col gap-11 rounded-[12px]'>
      <div className='flex justify-between items-center '>
        <h1
          className={`relative heading-l inline-flex items-center gap-4 before:content-[""] before:bg-[color:var(--theme)]  before:w-5 before:h-5  before:rounded-full`}
          style={{ "--theme": theme } as React.CSSProperties}>
          {name}
        </h1>
        <PotDropdownButton pot={pot} />
      </div>
      <div>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-grey-500 body-m'>Total Saved</h2>
          <h2 className='text-grey-900 heading-xl'>${total}</h2>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
          <div
            className='bg-[color:var(--theme)] h-2.5 rounded-full'
            style={
              {
                "--theme": theme,
                width: percentage + "%",
              } as React.CSSProperties
            }
          />
        </div>
        <div className='flex justify-between items-center mt-3'>
          <p>%{percentage}</p>
          <p>Target of ${target}</p>
        </div>
      </div>
      <div className='w-full flex justify-around gap-4'>
        <button
          onClick={onAddMoney}
          className='p-4 flex-1 bg-beige-100 body-m-bold rounded-[8px] cursor-pointer'>
          + Add Money
        </button>
        <button
          onClick={onWithdraw}
          className='p-4 flex-1 bg-beige-100 body-m-bold rounded-[8px] cursor-pointer'>
          Withdraw
        </button>
      </div>
    </div>
  );
}
