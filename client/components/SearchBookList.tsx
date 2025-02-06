'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Eraser } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import Input from './Input';
import Button from './Button';
import BookType from '@/types/BookType';
import BooksList from './BooksList';
import fetchData from '@/utils/fetchData';
import createSearchQueryString from '@/utils/createSearchQueryString';
import { SearchBooksFieldsType } from '@/types/SearchFields';
import { booksInputFields } from '@/constants/searchFields';
import { ALL_BOOKS_URL } from '@/constants/apiSources';
import { validateBooksSearch } from '@/utils/validateSearch';

const initialSearch = {
  title: '',
  description: '',
  author: '',
  publishedDate: '',
  publisher: '',
  category: '',
};

const SearchBookList = () => {
  const [search, setSearch] = useState<SearchBooksFieldsType>(initialSearch);
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState<BookType[] | []>([]);
  const [isClosedInputs, setIsClosedInputs] = useState(false);

  useEffect(() => {
    fetchSearchedBooks(`${ALL_BOOKS_URL}?limit=10`);
  }, []);

  const fetchSearchedBooks = async (url: string) => {
    setIsLoading(true);
    const data = await fetchData(url);
    setBooks(data.data);
    setIsLoading(false);
  };

  const handleButtonClick = async () => {
    if (!validateBooksSearch(search)) {
      return;
    }
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
          {(Object.keys(search) as Array<keyof SearchBooksFieldsType>).some(
            (key) => search[key].trim()
          ) && (
            <div className="border-2 text-left p-5 m-auto mb-5">
              {(Object.keys(search) as Array<keyof SearchBooksFieldsType>).map(
                (key, index) =>
                  search[key].trim() ? (
                    <p key={index} className="text-gray-500 font-semibold">
                      {key}: {search[key]}
                    </p>
                  ) : (
                    ''
                  )
              )}
            </div>
          )}

          <Button
            className="px-4 py-1 mb-5 text-lg"
            onClick={() => setIsClosedInputs(false)}
          >
            <ChevronDown /> Open fields
          </Button>
        </>
      ) : (
        <>
          <div className="my-3">
            {booksInputFields.map((field) => (
              <Input
                key={field}
                className="mx-1 my-3 py-2 px-2 w-full"
                value={search[field]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearch((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                  }))
                }
                placeholder={`Enter ${field}`}
              />
            ))}
          </div>
          <div className='flex flex-row-reverse'>
            <Button
              className="px-4 py-1 rounded-lg text-lg"
              onClick={() => setSearch(initialSearch)}
            >
              <Eraser /> Clear fields
            </Button>
            <Button
              className="px-4 py-1 my-5 text-lg"
              onClick={() => setIsClosedInputs(true)}
            >
              <ChevronUp /> Hide fields
            </Button>
          </div>
        </>
      )}

      <Button
        className="py-5 px-16 text-2xl"
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
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default SearchBookList;
