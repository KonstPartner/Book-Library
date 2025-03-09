import React from 'react';
import { ChevronDown, ChevronUp, Eraser } from 'lucide-react';
import Button from '@/components/Button';
import SearchFieldsPreview from '@/components/search/SearchFieldsPreview';
import SearchInputFields from '@/components/search/SearchInputFields';
import Spinner from '@/components/Spinner';
import PaginationBar from '@/components/PaginationBar';
import MetadataType from '@/types/MetadataType';
import ExactMenu from './ExactMenu';
import SortMenu from './SortMenu';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
  SearchFieldType,
} from '@/types/SearchFieldsType';
import BookType from '@/types/BookType';
import RatingType from '@/types/RatingType';
import { SortOptionsType } from '@/types/SortOptionsType';

interface SearchContainerProps<
  T extends Record<keyof T, SearchFieldType> &
    (SearchBookFieldsType | SearchRatingFieldsType)
> {
  title: string;
  search: T;
  setSearch: (value: T) => void;
  sortOptions: SortOptionsType;
  setSortOptions: (options: SortOptionsType) => void;
  isLoading: boolean;
  data: { data: BookType[] | RatingType[]; metadata: MetadataType };
  isClosedInputs: boolean;
  setIsClosedInputs: (value: boolean) => void;
  handleSearch: () => void;
  handlePageChange: (page: number) => void;
  inputFields: Array<keyof T>;
  initialSearch: T;
  children: React.ReactNode;
  containerClassName?: string;
  sortByOptions?: string[];
}

const SearchContainer = <
  T extends Record<keyof T, SearchFieldType> &
    (SearchBookFieldsType | SearchRatingFieldsType)
>({
  title,
  search,
  setSearch,
  sortOptions,
  setSortOptions,
  isLoading,
  data,
  isClosedInputs,
  setIsClosedInputs,
  handleSearch,
  handlePageChange,
  inputFields,
  initialSearch,
  children,
  containerClassName = 'flex flex-col items-center text-center w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
  sortByOptions = ['book', 'user', 'reviewScore'],
}: SearchContainerProps<T>) => {
  return (
    <div className={`${containerClassName} py-6 sm:py-8 lg:py-10`}>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 w-full text-gray-900 dark:text-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h1>

      {isClosedInputs ? (
        <div className="w-fit bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-xl shadow-lg p-4 sm:p-6 border border-white/20 mx-auto">
          <SearchFieldsPreview search={search} />
          <div className="flex justify-center items-center gap-4 mt-4">
            <Button
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-purple-600"
              onClick={handleSearch}
              disabled={isLoading}
            >
              Search
            </Button>
            <div className="relative group">
              <Button
                className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg shadow-md transition-all duration-300"
                onClick={() => setIsClosedInputs(false)}
              >
                <ChevronDown className="w-5 h-5" />
              </Button>
              <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform -translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap">
                Open fields
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-xl shadow-lg p-4 sm:p-6 border border-white/20 gap-5">
          <SearchInputFields
            inputFields={inputFields}
            search={search}
            setSearch={setSearch}
          />
          <div className="flex flex-col sm:flex-row items-center justify-around gap-4 md:gap-10">
            <ExactMenu
              search={search}
              setSearch={setSearch}
              inputFields={inputFields}
            />
            <SortMenu
              sortOptions={sortOptions}
              setSortOptions={setSortOptions}
              sortByOptions={sortByOptions}
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
      )}

      {!isClosedInputs && (
        <Button
          className="mt-8 mx-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-purple-600"
          onClick={handleSearch}
          disabled={isLoading}
        >
          Search
        </Button>
      )}

      <div className="w-full mt-8">
        {isLoading ? (
          <Spinner className="mx-auto my-16 w-12 h-12 text-blue-500 animate-spin" />
        ) : data.data.length ? (
          <div className="w-full">{children}</div>
        ) : (
          <p className="mt-10 text-gray-500 dark:text-gray-400 text-center text-lg bg-white/10 backdrop-blur-sm rounded-lg py-4">
            No items found.
          </p>
        )}
      </div>

      {!isLoading && (
        <div className="mt-8 mx-auto">
          <PaginationBar
            metadata={data.metadata}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default SearchContainer;
