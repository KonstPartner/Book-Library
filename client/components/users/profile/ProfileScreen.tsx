'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthModal from '@/components/auth/AuthModal';
import Button from '@/components/Button';
import useAuth from '@/hooks/useAuth';
import Spinner from '../../Spinner';

const ProfileScreen = () => {
  const router = useRouter();

  const { isAuthenticated, loading, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated && user) {
      router.replace(`/users/${user.id}`);
    } else {
      setIsModalOpen(true);
    }
  }, [isAuthenticated, loading, user, router]);

  if (loading) {
    return (
      <div className="auth-screen-bg">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="auth-screen-bg">
      {!isAuthenticated && (
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