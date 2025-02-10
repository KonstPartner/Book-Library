import ErrorType from '@/types/ErrorType';
import { toast } from 'react-toastify';

const fetchErrors = async (res: Response) => {
  const errorData = await res.json();
  if (errorData.message) {
    toast.error(errorData.message);
    return;
  }
  if (!errorData.errors || !Array.isArray(errorData.errors)) {
    toast.error('Unexpected error occured');
    return;
  }
  errorData.errors.forEach((error: ErrorType) => {
    if (error.type === 'field') {
      toast.error(`${error.msg}`);
    }
  });
  return;
};

const fetchData = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return await fetchErrors(res);
    }
    return await res.json();
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
  }
};

export default fetchData;
