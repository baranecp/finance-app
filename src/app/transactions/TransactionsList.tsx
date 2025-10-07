import TransactionAll from "@/components/TransactionAll";
import { db } from "@/db/drizzle";
import { transactions } from "@/db/schema";
import Pagination from "./Pagination";

interface TransactionsListProps {
  query: string;
  sortBy: string;
  category: string;
  currentPage: number;
  pageSize: number;
}

const TransactionsList = async ({
  query,
  sortBy,
  category,
  currentPage,
  pageSize,
}: TransactionsListProps) => {
  let all = await db.select().from(transactions);

  if (category && category.toLocaleLowerCase() !== "all") {
    all = all.filter(
      (t) => t.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (query) {
    all = all.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()));
  }

  all.sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "a-z":
        return a.name
          .trim()
          .toLowerCase()
          .localeCompare(b.name.trim().toLowerCase());
      case "z-a":
        return b.name
          .trim()
          .toLowerCase()
          .localeCompare(a.name.trim().toLowerCase());
      case "highest":
        return +b.amount - +a.amount;
      case "lowest":
        return +a.amount - +b.amount;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(all.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const paginatedTransactions = all.slice(start, start + pageSize).map((t) => ({
    ...t,
    date: new Date(t.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));
  return (
    <div>
      {all.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <TransactionAll
          transactions={paginatedTransactions.map((t) => ({
            ...t,
            avatar: t.avatar || "/default-avatar.png", // fallback image
          }))}
        />
      )}
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};
export default TransactionsList;
