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
    total: number
    target: number
    theme: string
}

export type PotType = {
    id: string
    name: string
    total: string
    theme: string
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
