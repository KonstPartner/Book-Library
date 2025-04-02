import createSearchQueryString from '@/utils/createSearchQueryString';
import { SearchBookFieldsType } from '@/types/SearchFieldsType';
import { SortOptionsType } from '@/types/SortOptionsType';
import { searchPageCardsLimit } from '@/constants/cardsLimit';
import getSearchQueries from '@/utils/getSearchQueries';

jest.mock('@/utils/getSearchQueries', () => jest.fn());

describe('createSearchQueryString', () => {
  beforeEach(() => {
    (getSearchQueries as jest.Mock).mockClear();
  });

  it('should create correct query string with valid search fields and sort options', () => {
    const search: SearchBookFieldsType = {
      title: { field: 'Book Title', isExact: true },
      description: { field: 'A description', isExact: false },
      author: { field: 'Author Name', isExact: false },
      publishedDate: { field: '2023-01-01', isExact: true },
      publisher: { field: 'Publisher Name', isExact: false },
      category: { field: 'Fiction', isExact: false },
    };

    const sortOptions: SortOptionsType = {
      sortBy: 'title',
      sortOrder: 'ASC',
    };

    const fields: Array<keyof SearchBookFieldsType> = [
      'title',
      'author',
      'publisher',
    ];

    (getSearchQueries as jest.Mock).mockReturnValue({
      searchFields: {
        title: 'Book Title',
        description: 'A description',
        author: 'Author Name',
        publishedDate: '2023-01-01',
        publisher: 'Publisher Name',
        category: 'Fiction',
      },
      searchExactFields: 'title,publishedDate',
    });

    const result = createSearchQueryString(search, sortOptions, fields);

    const expected = `title=Book+Title&author=Author+Name&publisher=Publisher+Name&sortBy=title&sortOrder=ASC&exact=title%2CpublishedDate&limit=${searchPageCardsLimit}`;

    expect(result).toBe(expected);
  });

  it('should create query string when no sort options are provided', () => {
    const search: SearchBookFieldsType = {
      title: { field: 'Book Title', isExact: true },
      description: { field: 'A description', isExact: false },
      author: { field: 'Author Name', isExact: false },
      publishedDate: { field: '2023-01-01', isExact: true },
      publisher: { field: 'Publisher Name', isExact: false },
      category: { field: 'Fiction', isExact: false },
    };

    const sortOptions: SortOptionsType = {
      sortBy: '',
      sortOrder: 'ASC',
    };

    const fields: Array<keyof SearchBookFieldsType> = [
      'title',
      'author',
      'publisher',
    ];

    (getSearchQueries as jest.Mock).mockReturnValue({
      searchFields: {
        title: 'Book Title',
        description: 'A description',
        author: 'Author Name',
        publishedDate: '2023-01-01',
        publisher: 'Publisher Name',
        category: 'Fiction',
      },
      searchExactFields: 'title,publishedDate',
    });

    const result = createSearchQueryString(search, sortOptions, fields);

    const expected = `title=Book+Title&author=Author+Name&publisher=Publisher+Name&sortOrder=ASC&exact=title%2CpublishedDate&limit=${searchPageCardsLimit}`;

    expect(result).toBe(expected);
  });

  it('should handle empty search fields correctly', () => {
    const search: SearchBookFieldsType = {
      title: { field: '', isExact: false },
      description: { field: '', isExact: false },
      author: { field: '', isExact: false },
      publishedDate: { field: '', isExact: false },
      publisher: { field: '', isExact: false },
      category: { field: '', isExact: false },
    };

    const sortOptions: SortOptionsType = {
      sortBy: 'title',
      sortOrder: 'ASC',
    };

    const fields: Array<keyof SearchBookFieldsType> = [
      'title',
      'author',
      'publisher',
    ];

    (getSearchQueries as jest.Mock).mockReturnValue({
      searchFields: {
        title: '',
        description: '',
        author: '',
        publishedDate: '',
        publisher: '',
        category: '',
      },
      searchExactFields: '',
    });

    const result = createSearchQueryString(search, sortOptions, fields);

    const expected = `sortBy=title&sortOrder=ASC&limit=${searchPageCardsLimit}`;

    expect(result).toBe(expected);
  });

  it('should append correct exact fields to the query string', () => {
    const search: SearchBookFieldsType = {
      title: { field: 'Book Title', isExact: true },
      description: { field: 'A description', isExact: false },
      author: { field: 'Author Name', isExact: true },
      publishedDate: { field: '2023-01-01', isExact: false },
      publisher: { field: 'Publisher Name', isExact: true },
      category: { field: 'Fiction', isExact: false },
    };

    const sortOptions: SortOptionsType = {
      sortBy: 'title',
      sortOrder: 'DESC',
    };

    const fields: Array<keyof SearchBookFieldsType> = [
      'title',
      'author',
      'publisher',
    ];

    (getSearchQueries as jest.Mock).mockReturnValue({
      searchFields: {
        title: 'Book Title',
        description: 'A description',
        author: 'Author Name',
        publishedDate: '2023-01-01',
        publisher: 'Publisher Name',
        category: 'Fiction',
      },
      searchExactFields: 'title,author,publisher',
    });

    const result = createSearchQueryString(search, sortOptions, fields);

    const expected = `title=Book+Title&author=Author+Name&publisher=Publisher+Name&sortBy=title&sortOrder=DESC&exact=title%2Cauthor%2Cpublisher&limit=${searchPageCardsLimit}`;

    expect(result).toBe(expected);
  });
});
