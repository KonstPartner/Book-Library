'use client';

import React, { ChangeEvent, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Button from '@/components/Button';
import fetchData from '@/utils/fetchData';
import { ALL_BOOKS_URL } from '@/constants/apiSources';
import BookType from '@/types/BookType';
import CreateBookInput from './CreateBookInput';
import { bookDataFields, bookInputFields } from '@/constants/createFields';
import isValidData from '@/utils/isValidData';
import fetchDataWrapper from '@/utils/fetchDataWrapper';
import useAuth from '@/hooks/useAuth';
import AuthModal from '@/components/auth/AuthModal';

const CreateBook = () => {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading, accessToken } = useAuth();
  const [book, setBook] = useState<Partial<BookType>>(bookDataFields);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleChange = useCallback(
    (field: (typeof bookInputFields)[number]) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBook((prev) => ({ ...prev, [field]: e.target.value }));
      },
    []
  );

  const handleClick = useCallback(async () => {
    if (authLoading) return;
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    setIsLoading(true);

    if (!isValidData('book', book as BookType)) {
      setIsLoading(false);
      return;
    }

    const filteredData = Object.fromEntries(
      Object.entries(book).filter(
        ([, value]) => (value as string).trim() !== ''
      )
    );

    fetchDataWrapper(async () => {
      const data = await fetchData(ALL_BOOKS_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredData),
      });

      if (data?.data) {
        toast.success('Book successfully added!');
        router.push(`/books/${data.data.id}`);
      }
    }, setIsLoading);
  }, [book, router, isAuthenticated, authLoading, accessToken]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 flex items-center justify-center p-4">
      <div className="md:w-[90%] lg:w-[70%] mt-10 form-container">
        <h1 className="text-3xl gradient-title text-center mb-6">
          Create a Book
        </h1>

        <div className="flex flex-col gap-4">
          {bookInputFields.map((field) => (
            <CreateBookInput
              key={field}
              field={field}
              value={book[field as keyof BookType] as string}
              onChange={handleChange(field)}
            />
          ))}

          <Button
            onClick={handleClick}
            disabled={isLoading || authLoading}
            className="submit-button"
          >
            Create Book
          </Button>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} setIsOpen={setIsAuthModalOpen} />
    </div>
  );
};

export default CreateBook;
