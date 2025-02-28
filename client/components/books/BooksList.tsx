import React from 'react';
import BookCard from './book/BookCard';
import BookType from '@/types/BookType';

const BooksList = ({
  books,
  search,
}: {
  books: BookType[];
  search?: Partial<BookType>;
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-5">
      {books.map((book) => (
        <BookCard key={book.id} book={book} search={search} />
      ))}
    </div>
  );
};

export default BooksList;
