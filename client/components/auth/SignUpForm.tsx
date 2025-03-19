'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../Input';
import Button from '../Button';
import { REGISTER_USER_URL } from '@/constants/apiSources';
import fetchData from '@/utils/fetchData';
import { setAuth } from '@/redux/slices/authSlice';
import { toast } from 'react-toastify';
import fetchDataWrapper from '@/utils/fetchDataWrapper';
import validateData from '@/utils/validateData';

const SignUpForm = ({ setIsOpen }: { setIsOpen: (bool: boolean) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      validateData(formData);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    fetchDataWrapper(async () => {
      const data = await fetchData(REGISTER_USER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          password: formData.password,
        }),
      });

      if (data?.data) {
        const { user, accessToken, refreshToken } = data.data;
        dispatch(setAuth({ user, accessToken, refreshToken }));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        toast.success('Registration successful');
        setIsOpen(false);
      }
    }, setIsLoading);
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
        className="w-full border-gray-300"
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
        className="w-full border-gray-300"
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({
            ...formData,
            confirmPassword: e.target.value,
          })
        }
        className="w-full border-gray-300"
      />
      <Button
        onClick={handleSubmit}
        className="gradient-button"
        disabled={isLoading}
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
