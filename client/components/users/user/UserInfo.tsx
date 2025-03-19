import React from 'react';
import Image from 'next/image';
import UserType from '@/types/UserType';
import { userAvatar } from '@/constants/images';
import RatingsPreview from '@/components/ratings/RatingsPreview';
import DataOptions from '@/components/dataOptions/DataOptions';
import useAuth from '@/hooks/useAuth';
import ProfileMenu from '../profile/ProfileMenu';

const UserInfo = ({ user }: { user: UserType }) => {
  const { user: authUser } = useAuth();
  const { id, name, ratingsCount } = user;
  const isCurrentUser = authUser && authUser.id === id;

  return (
    <>
      <div className="max-w-3xl w-full mx-auto p-6 bg-gradient-to-br from-white/20 to-gray-100/20 dark:from-gray-800/20 dark:to-gray-900/20 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/40 dark:border-gray-700/40 transition-all duration-500 hover:shadow-2xl relative overflow-hidden">
        <div className="flex flex-col gap-6">
          <div className="relative group w-fit mx-auto">
            <div className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-md rounded-full shadow-lg p-2 border border-white/30 dark:border-gray-700/30 overflow-hidden">
              <Image
                src={userAvatar}
                width={200}
                height={200}
                alt={`User Image`}
                className="rounded-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:-rotate-1 z-10 relative"
              />
            </div>
          </div>

          <p className="text-center text-2xl xs:text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent relative">
            {name}
            <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
          </p>

          <RatingsPreview
            contextType="user"
            id={id}
            ratingsCount={ratingsCount as number}
          />
        </div>
        {isCurrentUser && <ProfileMenu />}
      </div>
      {isCurrentUser && <DataOptions contextType="user" id={id} />}
    </>
  );
};

export default UserInfo;
