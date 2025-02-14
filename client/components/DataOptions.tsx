import React from 'react';
import DeleteDataOptions from './DeleteDataOption';

const DataOptions = ({
  id,
  contextType,
}: {
  id: string | number;
  contextType: 'book' | 'rating' | 'user';
}) => {
  return (
    <div className="my-2 flex justify-end">
      <DeleteDataOptions id={id} contextType={contextType} />
    </div>
  );
};

export default DataOptions;
