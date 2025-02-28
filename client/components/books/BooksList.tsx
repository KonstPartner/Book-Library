import React from 'react';
import BookCard from './book/BookCard';
import BookType from '@/types/BookType';
import BooksType from '@/types/BooksType';

const BooksList = ({
  books,
  search,
}: {
  books: BooksType;
  search?: Partial<BookType>;
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-5">
      {books.data.map((book) => (
        <BookCard key={book.id} book={book} search={search} />
      ))}
    </div>
  );
};

export default BooksList;
