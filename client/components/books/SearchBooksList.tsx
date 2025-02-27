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



const SearchBooksList = () => {
  const [search, setSearch] = useState<Partial<BookType>>(bookDataFields);
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState<BookType[] | []>([]);
  const [isClosedInputs, setIsClosedInputs] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const fetchSearchedBooks = useCallback(async (url: string) => {
    setIsLoading(true);
    const data = await fetchData(url);
    if (data?.data) {
      setBooks(data.data);
    }
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    fetchSearchedBooks(`${ALL_BOOKS_URL}?limit=10`);
  }, [fetchSearchedBooks]);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    setSearch((prev) => ({
      ...prev,
      ...Object.fromEntries(
        Object.entries(params).filter(([key]) => key in prev)
      ),
    }));
  }, [searchParams]);

  const handleButtonClick = useCallback(async () => {
    if (!validateSearch(search)) return;
    updateSearchParams(search, { searchParams, router, pathname });
    setIsClosedInputs(true);
    const query = createSearchQueryString(search, booksInputFields);
    fetchSearchedBooks(`${ALL_BOOKS_URL}?${query}`);
  }, [fetchSearchedBooks, pathname, router, search, searchParams]);

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
        <Button onClick={() => setSearch(bookDataFields)} className="px-4 py-2">
          <Eraser /> <span className="ml-1">Clear fields</span>
        </Button>
        <Button onClick={() => setIsClosedInputs(true)} className="px-4 py-2">
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
  ) : books.length ? (
    <BooksList books={books} search={search} />
  ) : (
    <p className="mt-10 text-gray-500 dark:text-gray-400">No books found.</p>
  )}
</div>

  );
};

export default SearchBooksList;
