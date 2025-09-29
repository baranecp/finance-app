"use client";
import { Public_Sans } from "next/font/google";
import { useSidebarStore } from "@/store/useSidebarStore";
import { motion } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import Navbar from "@/components/Navbar/Navbar";
import Overview from "@/components/Overview";
import Pots from "@/components/Pots";
import Transactions from "@/components/Transactions";
import "../styles/globals.css";

const PublicSans = Public_Sans({
  weight: ["400", "700"],
});

export default function Home() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const { isOpen } = useSidebarStore();
  return (
    <div className='flex h-screen  bg-beige-100'>
      <Navbar />
      <motion.main
        animate={{ marginLeft: isLargeScreen ? (isOpen ? 40 : 40) : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={`md:px-10 md:mt-10 mt-6 px-4 pb-14 flex-1 overflow-y-auto ${PublicSans.className}`}>
        <Overview />
        <Pots />
        <Transactions />
      </motion.main>
    </div>
  );
}
