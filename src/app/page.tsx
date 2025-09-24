// import TransactionList from "@/components/TransactionList";
"use client";
import { Public_Sans } from "next/font/google";
import { useSidebarStore } from "@/store/useSidebarStore";
import { motion } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import Navbar from "@/components/Navbar/Navbar";
import Overview from "@/components/Overview";
import "../styles/globals.css";

const PublicSans = Public_Sans({
  weight: ["400", "700"],
});

export default function Home() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const { isOpen } = useSidebarStore();
  return (
    <div className='lg:flex lg:h-screen'>
      <Navbar />
      <motion.main
        animate={{ marginLeft: isLargeScreen ? (isOpen ? 40 : 40) : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={`lg:flex-1 lg:p-6 lg:overflow-y-auto ${PublicSans.className}`}>
        <Overview />
      </motion.main>
    </div>
  );
}
