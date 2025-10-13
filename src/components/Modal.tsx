"use client";

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
      <div className='bg-white rounded-2xl p-6 w-[90%] max-w-[400px] shadow-lg'>
        {title && <h2 className='text-lg font-semibold mb-4'>{title}</h2>}
        <div>{children}</div>
        <button
          onClick={onClose}
          className='mt-6 w-full bg-gray-200 hover:bg-gray-300 rounded-xl py-2 font-semibold'>
          Close
        </button>
      </div>
    </div>
  );
}
