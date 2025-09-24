"use client";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  icon: React.ElementType;
  label: string;
}

interface NavItemsProps {
  items: NavItem[];
  isOpen?: boolean;
}

export default function NavItems({ items, isOpen }: NavItemsProps) {
  return (
    <>
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.li
            tabIndex={0}
            key={idx}
            className={`relative group flex items-center gap-200 px-8 py-4 cursor-pointer overflow-hidden heading-m whitespace-nowrap  ${
              isOpen && "rounded-r-[0.75rem] max-w-2xs"
            }`}
            initial='rest'
            whileHover='hover'
            animate='rest'>
            {/* Full-item background fill */}
            <motion.span
              className='absolute inset-0 bg-beige-100 origin-left border-l-4  border-secondary-green'
              variants={{
                rest: { scaleX: 0 },
                hover: { scaleX: 1 },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />

            {/* Icon with color transition */}
            <motion.div
              className='relative z-10'
              variants={{
                rest: { color: "#b3b3b3" },
                hover: { color: "#277c78" },
              }}
              transition={{ duration: 0.3 }}>
              <Icon className='w-6 h-6' />
            </motion.div>

            {/* Label */}
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  className='relative z-10 text-grey-300'
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  variants={{
                    rest: { color: "#b3b3b3" },
                    hover: { color: "#201f24" },
                  }}>
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </>
  );
}
