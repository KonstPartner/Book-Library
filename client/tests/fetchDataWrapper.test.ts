import fetchDataWrapper from '@/utils/fetchDataWrapper';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('fetchDataWrapper', () => {
  let setIsLoading: jest.Mock;

  beforeEach(() => {
    setIsLoading = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return result when callback succeeds', async () => {
    const mockCallback = jest.fn().mockResolvedValueOnce('Success');

    const result = await fetchDataWrapper(mockCallback, setIsLoading);

    expect(result).toBe('Success');
    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should call toast.error when callback fails', async () => {
    const mockError = new Error('Something went wrong');
    const mockCallback = jest.fn().mockRejectedValueOnce(mockError);

    const result = await fetchDataWrapper(mockCallback, setIsLoading);

    expect(result).toBeUndefined();
    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(toast.error).toHaveBeenCalledWith('Something went wrong');
  });

  it('should handle non-Error objects in the catch block', async () => {
    const mockCallback = jest.fn().mockRejectedValueOnce('Non Error Message');

    const result = await fetchDataWrapper(mockCallback, setIsLoading);

    expect(result).toBeUndefined();
    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(toast.error).toHaveBeenCalledWith('Non Error Message');
  });
});
