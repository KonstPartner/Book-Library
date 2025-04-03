'use client';

import React from 'react';
import { ChevronUp, Eraser } from 'lucide-react';
import Button from '../Button';
import SearchInputFields from './SearchInputFields';
import ExactMenu from './ExactMenu';
import SortMenu from './SortMenu';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
  SearchFieldType,
} from '@/types/SearchFieldsType';
import { SortOptionsType } from '@/types/SortOptionsType';

interface SearchProps<
  T extends Record<keyof T, SearchFieldType> &
    (SearchBookFieldsType | SearchRatingFieldsType)
> {
  search: T;
  setSearch: (value: T) => void;
  sortOptions: SortOptionsType;
  setSortOptions: (options: SortOptionsType) => void;
  handleSearch: () => void;
  inputFields: Array<keyof T>;
  initialSearch: T;
  setIsClosedInputs: (value: boolean) => void;
  sortByOptions?: string[];
}

const Search = <
  T extends Record<keyof T, SearchFieldType> &
    (SearchBookFieldsType | SearchRatingFieldsType)
>({
  search,
  setSearch,
  sortOptions,
  setSortOptions,
  handleSearch,
  inputFields,
  initialSearch,
  setIsClosedInputs,
  sortByOptions,
}: SearchProps<T>) => {
  return (
    <>
      <div className="flex flex-col w-full md:w-[80%] mx-auto bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-xl shadow-lg p-4 sm:p-6 border border-white/20 gap-5">
        <SearchInputFields
          inputFields={inputFields}
          search={search}
          setSearch={setSearch}
        />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-10">
          <ExactMenu
            search={search}
            setSearch={setSearch}
            inputFields={inputFields}
          />
          <SortMenu
            sortOptions={sortOptions}
            setSortOptions={setSortOptions}
            sortByOptions={sortByOptions as string[]}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => setSearch(initialSearch)}
            className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg shadow-md transition-all duration-300 flex items-center gap-2"
          >
            <Eraser className="w-5 h-5" /> Clear fields
          </Button>
          <Button
            onClick={() => setIsClosedInputs(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg shadow-md transition-all duration-300 flex items-center gap-2"
          >
            <ChevronUp className="w-5 h-5" /> Hide fields
          </Button>
        </div>
      </div>
      <Button
        className="submit-button my-10 font-medium shadow-lg"
        onClick={handleSearch}
        disabled={false}
      >
        Search
      </Button>
    </>
  );
};

export default Search;
