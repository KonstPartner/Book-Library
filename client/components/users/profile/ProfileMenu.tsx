import React from 'react';
import LogoutBtn from './LogoutBtn';
import ChangePasswordForm from './ChangePasswordForm';

const ProfileMenu = () => {
  return (
    <div className="flex flex-col gap-3 mx-auto mt-10 sm:w-2/3">
      <ChangePasswordForm />
      <LogoutBtn />
    </div>
  );
};

export default ProfileMenu;
