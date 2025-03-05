import React, { ChangeEvent, useMemo } from 'react';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
  SearchFieldType,
} from '@/types/SearchFieldsType';
import getPrettyField from '@/utils/getPrettyField';

interface SearchScoreFieldProps<
  T extends SearchBookFieldsType | SearchRatingFieldsType
> {
  setSearch: (value: T) => void;
  search: T;
  field: keyof SearchRatingFieldsType;
}

const SearchScoreField = <
  T extends SearchBookFieldsType | SearchRatingFieldsType
>({
  setSearch,
  search,
  field,
}: SearchScoreFieldProps<T>) => {
  const reviewScore = (search as SearchRatingFieldsType)[field];
  const fieldValue = reviewScore.field || '';
  const [whole, decimal] = fieldValue.split('.');

  const handleWholeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newWhole = e.target.value;
    setSearch({
      ...search,
      [field]: {
        field: newWhole ? `${newWhole}.${decimal || '0'}` : '',
        isExact: reviewScore.isExact,
      } as SearchFieldType,
    } as T);
  };

  const handleDecimalChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDecimal = e.target.value;
    setSearch({
      ...search,
      [field]: {
        field: `${whole || '0'}.${newDecimal || '0'}`,
        isExact: reviewScore.isExact,
      } as SearchFieldType,
    } as T);
  };

  const wholeOptions = useMemo(
    () => ['', ...Array.from({ length: 5 }, (_, i) => String(i + 1))],
    []
  );
  const decimalOptions = useMemo(
    () => ['', ...Array.from({ length: 10 }, (_, i) => String(i))],
    []
  );

  return (
    <div className="flex items-center gap-2 sm:gap-0 md:gap-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-white/20 rounded-lg p-1.5 w-full">
      <p className="sm:text-xs text-gray-600 sm:text-gray-500 dark:text-gray-300 sm:dark:text-gray-400 font-medium text-sm whitespace-nowrap">
        {getPrettyField(field)}:
      </p>
      <div className="flex items-center gap-1 flex-1">
        <select
          className="py-2 px-3 sm:px-0 w-full bg-white/5 dark:bg-gray-900/5 border border-gray-400 rounded-lg text-sm sm:text-base text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
          className="py-2 px-3 sm:px-0 w-full bg-white/5 dark:bg-gray-900/5 border border-gray-400 rounded-lg text-sm sm:text-base text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
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
