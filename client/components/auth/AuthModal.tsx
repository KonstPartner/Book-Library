'use client';

import React, { useState } from 'react';
import Button from '@/components/Button';
import { X } from 'lucide-react';
import SignUpForm from './SignUpForm';
import LogInForm from './LogInForm';

interface AuthModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const AuthModal = ({ isOpen, setIsOpen }: AuthModalProps) => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 sm:px-0">
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <Button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 p-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-all duration-300"
          noLoadingText
        >
          <X className="w-5 h-5" />
        </Button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Please, {isLoginForm ? 'log in' : 'sign up'} to continue
        </h2>

        {isLoginForm ? (
          <LogInForm setIsOpen={(bool: boolean) => setIsOpen(bool)} />
        ) : (
          <SignUpForm setIsOpen={(bool: boolean) => setIsOpen(bool)} />
        )}

        <p className="mt-4 text-center text-gray-600 text-sm">
          {isLoginForm ? (
            <>
              Don’t have an account?{' '}
              <span
                onClick={() => setIsLoginForm(!isLoginForm)}
                className="text-blue-600 hover:text-blue-700 cursor-pointer underline transition-all duration-300"
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setIsLoginForm(!isLoginForm)}
                className="text-blue-600 hover:text-blue-700 cursor-pointer underline transition-all duration-300"
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
