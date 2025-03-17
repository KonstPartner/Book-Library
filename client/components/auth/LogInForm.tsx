'use client';

import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';

const LogInForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.placeholder.toLowerCase()]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full"
      />
      <Input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full"
      />
      <Button
        onClick={handleSubmit}
        className="mt-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
      >
        Login
      </Button>
    </form>
  );
};

export default LogInForm;