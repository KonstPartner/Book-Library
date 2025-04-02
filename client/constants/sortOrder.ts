import { SortOptionsType } from '@/types/SortOptionsType';

const defaultBooksOrder: SortOptionsType = {
  sortBy: 'title',
  sortOrder: 'ASC',
};

const defaultRatingsOrder: SortOptionsType = {
  sortBy: 'reviewScore',
  sortOrder: 'ASC',
};

export { defaultBooksOrder, defaultRatingsOrder };
