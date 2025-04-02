import { SearchBookFieldsType } from '@/types/SearchFieldsType';
import createSearchFromParams from '@/utils/createSearchFromParams';

describe('createSearchFromParams', () => {
  const initialSearch: SearchBookFieldsType = {
    title: { field: 'default title', isExact: false },
    description: { field: 'default description', isExact: false },
    author: { field: 'default author', isExact: false },
    publishedDate: { field: 'default publishedDate', isExact: false },
    publisher: { field: 'default publisher', isExact: false },
    category: { field: 'default category', isExact: false },
  };

  const searchParams = new URLSearchParams({
    title: 'new title',
    description: 'new description',
    exact: 'title,description',
  });

  const inputFields: Array<keyof SearchBookFieldsType> = [
    'title',
    'description',
    'author',
  ];

  it('should correctly map search params to initialSearch values', () => {
    const result = createSearchFromParams(
      initialSearch,
      inputFields,
      searchParams
    );

    expect(result.title.field).toBe('new title');
    expect(result.description.field).toBe('new description');
    expect(result.author.field).toBe('default author');
  });

  it('should set isExact to true for fields in the "exact" parameter', () => {
    const result = createSearchFromParams(
      initialSearch,
      inputFields,
      searchParams
    );

    expect(result.title.isExact).toBe(true);
    expect(result.description.isExact).toBe(true);
    expect(result.author.isExact).toBe(false);
  });

  it('should ignore "page", "exact", "sortBy", and "sortOrder" parameters', () => {
    const searchParamsWithExtras = new URLSearchParams({
      title: 'new title',
      page: '2',
      exact: 'title',
      sortBy: 'publishedDate',
      sortOrder: 'asc',
    });

    const result: SearchBookFieldsType &
      Partial<Record<'page' | 'sortOrder' | 'sortBy', string>> =
      createSearchFromParams(
        initialSearch,
        inputFields,
        searchParamsWithExtras
      );

    expect(result.title.field).toBe('new title');
    expect(result.page).toBeUndefined();
    expect(result.sortBy).toBeUndefined();
    expect(result.sortOrder).toBeUndefined();
  });

  it('should return initial values if no matching search params are present', () => {
    const searchParamsEmpty = new URLSearchParams();

    const result = createSearchFromParams(
      initialSearch,
      inputFields,
      searchParamsEmpty
    );

    expect(result.title.field).toBe('default title');
    expect(result.description.field).toBe('default description');
    expect(result.author.field).toBe('default author');
  });
});
