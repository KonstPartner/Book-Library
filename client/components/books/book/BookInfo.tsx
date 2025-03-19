import React, { useState } from 'react';
import Image from 'next/image';
import RatingsPreview from '@/components/ratings/RatingsPreview';
import BookType from '@/types/BookType';
import getBookValues from '@/utils/getBookValues';
import CreateRating from '@/components/create/CreateRating';
import DataOptions from '@/components/dataOptions/DataOptions';
import useAuth from '@/hooks/useAuth';
import AuthModal from '@/components/auth/AuthModal';

const BookInfo = ({ book }: { book: BookType }) => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
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
    userId,
  } = getBookValues(book);

  return (
    <div>
      <div className="max-w-3xl w-full mx-auto p-6 gradient-blur-container">
        <div className="flex flex-col gap-6 mb-7">
          <div className="relative group w-fit mx-auto">
            <Image
              src={image}
              width={200}
              height={300}
              alt={`${title} Image`}
              className="rounded-lg shadow-lg object-cover transition-all duration-300 group-hover:scale-110 group-hover:-rotate-2 relative"
            />
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl gradient-title text-center">
              {title}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Author', value: author },
                { label: 'Publisher', value: publisher },
                { label: 'Published Date', value: publishedDate },
                { label: 'Category', value: category || '-' },
              ].map(({ label, value }) => (
                <div key={label} className="info-item">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {label}:
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="description-block">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-3 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Description:
              </h2>
              <p className="text-gray-800 dark:text-gray-200 text-sm sm:text-base text-justify font-sans line-clamp-6">
                {description}
              </p>
            </div>

            {infoLink && (
              <a
                href={infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="action-button"
              >
                More Info
              </a>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <RatingsPreview
              contextType="book"
              id={id}
              ratingsCount={ratingsCount}
            />
            {(!user || user?.id !== userId) && (
              <CreateRating id={id} setIsAuthModalOpen={setIsAuthModalOpen} />
            )}
          </div>
        </div>
      </div>
      {user && user.id === userId && <DataOptions contextType="book" id={id} />}
      <AuthModal isOpen={isAuthModalOpen} setIsOpen={setIsAuthModalOpen} />
    </div>
  );
};

export default BookInfo;
