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

export type Pots = {
    id:number
    name: string
    saved: number
    target: number
}

export type Overview = {
    color: string
    background: string
    textColor?: string
    sumColor?: string
    icon?: React.ElementType
    iconColor?: string
    text: string
    sum: string
}
