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
      <section className='container bg-grey-900 fixed bottom-0 left-0 rounded-t-lg overflow-hidden md:hidden'>
        <nav>
          <ul className='flex justify-between px-4 pt-2'>
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <li
                  key={idx}
                  className='group px-6 py-3 self-center border-b-4 border-transparent hover:bg-beige-100 hover:border-secondary-green rounded-t-lg transition-colors duration-150 cursor-pointer'>
                  <Icon className='w-auto h-auto text-grey-300 group-hover:text-secondary-green transition-colors' />
                </li>
              );
            })}
          </ul>
        </nav>
      </section>
    </>
  );
}
