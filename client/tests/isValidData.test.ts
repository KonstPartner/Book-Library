import isValidData from '@/utils/isValidData';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    warn: jest.fn(),
  },
}));

describe('isValidData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return false and show warning if book title is empty on create request', () => {
    const book = { title: '' };
    const result = isValidData('book', book, true);

    expect(result).toBe(false);
    expect(toast.warn).toHaveBeenCalledWith('Title is required!');
  });

  it('should return false and show warning if any field is less than 2 characters', () => {
    const book = { title: 'B', author: 'A', publisher: 'P' };
    const result = isValidData('book', book, true);

    expect(result).toBe(false);
    expect(toast.warn).toHaveBeenCalledWith('Fields must be at least 2 chars long');
  });

  it('should return false and show warning if image URL is invalid', () => {
    const book = { title: 'Valid Book', image: 'https://invalid-domain.com/image.jpg' };
    const result = isValidData('book', book, true);

    expect(result).toBe(false);
    expect(toast.warn).toHaveBeenCalledWith('Image URL is invalid. Valid domains: coverart.oclc.org and books.google.com');
  });

  it('should return false and show warning if info link is invalid', () => {
    const book = { title: 'Valid Book', infoLink: 'invalid-link' };
    const result = isValidData('book', book, true);

    expect(result).toBe(false);
    expect(toast.warn).toHaveBeenCalledWith('Info Link URL is invalid');
  });

  it('should return true if book data is valid', () => {
    const book = { title: 'Valid Book', author: 'Author Name', publishedDate: '2021-05-21', image: 'https://books.google.com/image.jpg', infoLink: 'https://validlink.com' };
    const result = isValidData('book', book, true);

    expect(result).toBe(true);
    expect(toast.warn).not.toHaveBeenCalled();
  });

  it('should return true for rating and user types', () => {
    const resultRating = isValidData('rating', {}, true);
    const resultUser = isValidData('user', {}, true);

    expect(resultRating).toBe(true);
    expect(resultUser).toBe(true);
    expect(toast.warn).not.toHaveBeenCalled();
  });
});
