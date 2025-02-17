import React, { ChangeEvent } from 'react';
import Input from '@/components/Input';
import { bookInputFields } from '@/constants/createFields';

const CreateBookInput = ({
  field,
  value,
  onChange,
}: {
  field: (typeof bookInputFields)[number];
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) => {
  if (field === 'description') {
    return (
      <textarea
        className="p-2 my-2 border rounded-sm dark:bg-transparent dark:border-gray-400"
        placeholder="Description"
        maxLength={500}
        value={value}
        onChange={onChange}
      />
    );
  }

  if (field === 'image') {
    return (
      <>
        <a
          className="p-1 pb-0 rounded-sm text-blue-600 dark:text-blue-400  hover:underline"
          href="https://search.worldcat.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          You can find image link here
        </a>
        <Input
          className="p-2 mb-2 dark:border-gray-400 rounded-sm"
          value={value}
          onChange={onChange}
          placeholder={field}
        />
      </>
    );
  }

  return (
    <Input
      className="p-2 my-2 dark:border-gray-400 rounded-sm"
      value={value}
      onChange={onChange}
      placeholder={field}
    />
  );
};

export default CreateBookInput;
