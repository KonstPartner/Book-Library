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
import { searchCategoriesLimit } from '@/constants/cardsLimit';

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
  const [lastSearchQuery, setLastSearchQuery] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fetchCategories = async (
    newOffset: number,
    append = false,
    query = ''
  ) => {
    await fetchDataWrapper(async () => {
      const response = await fetchData(
        `${GET_ALL_CATEGORIES}?offset=${newOffset}&limit=${searchCategoriesLimit}&name=${encodeURIComponent(
          query
        )}`
      );
      if (response?.success) {
        const newCategories = response.data;
        setCategories((prev) =>
          append ? [...prev, ...newCategories] : newCategories
        );

        setHasMore(newCategories.length === searchCategoriesLimit && newCategories.length > 0);
      }
    }, setIsLoading);
  };

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

  useEffect(() => {
    fetchCategories(0);
  }, []);

  const handleCategorySelect = (category: Category) => {
    setSearch({
      ...search,
      category: { field: category.name, isExact: true },
    });
    setIsDropdownOpen(false);
  };

  const handleLoadMore = () => {
    const newOffset = offset + searchCategoriesLimit;
    setOffset(newOffset);
    fetchCategories(newOffset, true, lastSearchQuery || '');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch({
      ...search,
      category: { field: newValue, isExact: false },
    });
  };

  const handleSearchClick = () => {
    if (search.category.field === lastSearchQuery) {
      return;
    }

    setOffset(0);
    fetchCategories(0, false, search.category.field);
    setLastSearchQuery(search.category.field);
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
        {isDropdownOpen && (
          <Button
            onClick={handleSearchClick}
            className="absolute right-0 p-3 text-indigo-500 bg-violet-300/50 dark:text-indigo-300 dark:bg-violet-600/50 hover:text-indigo-600 focus:outline-none"
            disabled={search.category.field === lastSearchQuery}
            noLoadingText
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
              {hasMore && (
                <Button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="flex justify-center w-full p-2 text-sm text-center text-indigo-500 dark:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/50 disabled:opacity-50"
                >
                  More
                </Button>
              )}
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
