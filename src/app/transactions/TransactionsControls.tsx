"use client";
import { FiSearch } from "react-icons/fi";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const SORT_OPTIONS = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
  { label: "A-Z", value: "a-z" },
  { label: "Z-A", value: "z-a" },
  { label: "Highest", value: "highest" },
  { label: "Lowest", value: "lowest" },
];

const CATEGORY_OPTIONS = [
  { label: "All transactions", value: "all" },
  { label: "General", value: "general" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Bills", value: "bills" },
  { label: "Groceries", value: "groceries" },
  { label: "Dining Out", value: "dining out" },
  { label: "Transportation", value: "transportation" },
  { label: "lifestyle", value: "lifestyle" },
  { label: "Personal Care", value: "personal care" },
  { label: "Education", value: "education" },
  { label: "Shopping", value: "shopping" },
];

export default function TransactionsControls() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "latest");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All transactions"
  );

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);

    for (const key in updates) {
      const value = updates[key];
      if (value) params.set(key, value);
      else params.delete(key);
    }

    // Reset page to 1 on search, sort, or category change
    params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateParams({ query: value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    updateParams({ sort: value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategory(value);
    updateParams({ category: value });
  };

  return (
    <div className='flex flex-wrap gap-4 mb-6 items-center justify-between'>
      {/* Search Input */}
      <div className='relative w-1/4'>
        <input
          type='text'
          placeholder='Search transactions'
          className='w-full rounded-md border border-beige-500 py-3 pl-5 pr-10 text-sm placeholder:text-beige-500'
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FiSearch className='absolute right-3 top-1/2 -translate-y-1/2 text-grey-900 w-4 h-4' />
      </div>
      <div className='flex gap-4 items-center'>
        {/* Sort Dropdown */}
        <span className='body-m text-grey-500'>Sort By</span>
        <select
          className='rounded-md border border-beige-500 py-3 px-4 text-sm'
          value={sortBy}
          onChange={handleSortChange}>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Category Dropdown */}
        <span className='body-m text-grey-500'>Category</span>
        <select
          className='rounded-md border border-beige-500 py-3 px-4 text-sm'
          value={category}
          onChange={handleCategoryChange}>
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
