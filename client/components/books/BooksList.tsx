import React from 'react';
import BookCard from './BookCard';
import BookType from '@/types/BookType';

const BooksList = ({books}: {books: BookType[]}) => {
  return (
    <div className="grid grid-cols-auto-fit gap-4 p-5">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BooksList;
