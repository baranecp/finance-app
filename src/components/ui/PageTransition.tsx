"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PageTransition() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    {
      /*Only show splash once per session*/
    }
    const hasSeen = sessionStorage.getItem("splashSeen");
    if (!hasSeen) {
      setShowLogo(true);
      const timer = setTimeout(() => {
        setShowLogo(false);
        sessionStorage.setItem("splashSeen", "true");
      }, 1800);
      return () => clearTimeout(timer);
    } else {
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
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}>
          {/* Glowing logo */}
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
              duration: 1.5,
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
