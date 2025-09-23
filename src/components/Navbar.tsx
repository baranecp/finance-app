"use client";
import OverviewIcon from "../../public/overview.svg";
import BillsIcon from "../../public/bills.svg";
import BudgetsIcon from "../../public/budgets.svg";
import PotsIcon from "../../public/pots.svg";
import TransactionsIcon from "../../public/transactions.svg";

const navItems = [
  { icon: OverviewIcon, label: "Overview" },
  { icon: TransactionsIcon, label: "Transactions" },
  { icon: BudgetsIcon, label: "Budgets" },
  { icon: PotsIcon, label: "Pots" },
  { icon: BillsIcon, label: "Bills" },
];

export default function Navbar() {
  return (
    <>
      {/* === Mobile Navbar === */}
      <section className='w-full bg-grey-900 fixed bottom-0 rounded-t-lg overflow-hidden lg:hidden'>
        <nav>
          <ul className='flex justify-between px-4 pt-2'>
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <li
                  key={idx}
                  className='flex flex-col items-center justify-center
                           w-[4.25rem] h-[2.75rem] md:w-[6.5rem] md:h-[4.125rem]
                           group border-b-4 border-transparent
                           hover:bg-beige-100 hover:border-secondary-green
                           rounded-t-lg transition-colors duration-150 cursor-pointer'>
                  <Icon className='w-6 h-6 text-grey-300 group-hover:text-secondary-green transition-colors' />
                  <span className='hidden md:block text-xs text-grey-300 group-hover:text-grey-900 mt-1'>
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </nav>
      </section>
    </>
  );
}
