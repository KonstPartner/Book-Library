'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import Input from './Input';
import Button from './Button';
import BookType from '@/types/BookType';
import BooksList from './BooksList';
import fetchData from '@/utils/fetchData';
import createSearchQueryString from '@/utils/createSearchQueryString';
import { SearchBooksFieldsType } from '@/types/SearchFields';
import { booksInputFields } from '@/constants/searchFields';
import { ALL_BOOKS_URL } from '@/constants/apiSources';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SearchBookList = () => {
  const [search, setSearch] = useState<SearchBooksFieldsType>({
    title: '',
    description: '',
    author: '',
    publishedDate: '',
    publisher: '',
    category: '',
  });
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
          <div className="border-2 text-left p-5 m-auto">
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
          <Button
            className="px-3 py-1 my-5"
            onClick={() => setIsClosedInputs(false)}
          >
            <ChevronDown />
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
          <Button
            className="px-3 py-1 mb-5"
            onClick={() => setIsClosedInputs(true)}
          >
            <ChevronUp />
          </Button>
        </>
      )}

      <Button onClick={handleButtonClick} disabled={isLoading}>
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

export default SearchBookList;
