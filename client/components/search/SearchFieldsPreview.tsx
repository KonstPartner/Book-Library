import React from 'react';
import BookType from '@/types/BookType';
import RatingType from '@/types/RatingType';

const SearchFieldsPreview = ({
  search,
}: {
  search: Partial<BookType> | Partial<RatingType>;
}) => {
  const filteredKeys = Object.keys(search).filter((key) =>
    (search[key as keyof typeof search] as string)?.trim()
  );

  if (!filteredKeys.length) return null;

  return (
    <div className="border border-white/20 text-left p-5 m-auto my-5 bg-white/5 backdrop-blur-sm rounded-lg">
      {filteredKeys.map((key, index) => (
        <p
          key={index}
          className="text-gray-600 dark:text-gray-300 font-medium"
        >
          <span className="text-blue-500">{key}:</span>{' '}
          {search[key as keyof typeof search]}
        </p>
      ))}
    </div>
  );
};

export default SearchFieldsPreview;
