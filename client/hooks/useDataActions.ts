import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import fetchData from '@/utils/fetchData';
import {
  ALL_BOOKS_URL,
  ALL_RATINGS_URL,
  ALL_USERS_URL,
} from '@/constants/apiSources';
import fetchDataWrapper from '@/utils/fetchDataWrapper';
import useAuth from './useAuth';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';

const getApiUrl = (
  contextType: 'book' | 'rating' | 'user',
  id: string | number
) => {
  return `${
    contextType === 'book'
      ? ALL_BOOKS_URL
      : contextType === 'rating'
      ? ALL_RATINGS_URL
      : ALL_USERS_URL
  }/${id}`;
};

export const useDataActions = (
  id: string | number,
  contextType: 'book' | 'rating' | 'user'
) => {
  const router = useRouter();
  const { accessToken } = useAuth();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    fetchDataWrapper(async () => {
      const deletedData = await fetchData(getApiUrl(contextType, id), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (deletedData) {
        toast.success(`${contextType} deleted successfully!`);
        if (contextType === 'user') {
          dispatch(logout());
        }
        router.replace('/');
      } else {
        toast.error(`Failed to delete ${contextType}`);
      }
    }, setIsLoading);
  };

  const handleUpdate = async (
    updateFields: Record<string, any>,
    onClose: () => void
  ) => {
    const filteredData = Object.fromEntries(
      Object.entries(updateFields).filter(
        ([, value]) => (value as string).trim() !== ''
      )
    );
    fetchDataWrapper(async () => {
      const updatedData = await fetchData(getApiUrl(contextType, id), {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredData),
      });

      if (updatedData) {
        toast.success(`${contextType} updated successfully!`);
        onClose();
      } else {
        toast.error(`Failed to update ${contextType}`);
      }
    }, setIsLoading);
  };

  return { handleDelete, handleUpdate, isLoading };
};
