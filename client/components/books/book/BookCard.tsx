import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BookType from '@/types/BookType';
import getBookValues from '@/utils/getBookValues';
import HighlightText from '@/components/HighlightText';
import RippleEffect from '@/components/RippleEffect';
import { SearchBookFieldsType } from '@/types/SearchFieldsType';

const BookCard = ({
  book,
  search,
}: {
  book: BookType;
  search?: SearchBookFieldsType;
}) => {
  const { id, title, author, image, publishedDate, category } =
    getBookValues(book);

  return (
    <RippleEffect image={image}>
      <Link href={`/books/${id}`}>
        <div className="relative z-10 flex flex-col items-center text-center p-4 h-full justify-between">
          <div className="relative group w-[160px] h-[200px] overflow-hidden">
            <Image
              src={image}
              alt={`${title} Image`}
              fill
              priority
              sizes="160px"
              className="rounded-md object-cover transition-all duration-300 group-hover:scale-105 group-hover:-rotate-1"
            />
          </div>

          <div className="mt-3 flex flex-col gap-2 text-white">
            <h2 className="text-lg font-semibold line-clamp-2">
              {search?.title.isExact ? (
                title
              ) : (
                <HighlightText text={title} searchText={search?.title.field} />
              )}
            </h2>
            <p className="text-sm opacity-90 min-h-[20px]">
              By:{' '}
              {search?.author.isExact ? (
                author
              ) : (
                <HighlightText
                  text={author}
                  searchText={search?.author.field}
                />
              )}
            </p>
            <p className="text-sm opacity-80 min-h-[20px]">
              Published: {publishedDate}
            </p>
            {category && (
              <p className="text-orange-400 bg-gray-800/70 rounded-md px-2 py-1 text-xs font-medium mx-auto">
                {search?.category.isExact ? (
                  category
                ) : (
                  <HighlightText
                    text={category}
                    searchText={search?.category.field}
                  />
                )}
              </p>
            )}
          </div>
        </div>
      </Link>
    </RippleEffect>
  );
};

export default BookCard;
