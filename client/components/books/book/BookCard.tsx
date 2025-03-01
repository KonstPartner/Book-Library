import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BookType from '@/types/BookType';
import getBookValues from '@/utils/getBookValues';
import HighlightText from '@/types/HighlightText';
import RippleEffect from '@/components/RippleEffect';
import '@/globals.css';

const BookCard = ({
  book,
  search,
}: {
  book: BookType;
  search?: Partial<BookType>;
}) => {
  const { id, title, author, image, publishedDate, category } =
    getBookValues(book);

  return (
    <RippleEffect image={image}>
      <Link href={`/books/${id}`}>
        <div className="relative z-10 flex flex-col items-center text-center p-4 h-full justify-between">
          <div className="w-[160px] h-[200px] flex justify-center items-center overflow-hidden">
            <Image
              src={image}
              width={160}
              height={200}
              alt={`${title} Image`}
              className="rounded-md object-cover"
            />
          </div>

          <div className="mt-3 flex flex-col gap-2 text-white">
            <h2 className="text-lg font-semibold line-clamp-2">
              <HighlightText
                text={title}
                searchText={search?.title}
                highlightClass="bg-yellow-300 dark:bg-yellow-500"
              />
            </h2>
            <p className="text-sm opacity-90 min-h-[20px]">
              By:{' '}
              <HighlightText
                text={author}
                searchText={search?.author}
                highlightClass="bg-yellow-300 dark:bg-yellow-500"
              />
            </p>
            <p className="text-sm opacity-80 min-h-[20px]">
              Published: {publishedDate}
            </p>
            {category && (
              <p className="text-orange-400 bg-gray-800/70 rounded-md px-2 py-1 text-xs font-medium mx-auto">
                <HighlightText
                  text={category}
                  searchText={search?.category}
                  highlightClass="bg-yellow-300 dark:bg-yellow-500"
                />
              </p>
            )}
          </div>
        </div>
      </Link>
    </RippleEffect>
  );
};

export default BookCard;
