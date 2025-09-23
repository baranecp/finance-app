"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar / Tablet Navbar */}
      <section className='w-full bg-grey-900 fixed bottom-0 rounded-t-lg overflow-hidden lg:hidden'>
        <nav role='navigation' aria-label='Mobile Navigation'>
          <ul className='flex justify-between px-4 pt-2'>
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <li
                  tabIndex={0}
                  key={idx}
                  aria-label={item.label}
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

      {/* Desktop Navbar  */}
      <motion.aside
        animate={{ width: isOpen ? 300 : 90 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className='hidden lg:flex bg-grey-900 h-screen fixed top-0 left-0 overflow-hidden flex-col'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          role='navigation'
          aria-label={isOpen ? "Collapse navbar" : "Expand navbar"}
          className='text-grey-300 hover:text-secondary-green mb-6 self-end'>
          {isOpen ? "←" : "→"}
        </button>

        <ul className='flex flex-col gap-1'>
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.li
                tabIndex={0}
                key={idx}
                className={`relative group flex items-center gap-3 px-8 py-4 cursor-pointer overflow-hidden ${
                  isOpen && "rounded-r-[0.75rem] max-w-2xs"
                }`}
                initial='rest'
                whileHover='hover'
                animate='rest'>
                {/* Full-item background fill */}
                <motion.span
                  className='absolute inset-0 bg-beige-100 origin-left'
                  variants={{
                    rest: { scaleX: 0 },
                    hover: { scaleX: 1 },
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />

                {/* Icon with color transition */}
                <motion.div
                  className='relative z-10'
                  variants={{
                    rest: { color: "#b3b3b3" },
                    hover: { color: "#277c78" },
                  }}
                  transition={{ duration: 0.3 }}>
                  <Icon className='w-6 h-6' />
                </motion.div>

                {/* Label with fade-in + color change */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      className='relative z-10 text-grey-300'
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                      variants={{
                        rest: { color: "#b3b3b3" },
                        hover: { color: "#201f24" },
                      }}>
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </motion.aside>
    </>
  );
}
