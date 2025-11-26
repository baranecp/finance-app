"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, ReactNode } from "react";
import Image from "next/image";
import { useSplashStore } from "@/store/useSplashStore";

type PageTransitionProps = {
  children: ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const loadingCount = useSplashStore((s) => s.loadingCount);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (loadingCount === 0) {
      // Add tiny delay to prevent flicker
      const t = setTimeout(() => setShowSplash(false), 1000);
      return () => clearTimeout(t);
    }
  }, [loadingCount]);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key='splash'
            className='fixed inset-0 z-[9999] flex items-center justify-center bg-[#0b0b0b]'
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: 1,
                filter: [
                  "drop-shadow(0 0 0px #00b3ff)",
                  "drop-shadow(0 0 25px #00b3ff)",
                  "drop-shadow(0 0 0px #00b3ff)",
                ],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }}>
              <Image
                src='/Logo.svg'
                alt='App Logo'
                width={140}
                height={140}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showSplash && children}
    </>
  );
}
