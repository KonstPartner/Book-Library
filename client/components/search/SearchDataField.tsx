import React from 'react';
import Input from '@/components/Input';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
  SearchFieldType,
} from '@/types/SearchFieldsType';

interface SearchDataFieldProps<
  T extends SearchBookFieldsType | SearchRatingFieldsType
> {
  setSearch: (value: T) => void;
  search: T;
}

const SearchDataField = <
  T extends SearchBookFieldsType | SearchRatingFieldsType
>({
  setSearch,
  search,
}: SearchDataFieldProps<T>) => {
  const publishedDate = (search as SearchBookFieldsType).publishedDate;
  const [year, month, day] = (publishedDate.field || '').split('-') || [
    '',
    '',
    '',
  ];

  const dateFields = [
    {
      type: 'year' as const,
      placeholder: 'YYYY',
      value: year,
      maxLength: 4,
      title: 'Published year',
    },
    {
      type: 'month' as const,
      placeholder: 'MM',
      value: month,
      maxLength: 2,
      title: 'Published month',
    },
    {
      type: 'day' as const,
      placeholder: 'DD',
      value: day,
      maxLength: 2,
      title: 'Published day',
    },
  ];

  const handleDateChange = (type: 'year' | 'month' | 'day', value: string) => {
    const limits: Record<string, number> = { year: 3000, month: 12, day: 31 };
    const cleanedValue = value.replace(/\D/g, '');

    if (
      cleanedValue &&
      (Number(cleanedValue) > limits[type] || Number(cleanedValue) < 1)
    ) {
      return;
    }

    const newDate = {
      year: type === 'year' ? cleanedValue : year || '',
      month: type === 'month' ? cleanedValue : month || '',
      day: type === 'day' ? cleanedValue : day || '',
    };

    const newPublishedDate = [newDate.year, newDate.month, newDate.day]
      .filter(Boolean)
      .join('-');

    setSearch({
      ...search,
      publishedDate: {
        field: newPublishedDate,
        isExact: publishedDate.isExact,
      } as SearchFieldType,
    } as T);
  };

  return (
    <div className="flex items-center gap-1 justify-center">
      {dateFields.map(
        ({ type, placeholder, value, maxLength, title }, index) => (
          <div key={type} className="flex items-center">
            <Input
              className={`w-14 px-0 text-center text-sm sm:text-base bg-transparent border-white/20`}
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={(e) => handleDateChange(type, e.target.value)}
              maxLength={maxLength}
              title={title}
            />
            {index < dateFields.length - 1 && (
              <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base ml-1">
                -
              </span>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default SearchDataField;
