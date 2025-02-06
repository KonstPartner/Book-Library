import { SearchBooksFieldsType } from '@/types/SearchFields';
import React from 'react';

const SearchFieldsPreview = ({ search }: { search: SearchBooksFieldsType }) => {
  return (
    <>
      {(Object.keys(search) as Array<keyof SearchBooksFieldsType>).some((key) =>
        search[key].trim()
      ) && (
        <div className="border-2 text-left p-5 m-auto mb-5">
          {(Object.keys(search) as Array<keyof SearchBooksFieldsType>).map(
            (key, index) =>
              search[key].trim() ? (
                <p key={index} className="text-gray-500 font-semibold">
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
