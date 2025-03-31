import { ChevronDown } from 'lucide-react';
import React from 'react';
import Button from '../Button';
import SearchFieldsPreview from './SearchFieldsPreview';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
  SearchFieldType,
} from '@/types/SearchFieldsType';

interface CompactSearchProps<
  T extends Record<keyof T, SearchFieldType> &
    (SearchBookFieldsType | SearchRatingFieldsType)
> {
  search: T;
  isLoading: boolean;
  setIsClosedInputs: (value: boolean) => void;
  handleSearch: () => void;
}

const CompactSearch = <
  T extends Record<keyof T, SearchFieldType> &
    (SearchBookFieldsType | SearchRatingFieldsType)
>({
  search,
  handleSearch,
  isLoading,
  setIsClosedInputs,
}: CompactSearchProps<T>) => {
  return (
    <div className="search-preview-container sm:p-6">
      <SearchFieldsPreview search={search} />
      <div className="flex justify-center items-center gap-4">
        <Button
          className="submit-button px-6 font-medium shadow-md"
          onClick={handleSearch}
          disabled={isLoading}
        >
          Search
        </Button>
        <div className="relative group">
          <Button
            className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg shadow-md transition-all duration-300"
            onClick={() => setIsClosedInputs(false)}
          >
            <ChevronDown className="w-5 h-5" />
          </Button>
          <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform -translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap">
            Open fields
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompactSearch;
