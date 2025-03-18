'use client';

import React from 'react';
import StoreProvider from '@/components/StoreProvider';
import ProfileScreen from '@/components/profile/ProfileScreen';

const ProfilePage = () => {
  return (
    <StoreProvider>
      <ProfileScreen />
    </StoreProvider>
  );
};

export default ProfilePage;
