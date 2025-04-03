'use client';

import React, { useEffect } from 'react';
import Spinner from '@/components/Spinner';
import PaginationBar from '@/components/PaginationBar';
import MetadataType from '@/types/MetadataType';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
  SearchFieldType,
} from '@/types/SearchFieldsType';
import BookType from '@/types/BookType';
import RatingType from '@/types/RatingType';
import { SortOptionsType } from '@/types/SortOptionsType';
import CompactSearch from './CompactSearch';
import Search from './Search';

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
  containerClassName = 'search-container',
  sortByOptions = ['book', 'user', 'reviewScore'],
}: SearchContainerProps<T>) => {
  useEffect(() => {
    if (isLoading) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [isLoading]);

  return (
    <div className={`${containerClassName} py-6 sm:py-8 lg:py-10`}>
      <h1 className="search-title sm:text-3xl sm:mb-8">{title}</h1>

      {isClosedInputs ? (
        <CompactSearch
          search={search}
          handleSearch={handleSearch}
          isLoading={isLoading}
          setIsClosedInputs={setIsClosedInputs}
        />
      ) : (
        <Search
          search={search}
          setSearch={setSearch}
          sortOptions={sortOptions}
          setSortOptions={setSortOptions}
          handleSearch={handleSearch}
          inputFields={inputFields}
          initialSearch={initialSearch}
          setIsClosedInputs={setIsClosedInputs}
          sortByOptions={sortByOptions}
        />
      )}

      <div className="w-full mt-8">
        {isLoading ? (
          <Spinner className="mx-auto mt-16 mb-[100vh] w-12 h-12 text-blue-500 animate-spin" />
        ) : data.data.length ? (
          <div className="w-full">{children}</div>
        ) : (
          <p className="no-items-text">No items found.</p>
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
