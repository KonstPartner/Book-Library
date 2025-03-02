import React, { ChangeEvent, useMemo } from 'react';
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

  const handleWholeChange = (e: ChangeEvent<HTMLSelectElement>) => {
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

  const handleDecimalChange = (e: ChangeEvent<HTMLSelectElement>) => {
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
    <div className="flex items-center gap-2 sm:gap-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 sm:p-4 w-full">
      <p className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base whitespace-nowrap">
        Rating:
      </p>
      <div className="flex items-center gap-2 sm:gap-3 flex-1">
        <select
          className="py-2 px-3 w-full sm:w-20 bg-white/5 dark:bg-gray-900/5 border border-white/20 rounded-lg text-sm sm:text-base text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          value={whole || ''}
          onChange={handleWholeChange}
        >
          {wholeOptions.map((num) => (
            <option
              key={num}
              value={num}
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            >
              {num === '' ? '-' : num}
            </option>
          ))}
        </select>
        <span className="text-gray-500 dark:text-gray-400 text-xl sm:text-2xl">
          .
        </span>
        <select
          className="py-2 px-3 w-full sm:w-20 bg-white/5 dark:bg-gray-900/5 border border-white/20 rounded-lg text-sm sm:text-base text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
          value={decimal || ''}
          onChange={handleDecimalChange}
          disabled={!whole}
        >
          {decimalOptions.map((num) => (
            <option
              key={num}
              value={num}
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            >
              {num === '' ? '-' : num}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchScoreField;
