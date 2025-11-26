"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PageTransition() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("splashSeen");

    // global function so any page can finish loading
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).finishLoading = () => {
      sessionStorage.setItem("splashSeen", "true");
      setShowLogo(false);
    };

    // If user already saw splash this session → skip
    if (hasSeen) {
      setShowLogo(false);
    }
  }, []);

  return (
    <AnimatePresence mode='wait'>
      {showLogo && (
        <motion.div
          key='splash'
          className='fixed inset-0 z-[9999] flex items-center justify-center bg-[#0b0b0b]'
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}>
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
  );
}
