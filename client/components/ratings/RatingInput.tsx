import FieldsType from '@/types/FieldsType';
import React from 'react';
import { FaStar } from 'react-icons/fa6';

const RatingInput = ({
  field,
  dataFields,
  setDataFields,
}: {
  field: string;
  dataFields: FieldsType;
  setDataFields: (value: FieldsType) => void;
}) => {
  return (
    <div key={field} className="m-auto">
      <p className="text-center text-gray-500">Select rating:</p>
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            onClick={() =>
              setDataFields({
                ...dataFields,
                reviewScore: star.toString(),
              })
            }
            className={`cursor-pointer text-xl transition-all ${
              star <= Number(dataFields[field as keyof FieldsType])
                ? 'text-yellow-300'
                : 'text-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingInput;
