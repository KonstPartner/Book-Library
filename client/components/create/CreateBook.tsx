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
      <div className="w-full max-w-lg mx-auto mt-10 p-6 bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 dark:border-gray-700/20 transition-all duration-300 hover:shadow-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
            className="mt-6 mx-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-purple-600"
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
