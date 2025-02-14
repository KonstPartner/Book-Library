import ErrorType from '@/types/ErrorType';
import { toast } from 'react-toastify';

type FetchParamsType = {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
};

const fetchErrors = async (res: Response) => {
  const errorData = await res.json();
  
  if (errorData.message) {
    toast.error(errorData.message);
    return;
  }

  if (!errorData.errors || !Array.isArray(errorData.errors)) {
    toast.error('Unexpected error occurred');
    return;
  }

  errorData.errors.forEach((error: ErrorType) => {
    if (error.type === 'field') {
      toast.error(`${error.msg}`);
    }
  });
};

const fetchData = async (url: string, options: FetchParamsType = {}) => {
  const defaultOptions: FetchParamsType = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    body: null,
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    const res = await fetch(url, finalOptions);
    if (!res.ok) {
      return await fetchErrors(res);
    }
    return await res.json();
  } catch (error) {
    console.error('Fetch error:', error instanceof Error ? error.message : error);
  }
};

export default fetchData;
