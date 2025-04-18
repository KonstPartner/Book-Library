'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';
import Button from '../../Button';
import { toast } from 'react-toastify';

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('You successfully logged out!');
  };

  return (
    <Button
      onClick={handleLogout}
      className="w-fit mx-auto px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-lg shadow-md transition-all duration-300 text-sm sm:text-base font-medium"
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
