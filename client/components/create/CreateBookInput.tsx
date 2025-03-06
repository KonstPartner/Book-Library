import React, { ChangeEvent } from 'react';
import Input from '@/components/Input';
import { bookInputFields } from '@/constants/createFields';
import getPrettyField from '@/utils/getPrettyField';

const CreateBookInput = ({
  field,
  value,
  onChange,
}: {
  field: (typeof bookInputFields)[number];
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) => {
  const baseInputStyles =
    'w-full p-3 bg-white/50 dark:bg-gray-900/50 border border-gray-300/50 dark:border-gray-600/50 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500';

  if (field === 'description') {
    return (
      <textarea
        className={`${baseInputStyles} h-32 resize-y`}
        placeholder={getPrettyField(field)}
        maxLength={500}
        value={value}
        onChange={onChange}
      />
    );
  }

  if (field === 'image') {
    return (
      <div className="flex flex-col gap-2">
        <a
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
          href="https://search.worldcat.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          You can find image link here
        </a>
        <Input
          className={baseInputStyles}
          value={value}
          onChange={onChange}
          placeholder={getPrettyField(field)}
        />
      </div>
    );
  }

  return (
    <Input
      className={baseInputStyles}
      value={value}
      onChange={onChange}
      placeholder={getPrettyField(field)}
    />
  );
};

export default CreateBookInput;