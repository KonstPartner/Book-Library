import getSearchQueries from '@/utils/getSearchQueries';
import { SearchBookFieldsType } from '@/types/SearchFieldsType';

describe('getSearchQueries', () => {
  it('should return correct search fields and exact fields for SearchBookFieldsType', () => {
    const search: SearchBookFieldsType = {
      title: { field: 'Book Title', isExact: true },
      description: { field: 'A description', isExact: false },
      author: { field: 'Author Name', isExact: true },
      publishedDate: { field: '2023-01-01', isExact: false },
      publisher: { field: 'Publisher Name', isExact: true },
      category: { field: 'Fiction', isExact: false },
    };

    const expected = {
      searchFields: {
        title: 'Book Title',
        description: 'A description',
        author: 'Author Name',
        publishedDate: '2023-01-01',
        publisher: 'Publisher Name',
        category: 'Fiction',
      },
      searchExactFields: 'title,author,publisher',
    };

    expect(getSearchQueries(search)).toEqual(expected);
  });

  it('should return correct search fields when no exact fields are specified', () => {
    const search: SearchBookFieldsType = {
      title: { field: 'Book Title', isExact: false },
      description: { field: 'A description', isExact: false },
      author: { field: 'Author Name', isExact: false },
      publishedDate: { field: '2023-01-01', isExact: false },
      publisher: { field: 'Publisher Name', isExact: false },
      category: { field: 'Fiction', isExact: false },
    };

    const expected = {
      searchFields: {
        title: 'Book Title',
        description: 'A description',
        author: 'Author Name',
        publishedDate: '2023-01-01',
        publisher: 'Publisher Name',
        category: 'Fiction',
      },
      searchExactFields: '',
    };

    expect(getSearchQueries(search)).toEqual(expected);
  });

  it('should return empty searchFields and exact fields if the input is empty', () => {
    const search: SearchBookFieldsType = {
      title: { field: '', isExact: false },
      description: { field: '', isExact: false },
      author: { field: '', isExact: false },
      publishedDate: { field: '', isExact: false },
      publisher: { field: '', isExact: false },
      category: { field: '', isExact: false },
    };

    const expected = {
      searchFields: {
        title: '',
        description: '',
        author: '',
        publishedDate: '',
        publisher: '',
        category: '',
      },
      searchExactFields: '',
    };

    expect(getSearchQueries(search)).toEqual(expected);
  });
});