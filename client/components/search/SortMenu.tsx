import React, { ChangeEvent } from 'react';
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react';
import Button from '@/components/Button';
import getPrettyField from '@/utils/getPrettyField';
import { SortOptionsType } from '@/types/SortOptionsType';

const SortMenu = ({
  sortOptions,
  setSortOptions,
  sortByOptions,
}: {
  sortOptions: SortOptionsType;
  setSortOptions: (options: SortOptionsType) => void;
  sortByOptions: string[];
}) => {
  const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOptions({ ...sortOptions, sortBy: e.target.value });
  };

  const toggleSortOrder = () => {
    const newOrder = sortOptions.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    setSortOptions({ ...sortOptions, sortOrder: newOrder });
  };

  return (
    <div className="relative w-fit">
      <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 border border-white/20 rounded-xl shadow-md p-2.5 transition-all duration-300">
        <div className="flex items-center gap-2">
          <p className="text-white text-sm md:text-base font-medium">Sort:</p>
          <select
            value={sortOptions.sortBy}
            onChange={handleSortByChange}
            className="bg-transparent text-white w-fit font-medium border-none focus:outline-none focus:ring-2 focus:ring-white/30 rounded-md cursor-pointer py-1 px-2 transition-all duration-300 hover:bg-white/10 text-sm md:text-base"
          >
            {sortByOptions.map((option) => (
              <option
                key={option}
                value={option}
                className="bg-purple-700 text-white text-sm md:text-base"
              >
                {getPrettyField(option)}
              </option>
            ))}
          </select>
        </div>
        <div className="relative group">
          <Button
            onClick={toggleSortOrder}
            className="p-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-md transition-all duration-300 flex items-center justify-center w-8 h-8 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-500 disabled:hover:to-purple-500"
            disabled={!sortOptions.sortBy}
            noLoadingText
          >
            {sortOptions.sortOrder === 'DESC' ? (
              <ArrowUpWideNarrow className="w-4 h-4" />
            ) : (
              <ArrowDownWideNarrow className="w-4 h-4" />
            )}
          </Button>
          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out pointer-events-none whitespace-nowrap">
            {sortOptions.sortOrder === 'DESC' ? 'Descending' : 'Ascending'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SortMenu;
