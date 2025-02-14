'use client';

import React, { useState } from 'react';
import Button from '@/components/Button';
import fetchData from '@/utils/fetchData';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import {
  ALL_BOOKS_URL,
  ALL_RATINGS_URL,
  ALL_USERS_URL,
} from '@/constants/apiSources';

const DeleteDataOptions = ({
  id,
  contextType,
}: {
  id: string | number;
  contextType: 'book' | 'rating' | 'user';
}) => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isBook = contextType === 'book';
  const isRating = contextType === 'rating';

  const handleDelete = async () => {
    setIsLoading(true);
    const deleteData = await fetchData(
      `${
        isBook ? ALL_BOOKS_URL : isRating ? ALL_RATINGS_URL : ALL_USERS_URL
      }/${id}`,
      {
        method: 'DELETE',
      }
    );

    if (deleteData) {
      toast.success(`${contextType} deleted successfully!`);
      router.back();
    } else {
      toast.error(`Failed to delete ${contextType}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="my-2 flex justify-end">
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-gray-50 dark:bg-transparent border-2 hover:bg-red-600 hover:text-white hover:border-transparent py-1"
      >
        Delete
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-md shadow-lg dark:bg-gray-800">
            <p className="mb-4 text-lg">
              Are you sure you want to delete this {contextType}?
            </p>
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="border-transparent dark:border-transparent px-3 py-1 bg-gray-400 dark:bg-gray-500 hover:bg-gray-600 text-white"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={isLoading}
                className="border-transparent dark:border-transparent px-3 py-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteDataOptions;
