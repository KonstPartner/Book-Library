import React from 'react';
import SingleUser from '@/components/users/user/SingleUser';
import UserType from '@/types/UserType';
import fetchData from '@/utils/fetchData';
import { ALL_USERS_URL } from '@/constants/apiSources';

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  let user: UserType | null = null;
  let error: string | null = null;

  try {
    const response = await fetchData(`${ALL_USERS_URL}/${id}`);
    user = response?.data || null;

    if (!user) {
      error = `No user found with id ${id}`;
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch user';
  }
  return <SingleUser initialUser={user} fetchError={error} />;
};

export default UserPage;
