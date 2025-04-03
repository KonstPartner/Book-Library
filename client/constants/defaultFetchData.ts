import { searchPageCardsLimit } from './cardsLimit';

const defaultFetchData = {
  data: [],
  metadata: {
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    perPage: searchPageCardsLimit,
  },
};

export default defaultFetchData;
