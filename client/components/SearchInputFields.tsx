import React, { ChangeEvent } from 'react';
import Input from './Input';
import { SearchBooksFieldsType } from '@/types/SearchFields';
import { Eraser } from 'lucide-react';
import Button from './Button';

const SearchInputFields = ({
  inputFields,
  search,
  setSearch,
}: {
  inputFields: (keyof SearchBooksFieldsType)[];
  search: SearchBooksFieldsType;
  setSearch: (value: SearchBooksFieldsType) => void;
}) => {
  return (
    <div className="my-3">
      {inputFields.map((field) => (
        <div key={field} className="flex justify-center items-center">
          <Input
            className="mx-1 my-3 py-2 px-2 w-full"
            value={search[field]}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch({
                ...search,
                [field]: e.target.value,
              })
            }
            placeholder={`Enter ${field}`}
          />
          {search[field] && (
            <Button
              className="rounded-md border-gray-400 p-2"
              onClick={() =>
                setSearch({
                  ...search,
                  [field]: '',
                })
              }
            >
              <Eraser color="gray" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchInputFields;
