'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner';
import UserInfo from '@/components/users/user/UserInfo';
import { ALL_USERS_URL } from '@/constants/apiSources';
import UserType from '@/types/UserType';
import fetchData from '@/utils/fetchData';
import StoreProvider from '@/components/StoreProvider';
import fetchDataWrapper from '@/utils/fetchDataWrapper';
import RatingType from '@/types/RatingType';
import RefreshBtn from '@/components/RefreshBtn';

const SingleUser = ({
  initialUser,
  fetchError,
  initialRatings,
}: {
  initialUser: UserType | null;
  fetchError: string | null;
  initialRatings: RatingType[];
}) => {
  const params = useParams();
  const { id } = params as { id: string };
  const [user, setUser] = useState<UserType | null>(initialUser);
  const [ratings, setRatings] = useState<RatingType[]>(initialRatings);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (fetchError) {
      toast.error(fetchError);
    }
  }, [fetchError]);

  const fetchUser = useCallback(async () => {
    fetchDataWrapper(async () => {
      const userData = await fetchData(`${ALL_USERS_URL}/${id}`);
      const ratingsData = await fetchData(`${ALL_USERS_URL}/${id}/ratings`);
      if (userData?.data) {
        setUser(userData.data);
        setRatings(ratingsData?.data?.data || []);
        toast.success('User refreshed successfully');
      }
    }, setIsLoading);
  }, [id]);

  if (isLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-page-bg">
        <Spinner className="mx-auto my-16" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-page-bg">
        <p className="text-gray-600 dark:text-gray-400">
          {fetchError || `No user found with id ${id}`}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-page-bg flex items-start justify-center py-8">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RefreshBtn
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          callback={fetchUser}
        />
        <StoreProvider>
          <UserInfo user={user} ratings={ratings} />
        </StoreProvider>
      </div>
    </div>
  );
};

export default SingleUser;
