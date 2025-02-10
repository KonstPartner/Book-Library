import BookType from '@/types/BookType';
import getBookValues from '@/utils/getBookValues';
import Image from 'next/image';
import React from 'react';
import BookRatings from './BookRatings';

const BookInfo = ({ book }: { book: BookType }) => {
  const {
    id,
    title,
    author,
    description,
    image,
    infoLink,
    publishedDate,
    publisher,
    category,
    ratingsCount,
  } = getBookValues(book);

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-lg rounded-lg dark:bg-zinc-800">
      <div className="flex flex-col gap-6">
        <Image
          src={image}
          width={200}
          height={200}
          alt={`${title} Image`}
          className="rounded-md shadow-md m-auto"
        />
        <div className="flex flex-col gap-4 p-2 rounded-md">
          <h1 className="text-2xl font-bold text-center dark:text-gray-300">
            {title}
          </h1>

          <p className="flex justify-between px-2 rounded-md text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-600 py-1">
            <span className="font-semibold">Author:</span> {author}
          </p>

          <p className="flex justify-between px-2 rounded-md text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-600 py-1">
            <span className="font-semibold">Publisher:</span> {publisher}
          </p>

          <p className="flex justify-between px-2 rounded-md text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-600 py-1">
            <span className="font-semibold">Published Date:</span>{' '}
            {publishedDate}
          </p>

          <p className="flex justify-between px-2 rounded-md text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-600 py-1">
            <span className="font-semibold">Category:</span> {category || '-'}
          </p>

          <div className="bg-gray-200 dark:bg-gray-600 py-4 px-2 rounded-md">
            <h2 className="text-gray-600 dark:text-gray-300 text-2xl mb-2">
              Description:
            </h2>
            <p className="mx-3 text-justify text-gray-800 dark:text-gray-200 font-sans">
              {description}
            </p>
          </div>

          {infoLink && (
            <a
              href={infoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-center w-fit m-auto p-1 rounded-sm text-blue-600 dark:text-gray-200 dark:bg-blue-500 hover:underline"
            >
              More info
            </a>
          )}
        </div>
        <BookRatings id={id} ratingsCount={ratingsCount} />
      </div>
    </div>
  );
};

export default BookInfo;
