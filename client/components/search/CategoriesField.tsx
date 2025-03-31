'use client';

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import { GET_ALL_CATEGORIES } from '@/constants/apiSources';
import fetchData from '@/utils/fetchData';
import Spinner from '@/components/Spinner';
import { SearchBookFieldsType } from '@/types/SearchFieldsType';
import Category from '@/types/CategoryType';
import Input from '@/components/Input';
import Button from '@/components/Button';
import fetchDataWrapper from '@/utils/fetchDataWrapper';

const CategoriesField = ({
  search,
  setSearch,
}: {
  setSearch: (value: SearchBookFieldsType) => void;
  search: SearchBookFieldsType;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fetchCategories = async (
    newOffset: number,
    append = false,
    query = ''
  ) => {
    await fetchDataWrapper(async () => {
      const response = await fetchData(
        `${GET_ALL_CATEGORIES}?offset=${newOffset}&name=${encodeURIComponent(
          query
        )}`
      );
      if (response?.success) {
        const newCategories = response.data;
        setCategories((prev) =>
          append ? [...prev, ...newCategories] : newCategories
        );
      }
    }, setIsLoading);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      fetchCategories(0);
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (category: Category) => {
    setSearch({
      ...search,
      category: { field: category.name, isExact: true },
    });
    setIsDropdownOpen(false);
  };

  const handleLoadMore = () => {
    const newOffset = offset + 25;
    setOffset(newOffset);
    fetchCategories(newOffset, true, searchQuery);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch({
      ...search,
      category: { field: e.target.value, isExact: false },
    });
    setSearchQuery(e.target.value);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="relative flex flex-wrap items-center">
        <Input
          type="text"
          value={search.category.field || ''}
          onChange={handleInputChange}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder="Select a category"
          className="w-full p-3 pr-12 text-sm rounded-md shadow-sm overflow-x-auto whitespace-nowrap scrollbar-hide"
        />
        {search.category.field && isDropdownOpen && (
          <Button
            onClick={() => {
              setOffset(0);
              fetchCategories(0, false, searchQuery);
            }}
            className="absolute right-0 p-3 text-indigo-500 bg-violet-300/50 dark:text-indigo-300 dark:bg-violet-600/50 hover:text-indigo-600 focus:outline-none"
          >
            <Search className="w-4 h-4" />
          </Button>
        )}
      </div>

      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-1 rounded-md bg-gray-50 dark:bg-gray-800 shadow-lg max-h-60 overflow-y-auto overscroll-contain">
          {isLoading && !categories.length ? (
            <div className="p-4 flex justify-center">
              <Spinner className="w-6 h-6 text-indigo-500" />
            </div>
          ) : categories.length > 0 ? (
            <>
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className="p-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/50 cursor-pointer"
                >
                  {category.name}
                </div>
              ))}
              <Button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="flex justify-center w-full p-2 text-sm text-center text-indigo-500 dark:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/50 disabled:opacity-50"
              >
                More
              </Button>
            </>
          ) : (
            <div className="p-2 text-sm text-gray-500 dark:text-gray-400">
              No categories found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoriesField;
