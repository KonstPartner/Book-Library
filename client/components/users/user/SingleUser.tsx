'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { RefreshCcw } from 'lucide-react';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import UserInfo from '@/components/users/user/UserInfo';
import { ALL_USERS_URL } from '@/constants/apiSources';
import UserType from '@/types/UserType';
import fetchData from '@/utils/fetchData';
import StoreProvider from '@/components/StoreProvider';

const SingleUser = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const data = await fetchData(`${ALL_USERS_URL}/${id}`);
    if (data?.data) setUser(data.data);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id, fetchUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-tl from-blue-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950 p-4 overflow-hidden relative">
        <Spinner className="mx-auto my-16" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-tl from-blue-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950 p-4 overflow-hidden relative">
        <p>No user found with id {id}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950 p-4 overflow-hidden relative">
      <Button
        className="border-none shadow-none hover:underline text-gray-400 hover:text-gray-500 mr-0 ml-auto p-1"
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true);
          fetchUser();
        }}
      >
        <RefreshCcw />
      </Button>
      <StoreProvider>
        <UserInfo user={user} />
      </StoreProvider>
    </div>
  );
};

export default SingleUser;
