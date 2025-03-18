'use client';

import React from 'react';
import StoreProvider from '@/components/StoreProvider';
import ProfileScreen from '@/components/users/profile/ProfileScreen';

const ProfilePage = () => {
  return (
    <StoreProvider>
      <ProfileScreen />
    </StoreProvider>
  );
};

export default ProfilePage;
