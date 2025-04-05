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
    <div className="score-field-container flex flex-row gap-2 sm:gap-3">
      <p className="text-sm text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap pl-2">
        {getPrettyField(field)}:
      </p>
      <div className="flex items-center gap-1 flex-1 min-w-0">
        <select
          className="w-16 sm:w-20 p-2 pr-6 text-sm sm:text-base bg-transparent border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 dark:text-white"
          value={whole || ''}
          onChange={handleWholeChange}
        >
          {wholeOptions.map((num) => (
            <option key={num} value={num}>
              {num === '' ? '-' : num}
            </option>
          ))}
        </select>
        <span className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl">
          .
        </span>
        <select
          className="w-16 sm:w-20 p-2 pr-6 text-sm sm:text-base bg-transparent border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 dark:text-white"
          value={decimal || ''}
          onChange={handleDecimalChange}
          disabled={!whole}
        >
          {decimalOptions.map((num) => (
            <option key={num} value={num}>
              {num === '' ? '-' : num}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchScoreField;
