import React from 'react';
import { ChevronDown, ChevronUp, Eraser } from 'lucide-react';
import Button from '@/components/Button';
import SearchFieldsPreview from '@/components/search/SearchFieldsPreview';
import SearchInputFields from '@/components/search/SearchInputFields';
import Spinner from '@/components/Spinner';
import PaginationBar from '@/components/PaginationBar';

interface SearchContainerProps<T> {
  title: string;
  search: T;
  setSearch: (value: T) => void;
  isLoading: boolean;
  data: {
    data: any[];
    metadata: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
      perPage: number;
    };
  };
  isClosedInputs: boolean;
  setIsClosedInputs: (value: boolean) => void;
  handleSearch: () => void;
  handlePageChange: (page: number) => void;
  inputFields: string[];
  initialSearch: T;
  children: React.ReactNode;
  containerClassName?: string;
}

export const SearchContainer = <T,>({
  title,
  search,
  setSearch,
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
}: SearchContainerProps<T>) => {
  return (
    <div className={`${containerClassName} py-6 sm:py-8 lg:py-10`}>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 w-full text-gray-900 dark:text-gray-100">
        {title}
      </h1>

      {isClosedInputs ? (
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <SearchFieldsPreview search={search as any} />
          <Button
            className="mt-4 mx-auto px-4 py-2 flex items-center gap-2 text-gray-700 dark:text-gray-300 
              bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
            onClick={() => setIsClosedInputs(false)}
          >
            <ChevronDown className="w-5 h-5" /> Open fields
          </Button>
        </div>
      ) : (
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
          <SearchInputFields
            inputFields={inputFields as any}
            search={search as any}
            setSearch={(value) => setSearch(value as T)}
          />
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button
              onClick={() => setSearch(initialSearch)}
              className="px-4 py-2 flex items-center gap-2 text-gray-700 dark:text-gray-300 
                bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
            >
              <Eraser className="w-5 h-5" /> <span>Clear fields</span>
            </Button>
            <Button
              onClick={() => setIsClosedInputs(true)}
              className="px-4 py-2 flex items-center gap-2 text-gray-700 dark:text-gray-300 
                bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
            >
              <ChevronUp className="w-5 h-5" /> Hide fields
            </Button>
          </div>
        </div>
      )}

      <Button
        className="mt-8 mx-auto px-6 py-3 text-white font-medium 
          bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 
          rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSearch}
        disabled={isLoading}
      >
        Search
      </Button>

      <div className="w-full mt-8">
        {isLoading ? (
          <Spinner className="mx-auto my-16 w-12 h-12 text-blue-500" />
        ) : data.data.length ? (
          <div className="w-full">{children}</div>
        ) : (
          <p className="mt-10 text-gray-500 dark:text-gray-400 text-center text-lg">
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
