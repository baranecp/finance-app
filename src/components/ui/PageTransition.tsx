"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PageTransition() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("splashSeen");

    if (hasSeen) {
      setShowLogo(false);
      return;
    }

    // Wait for full page load (images, Next.js hydration, fonts, etc.)
    const handleLoad = () => {
      setShowLogo(false);
      sessionStorage.setItem("splashSeen", "true");
    };

    // If page is already loaded (soft navigation)
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
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
          transition={{ duration: 4, ease: "easeInOut" }}>
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
              duration: 4,
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
