"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  activeSegment: string | null;
}

interface NavItemsProps {
  items: NavItem[];
  isOpen?: boolean;
}

export default function NavItems({ items, isOpen }: NavItemsProps) {
  const activeSegment = useSelectedLayoutSegment();

  return (
    <>
      {items.map((item, idx) => {
        const Icon = item.icon;
        const isActive =
          activeSegment === item.activeSegment ||
          (activeSegment === null && item.activeSegment === null);

        return (
          <Link key={idx} href={item.href}>
            <li
              className={`relative group flex items-center gap-200 px-8 py-4 cursor-pointer overflow-hidden heading-m whitespace-nowrap ${
                isOpen ? "rounded-r-[0.75rem] max-w-2xs" : ""
              }`}>
              {/* Sliding Background */}
              <span
                className={`absolute inset-0 origin-left border-l-4 border-secondary-green bg-beige-100 z-0
                  transition-transform duration-300 ease-in-out
                  ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                style={{ transformOrigin: "left" }}
              />

              {/* Icon */}
              <div
                className={`relative z-10 transition-colors duration-200 ${
                  isActive
                    ? "text-secondary-green"
                    : "text-grey-300 group-hover:text-secondary-green"
                }`}>
                <Icon className='w-6 h-6' />
              </div>

              {/* Label */}
              {isOpen && (
                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive
                      ? "text-grey-900"
                      : "text-grey-300 group-hover:text-grey-900"
                  }`}>
                  {item.label}
                </span>
              )}
            </li>
          </Link>
        );
      })}
    </>
  );
}
