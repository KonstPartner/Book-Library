import React from 'react';
import { Eraser } from 'lucide-react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import SearchDataField from './SearchDataField';
import SearchScoreField from './SearchScoreField';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
  SearchFieldType,
} from '@/types/SearchFieldsType';
import getPrettyField from '@/utils/getPrettyField';

interface SearchInputFieldsProps<
  T extends Record<keyof T, SearchFieldType> &
    (SearchBookFieldsType | SearchRatingFieldsType)
> {
  inputFields: Array<keyof T>;
  search: T;
  setSearch: (value: T) => void;
}

const SearchInputFields = <
  T extends Record<keyof T, SearchFieldType> &
    (SearchBookFieldsType | SearchRatingFieldsType)
>({
  inputFields,
  search,
  setSearch,
}: SearchInputFieldsProps<T>) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {inputFields.map((inputField) => (
        <div
          key={inputField as string}
          className="flex sm:items-center gap-3 sm:gap-2"
        >
          <div className="flex-1 min-w-0">
            {inputField === 'publishedDate' ? (
              <SearchDataField setSearch={setSearch} search={search} />
            ) : inputField === 'reviewScore' ? (
              <SearchScoreField
                setSearch={setSearch}
                search={search}
                field={inputField as keyof SearchRatingFieldsType}
              />
            ) : (
              <Input
                className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base"
                value={search[inputField].field}
                onChange={(e) =>
                  setSearch({
                    ...search,
                    [inputField]: {
                      ...search[inputField],
                      field: e.target.value,
                    },
                  })
                }
                placeholder={`Enter ${getPrettyField(String(inputField))}`}
              />
            )}
          </div>
          {search[inputField].field && (
            <Button
              className="flex-shrink-0 px-3 py-2 sm:px-3 sm:py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg shadow-md transition-all duration-300"
              onClick={() =>
                setSearch({
                  ...search,
                  [inputField]: { ...search[inputField], field: '' },
                })
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
