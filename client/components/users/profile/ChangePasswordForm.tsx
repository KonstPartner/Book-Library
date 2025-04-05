import React, { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { CHANGE_PASSWORD_URL } from '@/constants/apiSources';
import useAuth from '@/hooks/useAuth';
import fetchData from '@/utils/fetchData';
import fetchDataWrapper from '@/utils/fetchDataWrapper';
import Input from '@/components/Input';
import Button from '@/components/Button';
import validateData from '@/utils/validateData';

const ChangePasswordForm = () => {
  const { accessToken } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirmation do not match.');
      return;
    }

    const formData = {
      oldPassword: currentPassword,
      newPassword,
    };

    try {
      validateData({ password: formData.oldPassword });
      validateData({ password: formData.newPassword });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
      return;
    }

    await fetchDataWrapper(async () => {
      await fetchData(CHANGE_PASSWORD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Password changed successfully.');
    }, setIsLoading);
  };

  return (
    <div className="flex items-center justify-center  dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6 text-center">
          Change Password
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="flex flex-col gap-4">
            <Input
              type="password"
              className="border border-gray-400 w-full"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              className="border border-gray-400 w-full"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              className="border border-gray-400 w-full"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-fit mx-auto text-md py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
