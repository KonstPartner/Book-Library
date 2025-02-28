'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Eraser } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Button from '@/components/Button';
import BookType from '@/types/BookType';
import BooksList from '@/components/books/BooksList';
import fetchData from '@/utils/fetchData';
import createSearchQueryString from '@/utils/createSearchQueryString';
import { bookDataFields, booksInputFields } from '@/constants/searchFields';
import { ALL_BOOKS_URL } from '@/constants/apiSources';
import validateSearch from '@/utils/validateSearch';
import SearchFieldsPreview from '../search/SearchFieldsPreview';
import SearchInputFields from '@/components/search/SearchInputFields';
import updateSearchParams from '@/utils/updateSearchParams';
import Spinner from '@/components/Spinner';
import BooksType from '@/types/BooksType';
import PaginationBar from '../PaginationBar';

const SearchBooksList = () => {
  const [search, setSearch] = useState<Partial<BookType>>(bookDataFields);
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState<BooksType>({
    data: [],
    metadata: { totalItems: 0, totalPages: 0, currentPage: 1, perPage: 10 },
  });
  const [isClosedInputs, setIsClosedInputs] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const fetchSearchedBooks = useCallback(
    async (offset: number = 0) => {
      setIsLoading(true);
      const query = createSearchQueryString(search, booksInputFields);
      const url = `${ALL_BOOKS_URL}?${query}&offset=${offset}`;
      const data = await fetchData(url);
      if (data?.data) {
        setBooks(data.data);
      }
      setIsLoading(false);
    },
    [search]
  );

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    const offset = (page - 1) * books.metadata.perPage;
    fetchSearchedBooks(offset);
  }, [fetchSearchedBooks, searchParams, books.metadata.perPage]);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setSearch((prev) => ({
      ...prev,
      ...Object.fromEntries(
        Object.entries(params).filter(([key]) => key in prev && key !== 'page')
      ),
    }));
  }, [searchParams]);

  const handleButtonClick = useCallback(async () => {
    if (!validateSearch(search)) return;
    updateSearchParams(
      { ...search, page: '1' },
      { searchParams, router, pathname }
    );
    setIsClosedInputs(true);
    fetchSearchedBooks(0);
  }, [fetchSearchedBooks, pathname, router, search, searchParams]);

  const handlePageChange = (page: number) => {
    const offset = (page - 1) * books.metadata.perPage;
    updateSearchParams(
      { ...search, page: page.toString() },
      { searchParams, router, pathname }
    );
    fetchSearchedBooks(offset);
  };

  return (
    <div className="flex flex-col items-center text-center w-full max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="text-2xl font-bold my-4 w-full">Search Books</h1>

      {isClosedInputs ? (
        <>
          <SearchFieldsPreview search={search} />
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
              inputFields={booksInputFields}
              search={search}
              setSearch={(value) => setSearch(value as Partial<BookType>)}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 my-4 w-full">
            <Button
              onClick={() => setSearch(bookDataFields)}
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
        className="mt-10 mx-auto border-none bg-blue-500 dark:bg-blue-700 text-white hover:bg-blue-600 px-6 py-3 sm:w-auto"
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        Search
      </Button>

      {isLoading ? (
        <Spinner className="mx-auto my-16" />
      ) : books.data.length ? (
        <div className="w-full">
          <BooksList books={books} search={search} />
        </div>
      ) : (
        <p className="mt-10 text-gray-500 dark:text-gray-400">
          No books found.
        </p>
      )}

      {!isLoading && (
        <div className="my-5">
          <PaginationBar
            metadata={books.metadata}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBooksList;
