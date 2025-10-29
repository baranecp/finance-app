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

export function categorizeBills(bills: Bill[], maxUpcoming = 15) {
  const today = new Date();
  const todayDay = today.getDate();

  const billsWithDaysLeft = bills.map((b) => {
    const billDay = new Date(b.date).getDate();
    let daysLeft = billDay - todayDay;

    if (daysLeft < 0) {
      const daysInMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      ).getDate();
      daysLeft = daysInMonth - todayDay + billDay;
    }

    return { ...b, daysLeft };
  });

  const due = billsWithDaysLeft.filter(
    (b) => b.daysLeft! >= 0 && b.daysLeft! <= 5
  );
  const upcoming = billsWithDaysLeft.filter(
    (b) => b.daysLeft! > 5 && b.daysLeft! <= maxUpcoming
  );
  const paid = billsWithDaysLeft.filter((b) => b.daysLeft! > maxUpcoming);

  const totals = {
    dueTotal: due.reduce((acc, t) => acc + +t.amount, 0),
    upcomingTotal: upcoming.reduce((acc, t) => acc + +t.amount, 0),
    paidTotal: paid.reduce((acc, t) => acc + +t.amount, 0),
  };

  return { due, upcoming, paid, totals };
}
