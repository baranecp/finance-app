"use client";
import { motion, AnimatePresence } from "framer-motion";
import { SlClose } from "react-icons/sl";
import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  // Close modal when pressing Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.1, duration: 0.25 } }}
          transition={{ duration: 0.25 }}>
          <motion.div
            className='bg-white rounded-2xl p-6 w-[90%] max-w-[560px] shadow-lg relative'
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            onClick={(e) => e.stopPropagation()} // Prevent background click
          >
            <button
              onClick={onClose}
              className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer'>
              <SlClose className='w-5 h-5' />
            </button>

            {title && (
              <h2 className='heading-xl mb-4 text-gray-900'>{title}</h2>
            )}

            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
