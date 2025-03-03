import React from 'react';
import getSearchQueries from '@/utils/getSearchQueries';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
} from '@/types/SearchFieldsType';

const SearchFieldsPreview = ({
  search,
}: {
  search: SearchBookFieldsType | SearchRatingFieldsType;
}) => {
  const { searchFields } = getSearchQueries(search);
  const filteredKeys = Object.keys(searchFields).filter((key) =>
    (searchFields[key as keyof typeof searchFields] as string)?.trim()
  );

  if (!filteredKeys.length) return null;

  return (
    <div className="border border-white/20 text-left p-5 m-auto my-5 bg-white/5 backdrop-blur-sm rounded-lg">
      {filteredKeys.map((key, index) => (
        <p key={index} className="text-gray-600 dark:text-gray-300 font-medium">
          <span className="text-blue-500">{key}:</span>{' '}
          {searchFields[key as any]}
        </p>
      ))}
    </div>
  );
};

export default SearchFieldsPreview;
