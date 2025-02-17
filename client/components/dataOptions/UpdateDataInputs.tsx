import { bookInputFields, ratingInputFields } from '@/constants/createFields';
import React, { ChangeEvent, Fragment } from 'react';
import Input from '../Input';
import BookType from '@/types/BookType';
import { FaStar } from 'react-icons/fa6';

type RatingForm = {
  reviewScore: string;
  reviewSummary: string;
  reviewText: string;
};

type ContextType = 'book' | 'rating' | 'user';
type FieldsType = BookType | RatingForm | { name: string };

const UpdateDataInputs = ({
  contextType,
  updateFields,
  setUpdateFields,
}: {
  contextType: ContextType;
  updateFields: FieldsType;
  setUpdateFields: (value: FieldsType) => void;
}) => {
  const isBook = contextType === 'book';
  const isRating = contextType === 'rating';

  const handleChange =
    (field: keyof FieldsType) => (e: ChangeEvent<HTMLInputElement>) => {
      setUpdateFields({
        ...updateFields,
        [field]: e.target.value,
      });
    };

  const inputFields = isBook
    ? bookInputFields
    : isRating
    ? ratingInputFields
    : ['name'];

  return (
    <div className="flex flex-col gap-4 mt-2 mb-10">
      {inputFields.map((field) =>
        field === 'user' ? (
          <Fragment key={field}></Fragment>
        ) : field === 'description' || field === 'reviewText' ? (
          <textarea
            key={field}
            className="p-2 my-2 border rounded-sm dark:bg-transparent dark:border-gray-400"
            placeholder="Description"
            maxLength={500}
            value={updateFields[field as keyof FieldsType]}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setUpdateFields({
                ...updateFields,
                [field]: e.target.value,
              });
            }}
          />
        ) : field === 'reviewScore' ? (
          <div key={field} className="m-auto">
            <p className="text-center text-gray-500">Select rating:</p>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() =>
                    setUpdateFields({
                      ...updateFields,
                      reviewScore: star.toString(),
                    })
                  }
                  className={`cursor-pointer text-xl transition-all ${
                    star <= Number(updateFields[field as keyof FieldsType])
                      ? 'text-yellow-300'
                      : 'text-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <Fragment key={field}>
            {field === 'image' && (
              <a
                className="p-1 pb-0 rounded-sm text-blue-600 dark:text-blue-400  hover:underline"
                href="https://search.worldcat.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                You can find image link here
              </a>
            )}
            <Input
              className="px-3 py-2"
              value={updateFields[field as keyof FieldsType] || ''}
              onChange={handleChange(field as keyof FieldsType)}
              placeholder={field}
            />
          </Fragment>
        )
      )}
    </div>
  );
};

export default UpdateDataInputs;
