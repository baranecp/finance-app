"use client";
import OverviewIcon from "../../public/overview.svg";
import BillsIcon from "../../public/bills.svg";
import BudgetsIcon from "../../public/budgets.svg";
import PotsIcon from "../../public/pots.svg";
import TransactionsIcon from "../../public/transactions.svg";

export default function Navbar() {
  return (
    <section className='container bg-grey-900 fixed bottom-0 left-0 rounded-t-lg overflow-hidden'>
      <nav>
        <ul className='flex justify-between px-4 pt-2'>
          <li className='group px-6 py-3 self-center border-b-4 border-transparent hover:bg-beige-100 hover:border-secondary-green rounded-t-lg antialiased transition-colors duration-150 cursor-pointer'>
            <OverviewIcon className='w-auto h-auto text-grey-300 group-hover:text-secondary-green transition-colors' />
          </li>
          <li className='group px-6 py-3 self-center border-b-4 border-transparent hover:bg-beige-100 hover:border-secondary-green rounded-t-lg transition-colors duration-150 cursor-pointer'>
            <TransactionsIcon className='w-auto h-auto text-grey-300 group-hover:text-secondary-green transition-colors' />
          </li>
          <li className='group px-6 py-3 self-center border-b-4 border-transparent hover:bg-beige-100 hover:border-secondary-green rounded-t-lg transition-colors duration-150 cursor-pointer'>
            <BudgetsIcon className='w-auto h-auto text-grey-300 group-hover:text-secondary-green transition-colors' />
          </li>
          <li className='group px-6 py-3 self-center border-b-4 border-transparent hover:bg-beige-100 hover:border-secondary-green rounded-t-lg transition-colors duration-150 cursor-pointer'>
            <PotsIcon className='w-auto h-auto text-grey-300 group-hover:text-secondary-green transition-colors' />
          </li>
          <li className='group px-6 py-3 self-center border-b-4 border-transparent hover:bg-beige-100 hover:border-secondary-green rounded-t-lg transition-colors duration-150 cursor-pointer'>
            <BillsIcon className='w-auto h-auto text-grey-300 group-hover:text-secondary-green transition-colors' />
          </li>
        </ul>
      </nav>
    </section>
  );
}
