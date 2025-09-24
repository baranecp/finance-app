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

export type Overview = {
    color: string
    background: string
    textColor?: string
    sumColor?: string
    text: string
    sum: string
}
