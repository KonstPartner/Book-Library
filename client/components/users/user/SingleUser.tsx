'use client';

import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import UserInfo from '@/components/users/user/UserInfo';
import { ALL_USERS_URL } from '@/constants/apiSources';
import UserType from '@/types/UserType';
import fetchData from '@/utils/fetchData';
import { RefreshCcw } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

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
    return <Spinner className="mx-auto my-16" />;
  }

  if (!user) {
    return <p>No user found with id {id}</p>;
  }

  return (
    <>
      <Button
        className="border-none shadow-none hover:underline text-gray-400 hover:text-gray-500 mr-0 ml-auto p-0"
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true);
          fetchUser();
        }}
      >
        <RefreshCcw />
      </Button>
      <UserInfo user={user} />;
    </>
  );
};

export default SingleUser;
