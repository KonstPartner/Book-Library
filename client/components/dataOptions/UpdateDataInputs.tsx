import React, { ChangeEvent, Fragment } from 'react';
import { bookInputFields, ratingInputFields } from '@/constants/createFields';
import Input from '@/components/Input';
import FieldsType from '@/types/FieldsType';
import ContextType from '@/types/ContextType';
import RatingInput from '../ratings/RatingInput';
import RatingType from '@/types/RatingType';

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
          <RatingInput
            key={field}
            field={field}
            dataFields={updateFields}
            setDataFields={(value) =>
              setUpdateFields(value as Partial<RatingType>)
            }
          />
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
              value={updateFields[field as keyof FieldsType] as string}
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
