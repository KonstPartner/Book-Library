import React from 'react';
import Input from '@/components/Input';
import BookType from '@/types/BookType';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
} from '@/types/SearchFieldsType';

const SearchDataField = ({
  setSearch,
  search,
}: {
  setSearch: (value: SearchBookFieldsType | SearchRatingFieldsType) => void;
  search: SearchBookFieldsType | SearchRatingFieldsType;
}) => {
  const { publishedDate } = search as SearchBookFieldsType;
  const [year, month, day] = (publishedDate.field || '').split('-') || [
    '',
    '',
    '',
  ];

  const dateFields = [
    {
      type: 'year',
      placeholder: 'YYYY',
      value: year,
      maxLength: 4,
      width: 'w-20 sm:w-22',
    },
    {
      type: 'month',
      placeholder: 'MM',
      value: month,
      maxLength: 2,
      width: 'w-14 sm:w-16',
    },
    {
      type: 'day',
      placeholder: 'DD',
      value: day,
      maxLength: 2,
      width: 'w-14 sm:w-16',
    },
  ] as const;

  const handleDateChange = (type: 'year' | 'month' | 'day', value: string) => {
    const limits = { year: 3000, month: 12, day: 31 };
    const cleanedValue = value.replace(/\D/g, '');

    if (
      cleanedValue &&
      (Number(cleanedValue) > limits[type] || Number(cleanedValue) < 1)
    )
      return;

    const newDate = {
      year: type === 'year' ? cleanedValue : year || '',
      month: type === 'month' ? cleanedValue : month || '',
      day: type === 'day' ? cleanedValue : day || '',
    };

    const newPublishedDate =
      [newDate.year, newDate.month, newDate.day].filter(Boolean).join('-') ||
      '';

    setSearch({
      ...search,
      publishedDate: {
        field: newPublishedDate,
        isExact: (search as SearchBookFieldsType).publishedDate.isExact,
      },
    } as SearchBookFieldsType);
  };

  return (
    <div className="flex items-center w-fit mx-auto">
      {dateFields.map(
        ({ type, placeholder, value, maxLength, width }, index) => (
          <div key={type} className="flex items-center">
            <Input
              className={`${width} text-center text-sm sm:text-base bg-transparent border-white/20`}
              type="text"
              placeholder={placeholder}
              value={value || ''}
              onChange={(e) => handleDateChange(type, e.target.value)}
              maxLength={maxLength}
            />
            {index < dateFields.length - 1 && (
              <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mx-1">
                {'-'}
              </span>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default SearchDataField;
