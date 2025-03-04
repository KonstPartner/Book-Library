import React from 'react';
import { LockIcon } from 'lucide-react';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
  SearchFieldType,
} from '@/types/SearchFieldsType';
import getSearchQueries from '@/utils/getSearchQueries';

interface SearchFieldsPreviewProps<
  T extends Record<keyof T, SearchFieldType> &
    (SearchBookFieldsType | SearchRatingFieldsType)
> {
  search: T;
}

const SearchFieldsPreview = <
  T extends Record<keyof T, SearchFieldType> &
    (SearchBookFieldsType | SearchRatingFieldsType)
>({
  search,
}: SearchFieldsPreviewProps<T>) => {
  const { searchFields } = getSearchQueries(search);

  const filteredKeys = Object.keys(searchFields).filter((key) =>
    searchFields[key]?.trim()
  ) as string[];

  if (!filteredKeys.length) return null;

  return (
    <div className="border border-white/20 text-left p-5 m-auto my-5 bg-white/5 backdrop-blur-sm rounded-lg">
      {filteredKeys.map((key, index) => (
        <div key={index} className="flex items-center gap-2">
          <LockIcon
            size={15}
            className={`${
              search[key as keyof T].isExact
                ? 'text-purple-700 bg-clip-text '
                : 'text-transparent'
            }`}
          />
          <p className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent m-0 text-lg font-bold">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text font-normal">
              {key}:
            </span>{' '}
            {searchFields[key]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SearchFieldsPreview;
