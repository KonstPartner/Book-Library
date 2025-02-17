import React, { useMemo } from 'react';
import BookType from '@/types/BookType';
import RatingType from '@/types/RatingType';

const SearchScoreField = ({
  setSearch,
  search,
  field,
}: {
  setSearch: (value: Partial<BookType> | Partial<RatingType>) => void;
  search: Partial<BookType> | Partial<RatingType>;
  field: keyof (BookType | RatingType);
}) => {
  const fieldValue = (search[field] as string) || '';
  const [whole, decimal] = fieldValue.split('.');

  const handleWholeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newWhole = e.target.value;
    if (!newWhole) {
      setSearch({ ...search, [field]: '' } as
        | Partial<BookType>
        | Partial<RatingType>);
    } else {
      setSearch({ ...search, [field]: `${newWhole}.${decimal || '0'}` } as
        | Partial<BookType>
        | Partial<RatingType>);
    }
  };

  const handleDecimalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDecimal = e.target.value;
    setSearch({ ...search, [field]: `${whole || '0'}.${newDecimal || '0'}` } as
      | Partial<BookType>
      | Partial<RatingType>);
  };

  const wholeOptions = useMemo(
    () => ['', ...Array.from({ length: 5 }, (_, i) => ++i)],
    []
  );
  const decimalOptions = useMemo(
    () => ['', ...Array.from({ length: 10 }, (_, i) => i)],
    []
  );

  return (
    <div className="flex items-center gap-2 border mx-1 my-3 px-2 w-full dark:bg-transparent dark:border-gray-500">
      <p className="text-gray-400 dark:text-gray-500">Enter rating:</p>
      <div className="flex gap-2 items-end">
        <select
          className="my-1 py-2 px-2 w-1/2 border rounded-md dark:bg-transparent"
          value={whole || ''}
          onChange={handleWholeChange}
        >
          {wholeOptions.map((num) => (
            <option className="dark:text-gray-700" key={num} value={num}>
              {num === '' ? '-' : num}
            </option>
          ))}
        </select>
        <p className="text-2xl">.</p>
        <select
          className="my-1 mr-2 py-2 px-2 w-1/2 border rounded-md dark:bg-transparent"
          value={decimal || ''}
          onChange={handleDecimalChange}
          disabled={!whole}
        >
          {decimalOptions.map((num) => (
            <option className="dark:text-gray-700" key={num} value={num}>
              {num === '' ? '-' : num}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchScoreField;
