"use client"

import { useQuery } from "@tanstack/react-query"
import { Transaction } from "@/types/finance"

export default function TransactionList() {
    const {data, isLoading, error} = useQuery<Transaction[]>({
        queryKey:["transactions"],
        queryFn: async () => {
            const res = await fetch("/api/transactions")
            if(!res.ok) throw new Error("Failed to fecth transactions")
            return res.json()
        }
    })

    if(isLoading) return <p>Loading transactions...</p>
    if(error) return <p>Something went wrong.</p>
    if(!data) return <p>No transactions found.</p>

    return (
        <div>
            {data.map((t) => (
                <div key={t.id}>
                    <span>{t.category}</span>
                    <span>{t.amount}</span>
                    <span>{t.date}</span>
                </div>
            ))}
        </div>
    )
}
