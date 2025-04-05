import React from 'react';
import DeleteDataOptions from './DeleteDataOption';
import UpdateDataOptions from './UpdateDataOption';
import ContextType from '@/types/ContextType';

const DataOptions = ({
  id,
  contextType,
}: {
  id: string | number;
  contextType: ContextType;
}) => {
  return (
    <div className="my-2 flex justify-end gap-3 dark:text-gray-300">
      <UpdateDataOptions id={id} contextType={contextType} />
      <DeleteDataOptions id={id} contextType={contextType} />
    </div>
  );
};

export default DataOptions;
