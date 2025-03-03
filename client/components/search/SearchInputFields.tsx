import React, { ChangeEvent } from 'react';
import { Eraser } from 'lucide-react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import SearchDataField from './SearchDataField';
import SearchScoreField from './SearchScoreField';
import BookType from '@/types/BookType';
import RatingType from '@/types/RatingType';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
} from '@/types/SearchFieldsType';
import getSearchQueries from '@/utils/getSearchQueries';

const SearchInputFields = ({
  inputFields,
  search,
  setSearch,
}: {
  inputFields: (keyof Partial<BookType> | keyof Partial<RatingType>)[];
  search: SearchBookFieldsType | SearchRatingFieldsType;
  setSearch: (value: SearchBookFieldsType | SearchRatingFieldsType) => void;
}) => {
  const { searchFields } = getSearchQueries(search);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {inputFields.map((inputField) => (
        <div key={inputField} className="flex sm:items-center gap-3 sm:gap-2">
          <div className="flex-1 min-w-0">
            {inputField === 'publishedDate' ? (
              <SearchDataField
                setSearch={(value) => setSearch(value as SearchBookFieldsType)}
                search={search}
              />
            ) : inputField === 'reviewScore' ? (
              <SearchScoreField
                setSearch={(value) =>
                  setSearch(value as SearchRatingFieldsType)
                }
                search={search}
                field={inputField as any}
              />
            ) : (
              <Input
                className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base"
                value={searchFields[inputField] ?? ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearch({
                    ...search,
                    [inputField]: {
                      field: e.target.value,
                      isExact: (search as any)[inputField as any].isExact,
                    },
                  } as SearchBookFieldsType | SearchRatingFieldsType)
                }
                placeholder={`Enter ${String(inputField)
                  .replace(/([A-Z])/g, ' $1')
                  .toLowerCase()}`}
              />
            )}
          </div>
          {(search as any)[inputField as any].field && (
            <Button
              className="flex-shrink-0 px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg shadow-md transition-all duration-300"
              onClick={() =>
                setSearch({
                  ...search,
                  [inputField]: '',
                } as SearchBookFieldsType | SearchRatingFieldsType)
              }
            >
              <Eraser className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchInputFields;
