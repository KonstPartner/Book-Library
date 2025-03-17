'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../Input';
import Button from '../Button';
import { LOGIN_USER_URL } from '@/constants/apiSources';
import fetchData from '@/utils/fetchData';
import { setAuth } from '@/redux/slices/authSlice';
import { toast } from 'react-toastify';

const LogInForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = await fetchData(LOGIN_USER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (data?.data) {
      const { user, accessToken, refreshToken } = data.data;
      dispatch(setAuth({ user, accessToken, refreshToken }));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      toast.success('Login successful');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        placeholder="Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
        className="w-full"
        disabled={isLoading}
      />
      <Input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) =>
          setFormData({
            ...formData,
            password: e.target.value,
          })
        }
        className="w-full"
        disabled={isLoading}
      />
      <Button
        onClick={handleSubmit}
        className="mt-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
        disabled={isLoading}
      >
        Login
      </Button>
    </form>
  );
};

export default LogInForm;
