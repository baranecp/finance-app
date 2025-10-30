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
    <>
      <div className='relative min-w-1/4'>
        <input
          type='text'
          placeholder='Search transactions'
          className='w-full rounded-md border border-beige-500 py-3 pl-5 pr-10 text-sm placeholder:text-beige-500'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <FiSearch className='absolute right-3 top-1/2 -translate-y-1/2 text-grey-900 w-4 h-4' />
      </div>
    </>
  );
}
