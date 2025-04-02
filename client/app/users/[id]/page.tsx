import React from 'react';
import SingleUser from '@/components/users/user/SingleUser';
import UserType from '@/types/UserType';
import fetchData from '@/utils/fetchData';
import { ALL_USERS_URL } from '@/constants/apiSources';
import RatingType from '@/types/RatingType';

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  let user: UserType | null = null;
  let error: string | null = null;
  let ratings: RatingType[] = [];

  try {
    const userResponse = await fetchData(`${ALL_USERS_URL}/${id}`);
    user = userResponse?.data || null;

    if (!user) {
      error = `No user found with id ${id}`;
    } else {
      const ratingsResponse = await fetchData(`${ALL_USERS_URL}/${id}/ratings`);
      ratings = ratingsResponse?.data?.data || [];
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch user';
  }

  return (
    <SingleUser
      initialUser={user}
      fetchError={error}
      initialRatings={ratings}
    />
  );
};

export default UserPage;
