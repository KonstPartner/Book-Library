import React from 'react';
import Button from '@/components/Button';

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
  confirmClassName = 'bg-green-600 hover:bg-green-700 text-white',
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  confirmClassName?: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-md shadow-lg dark:bg-gray-800 w-[90%] md:w-2/3 lg:w-2/4 max-h-[98%] overflow-y-auto">
        <h2 className="text-gray-400 text-2xl font-bold text-center mb-4">{title}</h2>
        <div>{children}</div>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={onClose}
            className="border-transparent dark:border-transparent px-3 py-1 bg-gray-400 dark:bg-gray-500 hover:bg-gray-600 text-white"
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          {onConfirm && (
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className={`border-transparent dark:border-transparent px-3 py-1 ${confirmClassName}`}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
