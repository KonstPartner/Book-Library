'use client';

import React, { useState } from 'react';
import Button from '@/components/Button';
import fetchData from '@/utils/fetchData';
import { toast } from 'react-toastify';
import {
  ALL_BOOKS_URL,
  ALL_RATINGS_URL,
  ALL_USERS_URL,
} from '@/constants/apiSources';
import UpdateDataInputs from './UpdateDataInputs';
import BookType from '@/types/BookType';

type RatingForm = {
  reviewScore: string;
  reviewSummary: string;
  reviewText: string;
};

const BookFields: BookType = {
  title: '',
  description: '',
  author: '',
  image: '',
  publisher: '',
  publishedDate: '',
  infoLink: '',
  category: '',
};

const RatingFields: RatingForm = {
  reviewScore: '',
  reviewSummary: '',
  reviewText: '',
};

const UserFields: { name: string } = { name: '' };

type FieldsType = BookType | RatingForm | { name: string };

const UpdateDataOptions = ({
  id,
  contextType,
}: {
  id: string | number;
  contextType: 'book' | 'rating' | 'user';
}) => {
  const isBook = contextType === 'book';
  const isRating = contextType === 'rating';

  const [updateFields, setUpdateFields] = useState<FieldsType>(
    isBook ? BookFields : isRating ? RatingFields : UserFields
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    setIsLoading(true);

    const filteredData = Object.fromEntries(
      Object.entries(updateFields).filter(
        ([, value]) => (value as string).trim() !== ''
      )
    );

    const updatedData = await fetchData(
      `${
        isBook ? ALL_BOOKS_URL : isRating ? ALL_RATINGS_URL : ALL_USERS_URL
      }/${id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filteredData),
      }
    );

    if (updatedData) {
      toast.success(`${contextType} updated successfully!`);
      setIsModalOpen(false);
    } else {
      toast.error(`Failed to update ${contextType}`);
    }

    setIsLoading(false);

  };

  return (
    <div className="my-2 flex justify-end">
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-gray-50 dark:bg-transparent border-2 hover:bg-yellow-300 hover:text-white hover:border-transparent py-1"
      >
        Edit
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`bg-white p-5 rounded-md shadow-lg dark:bg-gray-800 w-3/4 max-h-[98%] overflow-y-auto`}
          >
            <div>
              <h2 className="text-2xl font-bold text-center">
                Update {contextType}
              </h2>
              <UpdateDataInputs
                contextType={contextType}
                updateFields={updateFields}
                setUpdateFields={(value) => setUpdateFields(value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="border-transparent dark:border-transparent px-3 py-1 bg-gray-400 dark:bg-gray-500 hover:bg-gray-600 text-white"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={isLoading}
                className="border-transparent dark:border-transparent px-3 py-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateDataOptions;
