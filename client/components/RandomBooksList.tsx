'use client';

import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import BookType from '@/types/BookType';

const RANDOM_BOOKS_URL = 'http://localhost:3000/books/random';

const RandomBooksList = () => {
  const [books, setBooks] = useState<BookType[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRandomBooks();
  }, []);

  const fetchRandomBooks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(RANDOM_BOOKS_URL);
      const data = await res.json();
      if (data) {
        setBooks(data.data);
      }
    } catch (error) {
      console.log(error instanceof Error ? error.message : error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl mx-autotext-2xl font-bold text-center my-4 w-full">
        Random Books
      </h1>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-auto-fit gap-4 p-5">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RandomBooksList;
