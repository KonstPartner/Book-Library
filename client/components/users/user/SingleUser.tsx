'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { RefreshCcw } from 'lucide-react';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import UserInfo from '@/components/users/user/UserInfo';
import { ALL_USERS_URL } from '@/constants/apiSources';
import UserType from '@/types/UserType';
import fetchData from '@/utils/fetchData';
import StoreProvider from '@/components/StoreProvider';
import fetchDataWrapper from '@/utils/fetchDataWrapper';

const SingleUser = ({
  initialUser,
  fetchError,
}: {
  initialUser: UserType | null;
  fetchError: string | null;
}) => {
  const params = useParams();
  const { id } = params as { id: string };
  const [user, setUser] = useState<UserType | null>(initialUser);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (fetchError) {
      toast.error(fetchError);
    }
  }, [fetchError]);

  const fetchUser = useCallback(async () => {
    fetchDataWrapper(async () => {
      const data = await fetchData(`${ALL_USERS_URL}/${id}`);
      if (data?.data) setUser(data.data);
    }, setIsLoading);
  }, [id]);

  if (isLoading && !user) {
    return (
      <div className="gradient-page-bg">
        <Spinner className="mx-auto my-16" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="gradient-page-bg">
        <p>{fetchError || `No user found with id ${id}`}</p>
      </div>
    );
  }

  return (
    <div className="gradient-page-bg">
      <Button
        className="refresh-button"
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
