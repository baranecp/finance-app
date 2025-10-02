"use client";

import { motion } from "framer-motion";
import { useSidebarStore } from "@/store/useSidebarStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Public_Sans } from "next/font/google";

const PublicSans = Public_Sans({
  weight: ["400", "700"],
});

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const { isOpen } = useSidebarStore();

  return (
    <motion.main
      animate={{ marginLeft: isLargeScreen ? (isOpen ? 40 : 40) : 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className={`md:px-10 md:mt-10 mt-6 px-4 pb-14 flex-1 overflow-y-auto ${PublicSans.className}`}>
      {children}
    </motion.main>
  );
}
