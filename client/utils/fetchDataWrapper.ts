import { toast } from 'react-toastify';

const fetchDataWrapper = async <T>(
  callback: () => Promise<T>,
  setIsLoading: (bool: boolean) => void
): Promise<T | undefined> => {
  try {
    setIsLoading(true);
    const result = await callback();
    return result;
  } catch (error) {
    toast.error(error instanceof Error ? error.message : String(error));
    return undefined;
  } finally {
    setIsLoading(false);
  }
};

export default fetchDataWrapper;
