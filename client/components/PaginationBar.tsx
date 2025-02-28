import BooksMetadata from '@/types/BooksMetadata';
import React from 'react';

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
    <button
      className={`px-3 py-1 rounded ${
        page === currentPage
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 hover:bg-gray-300'
      }`}
      onClick={() => onClick(page)}
    >
      {page}
    </button>
  );
};

const PaginationBar = ({
  metadata,
  onPageChange,
}: {
  metadata: BooksMetadata;
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

  if (totalPages <= 1 || totalPages < currentPage)
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
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>
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
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default PaginationBar;
