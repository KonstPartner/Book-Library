import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
  SearchFieldType,
} from '@/types/SearchFieldsType';
import getPrettyField from '@/utils/getPrettyField';
import Button from '../Button';

interface ExactMenuProps<
  T extends Record<keyof T, SearchFieldType> &
    (SearchBookFieldsType | SearchRatingFieldsType)
> {
  inputFields: Array<keyof T>;
  search: T;
  setSearch: (value: T) => void;
}

const ExactMenu = <
  T extends Record<keyof T, SearchFieldType> &
    (SearchBookFieldsType | SearchRatingFieldsType)
>({
  inputFields,
  search,
  setSearch,
}: ExactMenuProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleExact = (field: keyof T) => {
    setSearch({
      ...search,
      [field]: {
        ...search[field],
        isExact: !search[field].isExact,
      } as SearchFieldType,
    });
  };

  return (
    <div className="relative w-fit">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-base rounded-lg shadow-lg transition-all duration-300 z-50"
      >
        <span className="inline-block transition-transform duration-300 ease-in-out">
          <ChevronDown
            className={`w-5 h-5 transform ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </span>
        <span>Exact Fields</span>
      </Button>

      <div
        className={`dropdown-menu top-12 -left-24 sm:left-0 w-80 sm:w-96 ${
          isOpen
            ? 'opacity-100 scale-y-100'
            : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative group mb-3">
          <span className="absolute right-0 bottom-full mb-1 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out pointer-events-none">
            Toggle exact search for precise matching
          </span>
          <h3 className="text-md font-semibold text-white flex justify-center gap-2 items-center">
            Exact Fields <Info size={16} />
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {inputFields.map((inputField) => (
            <label
              key={inputField as string}
              className="flex items-center gap-2 text-white cursor-pointer"
            >
              <input
                type="checkbox"
                checked={search[inputField].isExact}
                onChange={() => toggleExact(inputField)}
                className="checkbox-custom"
              />
              <span className="text-md">
                {getPrettyField(String(inputField))}
              </span>
            </label>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default ExactMenu;
