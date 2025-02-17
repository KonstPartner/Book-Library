import React from 'react';
import Input from '@/components/Input';
import BookType from '@/types/BookType';
import RatingType from '@/types/RatingType';

const SearchDataField = ({
  setSearch,
  search,
}: {
  setSearch: (value: Partial<BookType> | Partial<RatingType>) => void;
  search: Partial<BookType> | Partial<RatingType>;
}) => {
  const { publishedDate = '' } = search as Partial<BookType>;
  const [year, month, day] = (publishedDate as string).split('-');

  const dateFields = [
    { type: 'year', placeholder: 'YYYY', value: year, width: 'w-20' },
    { type: 'month', placeholder: 'MM', value: month, width: 'w-16' },
    { type: 'day', placeholder: 'DD', value: day, width: 'w-14' },
  ] as const;

  const handleDateChange = (type: 'year' | 'month' | 'day', value: string) => {
    const limits = { year: 3000, month: 12, day: 31 };
    if (value) {
      if (Number(value) > limits[type] || Number(value) < 1) return;
    }

    const newDate = {
      year: type === 'year' ? value : year || '',
      month: type === 'month' ? value : month || '',
      day: type === 'day' ? value : day || '',
    };

    setSearch({
      ...search,
      publishedDate: [newDate.year, newDate.month, newDate.day]
        .filter(Boolean)
        .join('-'),
    } as Partial<BookType>);
  };

  return (
    <div className="flex gap-2 items-center border dark:bg-transparent dark:border-gray-500 w-full mx-1 my-2 py-1 px-2">
      <p className="text-gray-400 dark:text-gray-400">Enter Published date:</p>
      {dateFields.map(({ type, placeholder, value, width }, index) => (
        <div key={type} className="flex gap-2 items-center">
          <Input
            className={`mx-1 py-1 px-2 ${width}`}
            type="number"
            placeholder={placeholder}
            value={value || ''}
            onChange={(e) => handleDateChange(type, e.target.value)}
          />
          {index < dateFields.length - 1 && (
            <p className="text-gray-500 dark:text-gray-400">-</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchDataField;
