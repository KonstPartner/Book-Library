'use client';

import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('SignUp Form Data:', formData);
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
        className="w-full"
      />
      <Button
        onClick={handleSubmit}
        className="mt-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
      >
        Register
      </Button>
    </form>
  );
};

export default SignUpForm;
