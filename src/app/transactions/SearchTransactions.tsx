"use client";
import { FiSearch } from "react-icons/fi";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchTransactions() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='flex relative flex-1 w-1/4 mb-6'>
      <input
        className='block w-full rounded-md border border-beige-500 py-3 pl-5 text-sm placeholder:text-beige-500 mb-6'
        placeholder='Search transactions'
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <FiSearch className='absolute right-5 top-1/2 -translate-y-[120%]  text-grey-900 w-4 h-4' />
    </div>
  );
}
