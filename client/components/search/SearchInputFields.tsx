import React, { ChangeEvent } from 'react';
import { Eraser } from 'lucide-react';
import {
  SearchBooksFieldsType,
  SearchRatingsFieldsType,
} from '@/types/SearchFields';
import Input from '@/components/Input';
import Button from '@/components/Button';

const SearchInputFields = ({
  inputFields,
  search,
  setSearch,
}: {
  inputFields: (keyof SearchBooksFieldsType | keyof SearchRatingsFieldsType)[];
  search: SearchBooksFieldsType | SearchRatingsFieldsType;
  setSearch: (value: SearchBooksFieldsType | SearchRatingsFieldsType) => void;
}) => {
  return (
    <div>
      {inputFields.map((field) => (
        <div key={field} className="flex justify-center items-center">
          <Input
            className="mx-1 my-3 py-2 px-2 w-full"
            value={(search as any)[field]}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch({
                ...search,
                [field]: e.target.value,
              } as SearchBooksFieldsType | SearchRatingsFieldsType)
            }
            placeholder={`Enter ${field}`}
          />
          {(search as any)[field] && (
            <Button
              className="rounded-md border-gray-400 dark:border-white p-2 text-gray-400 dark:text-white"
              onClick={() =>
                setSearch({
                  ...search,
                  [field]: '',
                } as SearchBooksFieldsType | SearchRatingsFieldsType)
              }
            >
              <Eraser />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchInputFields;
