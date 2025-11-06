"use client";
import { useState, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FiSearch } from "react-icons/fi";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState(searchParams.get("query") || "");
  const debouncedValue = useDebounce(inputValue);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedValue) params.set("query", debouncedValue);
    else params.delete("query");
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className='relative w-full sm:w-[280px] md:w-[340px] lg:w-[400px]'>
      <input
        type='text'
        placeholder='Search transactions'
        className='w-full rounded-md border border-beige-500 py-2.5 sm:py-3 pl-10 pr-4 text-sm sm:text-base placeholder:text-beige-500 focus:outline-none focus:ring-2 focus:ring-beige-500 transition-all'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-grey-900 w-5 h-5 sm:w-4 sm:h-4 pointer-events-none' />
    </div>
  );
}
