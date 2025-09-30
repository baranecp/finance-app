export type Transactions = {
  id: string;
  name: string,
  avatar: string;
  category?: string;
  type: "income" | "expense";
  amount: string; // numeric in DB, returned as string
  date: string;
  recurring?: boolean;
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
    color: string
}

export type Pot = {
    id: number
    name: string
    saved: number
    color: string
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
