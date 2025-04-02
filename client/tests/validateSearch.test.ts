import validateSearch from '@/utils/validateSearch';
import { toast } from 'react-toastify';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
} from '@/types/SearchFieldsType';

jest.mock('react-toastify', () => ({
  toast: {
    warn: jest.fn(),
  },
}));

describe('validateSearch', () => {
  beforeEach(() => {
    (toast.warn as jest.Mock).mockClear();
  });

  describe('SearchBookFieldsType validation', () => {
    const validBookSearch: SearchBookFieldsType = {
      title: { field: 'Harry Potter', isExact: false },
      description: { field: 'Magic', isExact: true },
      author: { field: 'Rowling', isExact: false },
      publishedDate: { field: '2000', isExact: true },
      publisher: { field: 'Bloomsbury', isExact: false },
      category: { field: 'Fantasy', isExact: true },
    };

    it('returns true for valid fields', () => {
      const result = validateSearch(validBookSearch);
      expect(result).toBe(true);
      expect(toast.warn).not.toHaveBeenCalled();
    });

    it('returns false and shows warning for field with length 1', () => {
      const invalidSearch = {
        ...validBookSearch,
        title: { field: 'H', isExact: false },
      };
      const result = validateSearch(invalidSearch);
      expect(result).toBe(false);
      expect(toast.warn).toHaveBeenCalledWith(
        'Searchable fields must be between 2 and 255 characters length!'
      );
    });

    it('returns false and shows warning for field exceeding 255 characters', () => {
      const longString = 'a'.repeat(256);
      const invalidSearch = {
        ...validBookSearch,
        description: { field: longString, isExact: true },
      };
      const result = validateSearch(invalidSearch);
      expect(result).toBe(false);
      expect(toast.warn).toHaveBeenCalledWith(
        'Searchable fields must be between 2 and 255 characters length!'
      );
    });
  });

  describe('SearchRatingFieldsType validation', () => {
    const validRatingSearch: SearchRatingFieldsType = {
      reviewHelpfulness: { field: '0/0', isExact: false },
      reviewScore: { field: '5.0', isExact: true },
      reviewSummary: { field: 'Great book', isExact: false },
      reviewText: { field: 'Really enjoyed it', isExact: true },
      user: { field: 'JohnDoe', isExact: false },
      book: { field: 'BookTitle', isExact: true },
    };

    it('returns true for valid fields', () => {
      const result = validateSearch(validRatingSearch);
      expect(result).toBe(true);
      expect(toast.warn).not.toHaveBeenCalled();
    });

    it('returns false and shows warning for field with length 1', () => {
      const invalidSearch = {
        ...validRatingSearch,
        reviewSummary: { field: 'G', isExact: false },
      };
      const result = validateSearch(invalidSearch);
      expect(result).toBe(false);
      expect(toast.warn).toHaveBeenCalledWith(
        'Searchable fields must be between 2 and 255 characters length!'
      );
    });

    it('returns false and shows warning for field exceeding 255 characters', () => {
      const longString = 'a'.repeat(256);
      const invalidSearch = {
        ...validRatingSearch,
        reviewText: { field: longString, isExact: true },
      };
      const result = validateSearch(invalidSearch);
      expect(result).toBe(false);
      expect(toast.warn).toHaveBeenCalledWith(
        'Searchable fields must be between 2 and 255 characters length!'
      );
    });
  });

  it('returns true for empty search object', () => {
    const emptySearch = {};
    const result = validateSearch(
      emptySearch as SearchBookFieldsType | SearchRatingFieldsType
    );
    expect(result).toBe(true);
    expect(toast.warn).not.toHaveBeenCalled();
  });
});
