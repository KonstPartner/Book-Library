'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import BookType from '@/types/BookType';
import RatingType from '@/types/RatingType';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
  SearchFieldType,
} from '@/types/SearchFieldsType';

const ExactMenu = ({
  inputFields,
  search,
  setSearch,
}: {
  inputFields: (keyof Partial<BookType> | keyof Partial<RatingType>)[];
  search: SearchBookFieldsType | SearchRatingFieldsType;
  setSearch: (value: SearchBookFieldsType | SearchRatingFieldsType) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleExact = (
    field: keyof Partial<BookType> | keyof Partial<RatingType>
  ) => {
    setSearch({
      ...search,
      [field]: {
        field: (search as any)[field].field,
        isExact: !(search as any)[field].isExact,
      } as SearchFieldType,
    });
  };

  return (
    <div className="relative w-fit mx-auto">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg rounded-lg shadow-lg transition-all duration-300 z-50"
      >
        <span className="inline-block transition-transform duration-300 ease-in-out">
          <ChevronDown
            className={`w-5 h-5 transform ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </span>
        <span>Exact Fields</span>
      </button>

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute top-14 right-0 w-80 sm:w-96 bg-gradient-to-br from-blue-600 to-purple-600 border border-white/30 rounded-lg shadow-lg p-4 z-50 transition-all duration-300 ease-in-out transform ${
            isOpen
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative group mb-3">
            <span className="absolute right-0 bottom-full mb-1 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out pointer-events-none">
              Toggle exact search for precise matching
            </span>
            <h3 className="text-md font-semibold text-white">Exact Fields</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {inputFields.map((inputField) => (
              <label
                key={inputField as string}
                className="flex items-center gap-2 text-white cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={(search as any)[inputField].isExact}
                  onChange={() => toggleExact(inputField)}
                  className="appearance-none w-7 h-7 bg-transparent border-2 border-gradient-to-r from-blue-400 to-purple-500 rounded-md checked:bg-transparent transition-all duration-200 ease-in-out relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400 before:to-purple-500 before:scale-0 before:rounded-sm checked:before:scale-75 before:transition-transform before:duration-200 before:ease-in-out"
                />
                <span className="text-md">
                  {String(inputField)
                    .replace(/([A-Z])/g, ' $1')
                    .trim()}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExactMenu;
