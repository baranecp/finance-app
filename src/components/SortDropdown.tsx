"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentSort = searchParams.get("sortBy") || "latest";

  const SORT_OPTIONS = [
    { label: "Latest", value: "latest" },
    { label: "Oldest", value: "oldest" },
    { label: "A-Z", value: "a-z" },
    { label: "Z-A", value: "z-a" },
    { label: "Highest", value: "highest" },
    { label: "Lowest", value: "lowest" },
  ];

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", value);
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <label className='body-m text-grey-500'>Sort By</label>
      <select
        className='rounded-md border border-beige-500 py-3 px-4 text-sm'
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}>
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </>
  );
}
