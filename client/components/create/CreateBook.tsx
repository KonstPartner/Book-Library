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

const CreateBook = () => {
  const router = useRouter();
  const [book, setBook] = useState<Partial<BookType>>(bookDataFields);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback(
    (field: (typeof bookInputFields)[number]) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBook((prev) => ({ ...prev, [field]: e.target.value }));
      },
    []
  );

  const handleClick = useCallback(async () => {
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

    const data = await fetchData(ALL_BOOKS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filteredData),
    });

    if (data?.data) {
      toast.success('Book successfully added!');
      router.push(`/books/${data.data.id}`);
    } else {
      setIsLoading(false);
    }
  }, [book, router]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-md shadow dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-2xl font-bold mb-4">Create a Book</h1>

      <div className="flex flex-col gap-3">
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
          disabled={isLoading}
          className="mt-4 mx-auto border-none bg-blue-500 dark:bg-blue-700 text-white hover:bg-blue-600"
        >
          Create book
        </Button>
      </div>
    </div>
  );
};

export default CreateBook;
