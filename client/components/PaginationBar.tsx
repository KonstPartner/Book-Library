import MetadataType from '@/types/MetadataType';
import React from 'react';
import Button from './Button';

const CurrentPageBtn = ({
  page,
  currentPage,
  onClick,
}: {
  page: number;
  currentPage: number;
  onClick: (page: number) => void;
}) => {
  return (
    <Button
      className={`px-3 py-1 rounded border-none ${
        page === currentPage
          ? 'bg-purple-600 text-white'
          : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 hover:dark:bg-gray-600'
      }`}
      onClick={() => onClick(page)}
      disabled={page === currentPage}
      noLoadingText
    >
      {page}
    </Button>
  );
};

const PaginationBar = ({
  metadata,
  onPageChange,
}: {
  metadata: MetadataType;
  onPageChange: (page: number) => void;
}) => {
  const { totalPages, currentPage } = metadata;

  const getPageNumbers = () => {
    const pages = [];
    const maxButtons = 5;

    pages.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (totalPages <= maxButtons) {
      startPage = 2;
      endPage = totalPages - 1;
    } else {
      if (endPage - startPage < 2) {
        if (currentPage < totalPages / 2) {
          endPage = startPage + 2;
        } else {
          startPage = endPage - 2;
        }
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (totalPages > 1 && pages[pages.length - 1] !== totalPages) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1 || totalPages < currentPage || currentPage < 1)
    return (
      <CurrentPageBtn
        page={1}
        currentPage={currentPage}
        onClick={onPageChange}
      />
    );

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center gap-2 my-4">
      {currentPage > 1 && (
        <Button
          className="px-3 py-1 rounded border-none bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 hover:dark:bg-gray-600"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </Button>
      )}

      {pageNumbers.map((page) => (
        <CurrentPageBtn
          key={page}
          page={page}
          currentPage={currentPage}
          onClick={onPageChange}
        />
      ))}

      {currentPage < totalPages && (
        <Button
          className="px-3 py-1 rounded border-none bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 hover:dark:bg-gray-600"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default PaginationBar;
