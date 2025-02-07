import React from 'react';
import { SearchBooksFieldsType } from '@/types/SearchFields';

const SearchFieldsPreview = ({ search }: { search: SearchBooksFieldsType }) => {
  return (
    <>
      {(Object.keys(search) as Array<keyof SearchBooksFieldsType>).some((key) =>
        search[key].trim()
      ) && (
        <div className="border-2 text-left p-5 m-auto mb-5 dark:border-transparent dark:bg-gray-600 dark:rounded-md">
          {(Object.keys(search) as Array<keyof SearchBooksFieldsType>).map(
            (key, index) =>
              search[key].trim() ? (
                <p key={index} className="text-gray-500 dark:text-gray-300 font-semibold dark:font-thin">
                  {key}: {search[key]}
                </p>
              ) : (
                ''
              )
          )}
        </div>
      )}
    </>
  );
};

export default SearchFieldsPreview;
