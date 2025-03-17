'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AuthModal from '@/components/auth/AuthModal';
import { selectAuth } from '@/redux/slices/authSlice';
import Button from '@/components/Button';

const ProfileScreen = () => {
  const { isAuthenticated } = useSelector(selectAuth);
  const [isModalOpen, setIsModalOpen] = useState(!isAuthenticated);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-blue-200 dark:from-gray-900 dark:to-blue-950">
      {isAuthenticated ? (
        <h1 className="text-3xl font-bold text-white">Profile</h1>
      ) : (
        <>
          <AuthModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
          {!isModalOpen && (
            <Button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-md transition-all duration-300"
            >
              Open Auth Modal
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileScreen;
