'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Eraser } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Button from '@/components/Button';
import BookType from '@/types/BookType';
import BooksList from '@/components/books/BooksList';
import fetchData from '@/utils/fetchData';
import createSearchQueryString from '@/utils/createSearchQueryString';
import { SearchBooksFieldsType } from '@/types/SearchFields';
import { booksInputFields } from '@/constants/searchFields';
import { ALL_BOOKS_URL } from '@/constants/apiSources';
import validateSearch from '@/utils/validateSearch';
import SearchFieldsPreview from '../search/SearchFieldsPreview';
import SearchInputFields from '../search/SearchInputFields';
import updateSearchParams from '@/utils/updateSearchParams';

const initialSearch = {
  title: '',
  description: '',
  author: '',
  publishedDate: '',
  publisher: '',
  category: '',
};

const SearchBooksList = () => {
  const [search, setSearch] = useState<SearchBooksFieldsType>(initialSearch);
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState<BookType[] | []>([]);
  const [isClosedInputs, setIsClosedInputs] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetchSearchedBooks(`${ALL_BOOKS_URL}?limit=10`);
  }, []);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    setSearch((prev) => ({
      ...prev,
      ...Object.fromEntries(
        Object.entries(params).filter(([key]) => key in prev)
      ),
    }));
  }, [searchParams]);

  const fetchSearchedBooks = async (url: string) => {
    setIsLoading(true);
    const data = await fetchData(url);
    if (data?.data) {
      setBooks(data.data);
    }
    setIsLoading(false);
  };

  const handleButtonClick = async () => {
    if (!validateSearch(search)) return;
    updateSearchParams(search, { searchParams, router, pathname });
    setIsClosedInputs(true);
    const query = createSearchQueryString(search, booksInputFields);
    fetchSearchedBooks(`${ALL_BOOKS_URL}?${query}`);
  };

  return (
    <div className="flex flex-col text-center">
      <h1 className="text-2xl font-bold text-center my-4 w-full">
        Search Books
      </h1>
      {isClosedInputs ? (
        <>
          <SearchFieldsPreview search={search} />
          <Button
            className="mt-5 mx-auto"
            onClick={() => setIsClosedInputs(false)}
          >
            <ChevronDown /> Open fields
          </Button>
        </>
      ) : (
        <>
          <SearchInputFields
            inputFields={booksInputFields}
            search={search}
            setSearch={(value) => setSearch(value)}
          />
          <div className="flex flex-row-reverse justify-evenly my-4">
            <Button onClick={() => setSearch(initialSearch)}>
              <Eraser /> <span className="ml-1">Clear fields</span>
            </Button>
            <Button onClick={() => setIsClosedInputs(true)}>
              <ChevronUp /> Hide fields
            </Button>
          </div>
        </>
      )}

      <Button
        className="mt-10 mx-auto border-none bg-blue-500 dark:bg-blue-700 text-white hover:bg-blue-600"
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        Search
      </Button>
      {!isLoading &&
        (books.length ? (
          <BooksList books={books} />
        ) : (
          <p className="mt-10">No books found.</p>
        ))}
    </div>
  );
};

export default SearchBooksList;
