import React from 'react';
import DeleteDataOptions from './DeleteDataOption';
import UpdateDataOptions from './UpdateDataOption';

const DataOptions = ({
  id,
  contextType,
}: {
  id: string | number;
  contextType: 'book' | 'rating' | 'user';
}) => {
  return (
    <div className="my-2 flex justify-end gap-3">
      <UpdateDataOptions id={id} contextType={contextType} />
      <DeleteDataOptions id={id} contextType={contextType} />
    </div>
  );
};

export default DataOptions;
