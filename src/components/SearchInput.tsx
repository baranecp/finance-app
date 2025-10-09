"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FiSearch } from "react-icons/fi";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentQuery = searchParams.get("query") || "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("query", value);
    else params.delete("query");
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className='relative w-1/4'>
        <input
          type='text'
          placeholder='Search transactions'
          className='w-full rounded-md border border-beige-500 py-3 pl-5 pr-10 text-sm placeholder:text-beige-500'
          value={currentQuery}
          onChange={(e) => handleChange(e.target.value)}
        />
        <FiSearch className='absolute right-3 top-1/2 -translate-y-1/2 text-grey-900 w-4 h-4' />
      </div>
    </>
  );
}
