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
  { icon: OverviewIcon, label: "Overview", href: "/", activeSegment: null },
  {
    icon: TransactionsIcon,
    label: "Transactions",
    href: "/transactions",
    activeSegment: "transactions",
  },
  {
    icon: BudgetsIcon,
    label: "Budgets",
    href: "/budgets",
    activeSegment: "budgets",
  },
  { icon: PotsIcon, label: "Pots", href: "/pots", activeSegment: "pots" },
  {
    icon: BillsIcon,
    label: "Recurring Bills",
    href: "/bills",
    activeSegment: "bills",
  },
];

export default function Navbar() {
  return (
    <>
      <MobileNavbar navItems={navItems} />
      <DesktopNavbar navItems={navItems} />
    </>
  );
}
