import { NextResponse } from "next/server"

export async function GET() {
  const transactions = [
    {
      id: 1,
      type: "expense",
      category: "Groceries",
      amount: 45,
      date: "2025-09-01",
    },
    {
      id: 2,
      type: "expense",
      category: "Rent",
      amount: 900,
      date: "2025-09-01",
    },
    {
      id: 3,
      type: "income",
      category: "Salary",
      amount: 2500,
      date: "2025-09-05",
    },
    {
      id: 4,
      type: "expense",
      category: "Entertainment",
      amount: 60,
      date: "2025-09-07",
    },
    {
      id: 5,
      type: "expense",
      category: "Groceries",
      amount: 80,
      date: "2025-09-10",
    },
    {
      id: 6,
      type: "expense",
      category: "Transport",
      amount: 30,
      date: "2025-09-11",
    },
    {
      id: 7,
      type: "income",
      category: "Freelance",
      amount: 400,
      date: "2025-09-12",
    },
  ]

  return NextResponse.json(transactions)
}
