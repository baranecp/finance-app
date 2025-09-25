import { NextResponse } from "next/server";

export async function GET() {
  const mockPots = [
  {
    id: 1,
    name: "Savings",
    saved: 159,
    target: 2000,
    color: "bg-green-900",
  },
  {
    id: 2,
    name: "Gift",
    saved: 40,
    target: 1500,
    color:"bg-cyan-300",
  },
  {
    id: 3,
    name: "Concert Ticket",
    saved: 110,
    target: 1000,
    color: "bg-zinc-500",
  },
    {
    id: 4,
    name: "New Laptop",
    saved: 10,
    target: 5000,
    color: "bg-orange-200",
  },
];

return NextResponse.json(mockPots)
}

