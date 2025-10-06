"use client";
import { useSidebarStore } from "@/store/useSidebarStore";
import { motion, AnimatePresence } from "framer-motion";
import NavItems from "./NavItems";

/*Logos*/
import LogoFull from "../../../public/Logo.svg";
import LogoShort from "../../../public/LogoCollapse.svg";

/*Icons*/
import ArrowLeft from "../../../public/ArrowLeft.svg";
import ArrowRight from "../../../public/ArrowRight.svg";

interface DesktopNavbarProps {
  navItems: { icon: React.ElementType; label: string; href: string }[];
}

export default function DesktopNavbar({ navItems }: DesktopNavbarProps) {
  const { isOpen, toggle } = useSidebarStore();
  return (
    <motion.aside
      role='navigation'
      animate={{ width: isOpen ? 300 : 90 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className='hidden lg:flex bg-grey-900 h-screen sticky top-0 left-0 overflow-hidden flex-col rounded-r-[16px]'>
      {/* Logo */}
      <motion.div
        className={`mb-[64px] mt-10 px-8 overflow-hidden ${
          !isOpen && "flex justify-center"
        }`}>
        <AnimatePresence mode='wait'>
          {isOpen ? (
            <motion.div
              key='full'
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}>
              <LogoFull />
            </motion.div>
          ) : (
            <motion.div
              key='short'
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}>
              <LogoShort className='self-center' />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Nav Items */}
      <ul className='flex flex-col gap-1'>
        <NavItems items={navItems} isOpen={isOpen} />
      </ul>

      {/* Toggle Button */}
      <motion.button
        tabIndex={0}
        onClick={toggle}
        aria-label={isOpen ? "Collapse navbar" : "Expand navbar"}
        className='group text-grey-300 hover:text-secondary-green mt-auto flex items-center gap-1 mx-8 mb-10 cursor-pointer'>
        <div className='flex items-center gap-3 z-10'>
          {isOpen ? (
            <ArrowLeft className='group-hover:text-secondary-green w-auto h-auto' />
          ) : (
            <ArrowRight className='group-hover:text-secondary-green w-auto h-auto' />
          )}

          <AnimatePresence mode='wait'>
            {isOpen && (
              <motion.span
                key='text'
                className='text-grey-300 font-bold group-hover:text-secondary-green whitespace-nowrap'
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}>
                Minimize Menu
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </motion.aside>
  );
}
