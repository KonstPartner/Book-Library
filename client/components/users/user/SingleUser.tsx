'use client';

import Spinner from '@/components/Spinner';
import UserInfo from '@/components/users/user/UserInfo';
import { ALL_USERS_URL } from '@/constants/apiSources';
import UserType from '@/types/UserType';
import fetchData from '@/utils/fetchData';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SingleUser = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchData(`${ALL_USERS_URL}/${id}`);
      if (data?.data) setUser(data.data);
      setIsLoading(false);
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (isLoading) {
    return <Spinner className='mx-auto my-16'/>;
  }

  if (!user) {
    return <p>No user found with id {id}</p>;
  }

  return <UserInfo user={user} />;
};

export default SingleUser;
