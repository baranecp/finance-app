"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-background'>
      {/* Animated gradient ring */}
      <motion.div
        className='w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-500'
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
        <div className='flex items-center justify-center w-full h-full bg-background rounded-full'>
          <Image
            src='/Logo.svg'
            alt='App Logo'
            width={64}
            height={64}
            className='object-contain'
            priority
          />
        </div>
      </motion.div>

      {/* Animated loading text */}
      <motion.span
        className='mt-6 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 4.5, repeat: Infinity }}>
        Loading...
      </motion.span>
    </div>
  );
}
