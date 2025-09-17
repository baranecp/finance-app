import { NextResponse } from "next/server";

export async function GET() {
  const budgets = [
    {
      id: 1,
      name: "Groceries",
      limit: 400,
      spent: 120,
    },
    {
      id: 2,
      name: "Rent",
      limit: 900,
      spent: 900,
    },
    {
      id: 3,
      name: "Entertainment",
      limit: 200,
      spent: 75,
    },
    {
      id: 4,
      name: "Savings",
      limit: 500,
      spent: 250,
    },
  ]

  return NextResponse.json(budgets)
}
