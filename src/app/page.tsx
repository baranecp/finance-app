// import TransactionList from "@/components/TransactionList";
"use client";
import Navbar from "@/components/Navbar/Navbar";
import { motion } from "framer-motion";
import "../styles/globals.css";
import { Public_Sans } from "next/font/google";
import Overview from "@/components/Overview";
import { useSidebarStore } from "@/store/useSidebarStore";

const PublicSans = Public_Sans({
  weight: ["400", "700"],
});

export default function Home() {
  const { isOpen } = useSidebarStore();
  return (
    <div className='lg:flex lg:h-screen'>
      <Navbar />
      <motion.main
        animate={{ marginLeft: isOpen ? 40 : 40 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={`flex-1 p-6 overflow-y-auto ${PublicSans.className}`}>
        <Overview />
      </motion.main>
    </div>
  );
}
