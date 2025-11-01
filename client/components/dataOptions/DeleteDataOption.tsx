'use client';

import React, { useState } from 'react';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { useDataActions } from '@/hooks/useDataActions';
import ContextType from '@/types/ContextType';

const DeleteDataOptions = ({
  id,
  contextType,
}: {
  id: string | number;
  contextType: ContextType;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleDelete, isLoading } = useDataActions(id, contextType);

  return (
    <div className="my-2 flex justify-end">
      <Button
        onClick={() => setIsModalOpen(true)}
        className="text-gray-400 bg-gray-50 dark:bg-transparent dark:text-white border-2 border-white hover:bg-red-600 dark:hover:bg-red-600 hover:text-white hover:border-transparent py-1"
      >
        Delete
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title={`Delete ${contextType}`}
        confirmText="Delete"
        confirmClassName="bg-red-600 hover:bg-red-700 text-white"
        isLoading={isLoading}
      >
        <p className="mb-4 text-lg text-gray-400">
          Are you sure you want to delete this {contextType}?
        </p>
      </Modal>
    </div>
  );
};

export default DeleteDataOptions;
