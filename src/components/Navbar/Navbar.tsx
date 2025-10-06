"use client";

/* Components */
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

/* Icons */
import OverviewIcon from "../../../public/overview.svg";
import BillsIcon from "../../../public/bills.svg";
import BudgetsIcon from "../../../public/budgets.svg";
import PotsIcon from "../../../public/pots.svg";
import TransactionsIcon from "../../../public/transactions.svg";

const navItems = [
  { icon: OverviewIcon, label: "Overview", href: "/" },
  { icon: TransactionsIcon, label: "Transactions", href: "/transactions" },
  { icon: BudgetsIcon, label: "Budgets", href: "/budgets" },
  { icon: PotsIcon, label: "Pots", href: "/pots" },
  { icon: BillsIcon, label: "Recurring Bills", href: "/bills" },
];

export default function Navbar() {
  return (
    <>
      <MobileNavbar navItems={navItems} />
      <DesktopNavbar navItems={navItems} />
    </>
  );
}
