"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, ReactNode, useRef } from "react";
import Image from "next/image";
import { useIsFetching } from "@tanstack/react-query";

type PageTransitionProps = { children: ReactNode };

export default function PageTransition({ children }: PageTransitionProps) {
  const isFetching = useIsFetching({
    predicate: (query) => {
      const key = query.queryKey;
      return (
        Array.isArray(key) &&
        [
          "latest-transactions",
          "budgetsWithTransactions",
          "pots",
          "bills",
        ].includes(key[0] as string)
      );
    },
  });

  const MIN_SPLASH_MS = 600;
  const [ready, setReady] = useState(false);
  const splashStart = useRef(Date.now());

  useEffect(() => {
    if (isFetching === 0) {
      const elapsed = Date.now() - splashStart.current;
      const remaining = MIN_SPLASH_MS - elapsed;
      const t = setTimeout(() => setReady(true), remaining > 0 ? remaining : 0);
      return () => clearTimeout(t);
    }
  }, [isFetching]);

  return (
    <>
      {/* Page content renders underneath splash */}
      {children}

      {/* Splash overlay on top */}
      <AnimatePresence>
        {!ready && (
          <motion.div
            key='splash'
            className='fixed inset-0 z-[9999] flex items-center justify-center bg-[#0b0b0b]'
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}>
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
    </>
  );
}
