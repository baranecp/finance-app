export interface Bill {
  id: string;
  name: string;
  avatar: string | null;
  category: string;
  type: "income" | "expense";
  amount: string | number;
  date: string | Date;
  recurring: boolean;
  daysLeft?: number;
}

export function categorizeBills(bills: Bill[]) {
  const today = new Date();
  const todayDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const billsWithDaysLeft = bills.map((b) => {
    const billDay = new Date(b.date);
    let daysLeft = billDay.getDate() - todayDay;
    if (billDay.getMonth() === currentMonth && daysLeft < 0) {
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      daysLeft = daysInMonth - todayDay + billDay.getDate();
    }

    return { ...b, daysLeft };
  });

  const paid = billsWithDaysLeft.filter((b) => b.daysLeft! < 0); // before today
  const due = billsWithDaysLeft.filter(
    (b) => b.daysLeft! >= 0 && b.daysLeft! <= 1
  ); // today or tomorrow
  const upcoming = billsWithDaysLeft.filter((b) => b.daysLeft! > 1); // rest until month-end

  const totals = {
    dueTotal: due.reduce((acc, t) => acc + +t.amount, 0),
    upcomingTotal: upcoming.reduce((acc, t) => acc + +t.amount, 0),
    paidTotal: paid.reduce((acc, t) => acc + +t.amount, 0),
    totalBills: billsWithDaysLeft.reduce((acc, t) => acc + +t.amount, 0),
  };

  return { due, upcoming, paid, totals };
}
