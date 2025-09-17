export type Transaction = {
    id: number
    type: "income" | "expense"
    category: string
    amount: number
    date:string
}

export type Budget = {
    id: number
    name: string
    limit: number
    spent: number
}
