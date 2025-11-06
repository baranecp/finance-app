"use client";
import { GoTriangleRight } from "react-icons/go";
import { useRouter } from "next/navigation";

interface ViewAllButtonProps {
  label?: string;
  href: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function ViewAllButton({
  label = "View All",
  href,
  icon = <GoTriangleRight />,
  className = "",
}: ViewAllButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className={`body-m text-grey-500 flex items-center gap-2 cursor-pointer transition-all duration-200 hover:text-grey-900 group ${className}`}>
      {label}
      <span className='transition-transform duration-200 group-hover:translate-x-1'>
        {icon}
      </span>
    </button>
  );
}
