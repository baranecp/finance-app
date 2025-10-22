export type Transactions = {
  id: string;
  name: string;
  avatar: string;
  category?: string;
  type: "income" | "expense";
  amount: string; // numeric in DB, returned as string
  date: string;
  recurring?: boolean;
};

export type Budget = {
  id: string;
  category: string;
  maximum: number;
  theme: string;
};

export type Pots = {
  id: number;
  name: string;
  total: number;
  target: number;
  theme: string;
};

export type PotType = {
  id: string;
  name: string;
  total: string;
  theme: string;
};

export type Overview = {
  color: string;
  background: string;
  textColor?: string;
  sumColor?: string;
  icon?: React.ElementType;
  iconColor?: string;
  text: string;
  sum: string;
};

export type RawTransactionRow = {
  id: string;
  name: string;
  avatar?: string | null;
  category: string;
  type: string; // will cast to "income" | "expense"
  amount: string | number; // might be string from DB
  date: string | Date;
  recurring?: boolean | null;
};

export type Transaction = {
  id: string;
  name: string;
  avatar: string;
  category: string;
  type: "income" | "expense";
  amount: number;
  date: string;
  recurring: boolean;
};

export type BudgetWithTransactions = {
  id: string;
  category: string;
  maximum: number;
  theme: string;
  transactions: Transaction[];
};
