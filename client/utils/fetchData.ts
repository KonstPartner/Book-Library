import ErrorType from '@/types/ErrorType';

type FetchParamsType = {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
};

const fetchErrors = async (res: Response) => {
  const errorData = await res.json();

  if (errorData.message) {
    throw new Error(errorData.message);
  }

  if (!errorData.errors || !Array.isArray(errorData.errors)) {
    throw new Error('Unexpected error occurred');
  }

  errorData.errors.forEach((error: ErrorType) => {
    if (error.type === 'field') {
      throw new Error(error.msg);
    }
  });
};

const fetchData = async (url: string, options: FetchParamsType = {}) => {
  const defaultOptions: FetchParamsType = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    body: null,
  };

  const finalOptions = { ...defaultOptions, ...options };

  const res = await fetch(url, finalOptions);
  if (!res.ok) {
    return await fetchErrors(res);
  }
  if (res.status === 204) {
    return true;
  }
  return await res.json();
};

export default fetchData;
