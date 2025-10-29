"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

interface MobileNavbarProps {
  navItems: {
    icon: React.ElementType;
    label: string;
    href: string;
    activeSegment: string | null;
  }[];
}

export default function MobileNavbar({ navItems }: MobileNavbarProps) {
  const activeSegment = useSelectedLayoutSegment();

  return (
    <section className='w-full bg-grey-900 fixed bottom-0 rounded-t-lg overflow-hidden lg:hidden z-50'>
      <nav role='navigation' aria-label='Mobile Navigation'>
        <ul className='flex justify-between px-4 pt-2'>
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive =
              activeSegment === item.activeSegment ||
              (activeSegment === null && item.activeSegment === null);

            return (
              <Link key={idx} href={item.href}>
                <li
                  tabIndex={0}
                  aria-label={item.label}
                  className={`flex flex-col items-center justify-center
                    w-[4.25rem] h-[2.75rem] md:w-[6.5rem] md:h-[4.125rem]
                    group border-b-4 rounded-t-lg transition-colors duration-150 cursor-pointer
                    ${
                      isActive
                        ? "border-secondary-green bg-beige-100"
                        : "border-transparent hover:bg-beige-100 hover:border-secondary-green"
                    }`}>
                  <Icon
                    className={`w-6 h-6 transition-colors duration-150
                      ${
                        isActive
                          ? "text-secondary-green"
                          : "text-grey-300 group-hover:text-secondary-green"
                      }`}
                  />
                  <span
                    className={`hidden md:block body-m-bold mt-1 transition-colors duration-150
                      ${
                        isActive
                          ? "text-grey-900"
                          : "text-grey-300 group-hover:text-grey-900"
                      }`}>
                    {item.label}
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}
