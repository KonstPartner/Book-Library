import fetchData from '@/utils/fetchData';
import ErrorType from '@/types/ErrorType';

global.fetch = jest.fn();

describe('fetchData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return data when the request is successful', async () => {
    const mockResponse = { data: 'test' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchData('https://api.example.com/data');
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.example.com/data',
      expect.objectContaining({
        method: 'GET',
      })
    );
  });

  it('should throw an error if the response has an error message', async () => {
    const mockErrorResponse = {
      message: 'Some error occurred',
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => mockErrorResponse,
    });

    await expect(fetchData('https://api.example.com/data')).rejects.toThrow(
      'Some error occurred'
    );
  });

  it('should throw an error if the response has an invalid errors array', async () => {
    const mockErrorResponse = {
      errors: 'Invalid errors array',
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => mockErrorResponse,
    });

    await expect(fetchData('https://api.example.com/data')).rejects.toThrow(
      'Unexpected error occurred'
    );
  });

  it('should throw an error if there is a field error', async () => {
    const mockErrorResponse = {
      errors: [{ type: 'field', msg: 'Field error occurred' } as ErrorType],
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => mockErrorResponse,
    });

    await expect(fetchData('https://api.example.com/data')).rejects.toThrow(
      'Field error occurred'
    );
  });

  it('should return true when the response status is 204', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 204,
      json: async () => null,
    });

    const result = await fetchData('https://api.example.com/data');
    expect(result).toBe(true);
  });
});
