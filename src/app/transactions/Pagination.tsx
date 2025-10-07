"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='flex justify-center items-center gap-4 mt-6'>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-3 py-1 border rounded disabled:opacity-50'>
        Previous
      </button>

      <span className='text-sm'>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-3 py-1 border rounded disabled:opacity-50'>
        Next
      </button>
    </div>
  );
}
