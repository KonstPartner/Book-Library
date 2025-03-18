import CreateBook from '@/components/create/CreateBook';
import StoreProvider from '@/components/StoreProvider';
import React from 'react';

const CreateBookPage = () => {
  return (
    <StoreProvider>
      <CreateBook />
    </StoreProvider>
  );
};

export default CreateBookPage;
