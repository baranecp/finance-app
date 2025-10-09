"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { fetchCategories } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";

export default function FilterDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentCategory = searchParams.get("category") || "all";

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", value);
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <span className='body-m text-grey-500'>Category</span>
      <select
        className='rounded-md border border-beige-500 py-3 px-4 text-sm'
        value={currentCategory}
        onChange={(e) => handleChange(e.target.value)}>
        <option value='all'>All transactions</option>
        {categories?.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </>
  );
}
