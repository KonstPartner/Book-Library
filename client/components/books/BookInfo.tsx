import BookType from '@/types/BookType';
import getBookValues from '@/utils/getBookValues';
import Image from 'next/image';
import React from 'react';

const BookInfo = ({ book }: { book: BookType }) => {
  const {
    title,
    author,
    description,
    image,
    infoLink,
    publishedDate,
    publisher,
    category,
  } = getBookValues(book);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={image}
          width={160}
          height={200}
          alt={`${title} Image`}
          className="w-48 h-auto rounded-md shadow-md"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

          <p className="text-gray-700">
            <span className="font-semibold">Author:</span> {author}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Publisher:</span> {publisher}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Published Date:</span>{' '}
            {publishedDate}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Category:</span> {category || '-'}
          </p>
          <div className="bg-gray-100 py-4 px-2 rounded-md">
            <h2 className="text-gray-500 text-2xl mb-2">Description:</h2>
            <p className="text-gray-600">{description}</p>
          </div>

          {infoLink && (
            <a
              href={infoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              More info
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
