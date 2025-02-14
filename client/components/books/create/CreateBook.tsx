'use client';

import React, { ChangeEvent, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import fetchData from '@/utils/fetchData';
import { toast } from 'react-toastify';
import { ALL_BOOKS_URL } from '@/constants/apiSources';
import BookType from '@/types/BookType';
import CreateBookInput from './CreateBookInput';
import { bookInputFields } from '@/constants/createFields';

const VALID_IMAGE_DOMAINS = ['books.google.com', 'coverart.oclc.org'] as const;

const isValidBook = async (book: BookType) => {
  const trimmedBook = Object.fromEntries(
    Object.entries(book).map(([key, value]) => [
      key,
      typeof value === 'string' ? value.trim() : value,
    ])
  ) as BookType;

  if (!trimmedBook.title) {
    toast.warn('Title is required!');
    return false;
  }

  if (
    Object.values(trimmedBook).some(
      (value) => value && (value as string).length < 2
    )
  ) {
    toast.warn('Fields must be at least 2 chars long');
    return false;
  }

  if (
    trimmedBook.publishedDate &&
    !/^\d{4}(-\d{2})?(-\d{2})?$/.test(trimmedBook.publishedDate)
  ) {
    toast.warn('Published Date must be in format YYYY, YYYY-MM, or YYYY-MM-DD');
    return false;
  }

  if (trimmedBook.image && !VALID_IMAGE_DOMAINS.some(domain => (trimmedBook.image as string).startsWith(`https://${domain}`))) {
    toast.warn('Image URL is invalid. Valid domains: coverart.oclc.org and books.google.com');
    return false;
  }

  if (trimmedBook.infoLink && !trimmedBook.infoLink.startsWith('https://')) {
    toast.warn('Info Link URL is invalid');
    return false;
  }

  return true;
};

const CreateBook = () => {
  const router = useRouter();
  const [book, setBook] = useState<BookType>({
    title: '',
    description: '',
    author: '',
    image: '',
    publisher: '',
    publishedDate: '',
    infoLink: '',
    category: '',
  });
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

    if (!(await isValidBook(book))) {
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
            value={book[field] as any}
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
