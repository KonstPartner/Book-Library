'use client';

import React, { useState } from 'react';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import UpdateDataInputs from './UpdateDataInputs';
import { useDataActions } from '@/hooks/useDataActions';
import BookType from '@/types/BookType';
import RatingType from '@/types/RatingType';
import isValidData from '@/utils/isValidData';
import UserType from '@/types/UserType';
import FieldsType from '@/types/FieldsType';
import ContextType from '@/types/ContextType';

const initialFields = {
  book: {
    title: '',
    description: '',
    author: '',
    image: '',
    publisher: '',
    publishedDate: '',
    infoLink: '',
    category: '',
  } as BookType,
  rating: {
    reviewScore: '',
    reviewSummary: '',
    reviewText: '',
  } as RatingType,
  user: {
    name: '',
  } as UserType,
};

const UpdateDataOptions = ({
  id,
  contextType,
}: {
  id: string | number;
  contextType: ContextType;
}) => {
  const [updateFields, setUpdateFields] = useState<FieldsType>(initialFields[contextType]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleUpdate } = useDataActions(id, contextType);
  
  return (
    <div className="my-2 flex justify-end">
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-gray-50 dark:bg-transparent border-2 hover:bg-yellow-300 hover:text-white hover:border-transparent py-1"
      >
        Edit
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          if (!isValidData(contextType, updateFields, false)) {
            return;
          }
          handleUpdate(updateFields, () => setIsModalOpen(false));
        }}
        title={`Update ${contextType}`}
        confirmText="Update"
        confirmClassName="bg-green-600 hover:bg-green-700 text-white"
      >
        <UpdateDataInputs
          contextType={contextType}
          updateFields={updateFields}
          setUpdateFields={setUpdateFields}
        />
      </Modal>
    </div>
  );
};

export default UpdateDataOptions;
