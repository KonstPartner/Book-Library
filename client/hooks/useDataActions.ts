import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import fetchData from '@/utils/fetchData';
import {
  ALL_BOOKS_URL,
  ALL_RATINGS_URL,
  ALL_USERS_URL,
} from '@/constants/apiSources';

const getApiUrl = (contextType: 'book' | 'rating' | 'user', id: string | number) => {
  return `${
    contextType === 'book' ? ALL_BOOKS_URL : contextType === 'rating' ? ALL_RATINGS_URL : ALL_USERS_URL
  }/${id}`;
};

export const useDataActions = (id: string | number, contextType: 'book' | 'rating' | 'user') => {
  const router = useRouter();

  const handleDelete = async () => {
    const deletedData = await fetchData(getApiUrl(contextType, id), { method: 'DELETE' });
    if (deletedData) {
      toast.success(`${contextType} deleted successfully!`);
      router.back();
    } else {
      toast.error(`Failed to delete ${contextType}`);
    }
  };

  const handleUpdate = async (updateFields: Record<string, any>, onClose: () => void) => {
    const filteredData = Object.fromEntries(
      Object.entries(updateFields).filter(([, value]) => (value as string).trim() !== '')
    );

    const updatedData = await fetchData(getApiUrl(contextType, id), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filteredData),
    });

    if (updatedData) {
      toast.success(`${contextType} updated successfully!`);
      onClose();
    } else {
      toast.error(`Failed to update ${contextType}`);
    }
  };

  return { handleDelete, handleUpdate };
};
