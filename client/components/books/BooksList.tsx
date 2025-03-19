import React from 'react';
import BookCard from './book/BookCard';
import BookType from '@/types/BookType';
import { SearchBookFieldsType } from '@/types/SearchFieldsType';

const BooksList = ({
  books,
  search,
}: {
  books: BookType[];
  search?: SearchBookFieldsType;
}) => {
  return (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2
        lg:grid-cols-4
        gap-4 
        p-5 
        max-h-[calc(5*minmax(0,1fr))] 
        overflow-y-auto
        w-[70%]
        sm:w-[85%]
        md:w-[70%]
        lg:w-[80%]
        mx-auto
      "
    >
      {books.map((book) => (
        <BookCard key={book.id} book={book} search={search} />
      ))}
    </div>
  );
};

export default BooksList;
