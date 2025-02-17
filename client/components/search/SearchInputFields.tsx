import React, { ChangeEvent } from 'react';
import { Eraser } from 'lucide-react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import SearchDataField from './SearchDataField';
import SearchScoreField from './SearchScoreField';
import BookType from '@/types/BookType';
import RatingType from '@/types/RatingType';

const SearchInputFields = ({
  inputFields,
  search,
  setSearch,
}: {
  inputFields: (keyof Partial<BookType> | keyof Partial<RatingType>)[];
  search: Partial<BookType> | Partial<RatingType>;
  setSearch: (value: Partial<BookType> | Partial<RatingType>) => void;
}) => {
  return (
    <div>
      {inputFields.map((field) => (
        <div key={field} className="flex justify-center items-center">
          {field === 'publishedDate' ? (
            <SearchDataField
              setSearch={(value) => setSearch(value as Partial<BookType>)}
              search={search}
            />
          ) : field === 'reviewScore' ? (
            <SearchScoreField
              setSearch={(value) => setSearch(value as Partial<BookType>)}
              search={search}
              field={field}
            />
          ) : (
            <Input
              className="mx-1 my-3 py-2 px-2 w-full"
              value={
                String((search as Partial<BookType & RatingType>)[field]) ?? ''
              }
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch({
                  ...search,
                  [field]: e.target.value,
                } as Partial<BookType> | Partial<RatingType>)
              }
              placeholder={`Enter ${field}`}
            />
          )}
          {(search as Partial<BookType & RatingType>)[field] && (
            <Button
              className="rounded-md border-gray-400 dark:border-white p-2 text-gray-400 dark:text-white"
              onClick={() =>
                setSearch({
                  ...search,
                  [field]: '',
                } as Partial<BookType> | Partial<RatingType>)
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
