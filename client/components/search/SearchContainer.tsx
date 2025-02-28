'use client';

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
  containerClassName = 'flex flex-col items-center text-center w-full mx-auto',
}: SearchContainerProps<T>) => {
  return (
    <div className={containerClassName}>
      <h1 className="text-2xl font-bold my-4 w-full">{title}</h1>

      {isClosedInputs ? (
        <>
          <SearchFieldsPreview search={search as any} />
          <Button
            className="mt-5 mx-auto px-4 py-2"
            onClick={() => setIsClosedInputs(false)}
          >
            <ChevronDown /> Open fields
          </Button>
        </>
      ) : (
        <>
          <div className="w-full">
            <SearchInputFields
              inputFields={inputFields as any}
              search={search as any}
              setSearch={(value) => setSearch(value as T)}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 my-4 w-full">
            <Button
              onClick={() => setSearch(initialSearch)}
              className="px-4 py-2"
            >
              <Eraser /> <span className="ml-1">Clear fields</span>
            </Button>
            <Button
              onClick={() => setIsClosedInputs(true)}
              className="px-4 py-2"
            >
              <ChevronUp /> Hide fields
            </Button>
          </div>
        </>
      )}

      <Button
        className="mt-10 mx-auto border-none bg-blue-500 dark:bg-blue-700 text-white hover:bg-blue-600 px-6 py-3 sm:w-auto mb-5"
        onClick={handleSearch}
        disabled={isLoading}
      >
        Search
      </Button>

      {isLoading ? (
        <Spinner className="mx-auto my-16" />
      ) : data.data.length ? (
        <div className="w-full">{children}</div>
      ) : (
        <p className="mt-10 text-gray-500 dark:text-gray-400">
          No items found.
        </p>
      )}

      {!isLoading && (
        <div className="my-5 mx-auto">
          <PaginationBar
            metadata={data.metadata}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
