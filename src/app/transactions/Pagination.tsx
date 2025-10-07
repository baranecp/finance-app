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
    <div className='flex gap-2 mt-4 justify-between pt-2.5'>
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-3 py-1 text-grey-900 border border-beige-500 rounded-[8px] disabled:opacity-50 flex items-center gap-2 body-m cursor-pointer'>
        <GoTriangleLeft size={20} className='text-beige-500' /> Prev
      </button>

      <div className='flex gap-2.5'>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => changePage(page)}
            className={`px-[18px] py-2 border border-beige-500 rounded-[8px] cursor-pointer body-m ${
              page === currentPage ? "bg-grey-900 text-white" : ""
            }`}>
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-4 py-2 text-grey-900  border border-beige-500 rounded-[8px] disabled:opacity-50 flex items-center gap-2 body-m cursor-pointer'>
        Next <GoTriangleRight size={20} className='text-beige-500' />
      </button>
    </div>
  );
}
