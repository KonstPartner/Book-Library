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
  if (field === 'description') {
    return (
      <textarea
        className="form-textarea"
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
          className="form-input"
          value={value}
          onChange={onChange}
          placeholder={getPrettyField(field)}
        />
      </div>
    );
  }

  return (
    <Input
      className="form-input"
      value={value}
      onChange={onChange}
      placeholder={getPrettyField(field)}
    />
  );
};

export default CreateBookInput;
