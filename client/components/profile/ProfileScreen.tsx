'use client';

import React, { useState, useEffect } from 'react';
import AuthModal from '@/components/auth/AuthModal';
import Button from '@/components/Button';
import useAuth from '@/hooks/useAuth';
import Spinner from '../Spinner';
import ProfileMenu from './ProfileMenu';

const ProfileScreen = () => {
  const { isAuthenticated, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(!isAuthenticated && !loading);
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-blue-200 dark:from-gray-900 dark:to-blue-950">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-blue-200 dark:from-gray-900 dark:to-blue-950">
      {isAuthenticated ? (
        <ProfileMenu />
      ) : (
        <>
          <AuthModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
          {!isModalOpen && (
            <div className="flex flex-col gap-2 text-white">
              <p className="text-2xl">Please, log in to continue</p>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="mx-auto py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-md transition-all duration-300"
              >
                Log in
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileScreen;
