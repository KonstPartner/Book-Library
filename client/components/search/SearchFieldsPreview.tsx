import React from 'react';
import {
  SearchBooksFieldsType,
  SearchRatingsFieldsType,
} from '@/types/SearchFields';

const SearchFieldsPreview = ({
  search,
}: {
  search: SearchBooksFieldsType | SearchRatingsFieldsType;
}) => {
  const filteredKeys = Object.keys(search).filter((key) =>
    (search[key as keyof typeof search] as string).trim()
  );

  if (!filteredKeys.length) return null;

  return (
    <div className="border-2 text-left p-5 m-auto mb-5 dark:border-transparent dark:bg-gray-600 dark:rounded-md">
      {filteredKeys.map((key, index) => (
        <p
          key={index}
          className="text-gray-500 dark:text-gray-300 font-semibold dark:font-thin"
        >
          {key}: {search[key as keyof typeof search]}
        </p>
      ))}
    </div>
  );
};

export default SearchFieldsPreview;
