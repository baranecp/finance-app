"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { GoTriangleRight, GoTriangleLeft } from "react-icons/go";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    push(`${pathname}?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-2.5'>
      {/* Prev Button */}
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        className='hidden px-2 py-1 sm:px-4 sm:py-2 text-grey-900 border border-beige-500 rounded-[8px] disabled:opacity-50 sm:flex items-center justify-center gap-1 sm:gap-2 body-m cursor-pointer text-sm sm:text-base'>
        <GoTriangleLeft size={18} className='text-beige-500 shrink-0' />
        <span>Prev</span>
      </button>

      {/* Page Buttons */}
      <div className='flex gap-2 overflow-x-auto sm:overflow-visible no-scrollbar justify-center'>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => changePage(page)}
            className={`px-[12px] sm:px-[18px] py-1.5 sm:py-2 border border-beige-500 rounded-[8px] cursor-pointer text-sm sm:text-base body-m whitespace-nowrap ${
              page === currentPage ? "bg-grey-900 text-white" : ""
            }`}>
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='hidden px-2 py-1 sm:px-4 sm:py-2 text-grey-900 border border-beige-500 rounded-[8px] disabled:opacity-50 sm:flex items-center justify-center gap-1 sm:gap-2 body-m cursor-pointer text-sm sm:text-base'>
        <span className='hidden sm:inline'>Next</span>
        <GoTriangleRight size={18} className='text-beige-500 shrink-0' />
      </button>
    </div>
  );
}
