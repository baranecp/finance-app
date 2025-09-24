import { NextResponse } from "next/server";

export async function GET() {
  const mockPots = [
  {
    id: 1,
    name: "Savings",
    saved: 159,
    target: 2000,
  },
  {
    id: 2,
    name: "Gift",
    saved: 40,
    target: 1500,
  },
  {
    id: 3,
    name: "Concert Ticket",
    saved: 110,
    target: 1000,
  },
    {
    id: 4,
    name: "New Laptop",
    saved: 10,
    target: 5000,
  },
];

return NextResponse.json(mockPots)
}

