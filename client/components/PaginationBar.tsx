import React from 'react';
import MetadataType from '@/types/MetadataType';
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
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
        page === currentPage
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
          : 'bg-white/20 hover:bg-white/30 text-gray-800 dark:text-gray-200'
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
    <div className="flex justify-center gap-2 my-4 bg-white/10 backdrop-blur-lg p-3 rounded-lg border border-white/20">
      {currentPage > 1 && (
        <Button
          className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg transition-all duration-300"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </Button>
      )}
      <div className="hidden sm:flex flex-wrap gap-1 justify-evenly">
        {pageNumbers.map((page) => (
          <CurrentPageBtn
            key={page}
            page={page}
            currentPage={currentPage}
            onClick={onPageChange}
          />
        ))}
      </div>
      {currentPage < totalPages && (
        <Button
          className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg transition-all duration-300"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default PaginationBar;
