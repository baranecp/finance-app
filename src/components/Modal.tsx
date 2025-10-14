"use client";
import { SlClose } from "react-icons/sl";

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
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-2xl p-6 w-[90%] max-w-[560px] shadow-lg'>
        <div className='flex justify-between items-center mb-4'>
          {title && <h2 className='heading-xl'>{title}</h2>}
          <SlClose
            className='text-grey-500 w-6 h-6 cursor-pointer'
            onClick={onClose}
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
