import UserType from '@/types/UserType';
import React from 'react';
import Image from 'next/image';
import { userAvatar } from '@/constants/images';
import RatingsPreview from '@/components/RatingsPreview';
import DataOptions from '@/components/DataOptions';

const UserInfo = ({ user }: { user: UserType }) => {
  const { id, name, ratingsCount } = user;

  return (
    <div>
      <div className="max-w-3xl mx-auto p-6 shadow-lg rounded-lg dark:bg-zinc-800">
        <div className="flex flex-col gap-6">
          <Image
            src={userAvatar}
            width={200}
            height={200}
            alt={`User Image`}
            className="rounded-full shadow-md m-auto"
          />
          <p className="text-center text-2xl">{name}</p>
          <RatingsPreview
            contextType="user"
            id={id}
            ratingsCount={ratingsCount}
          />
        </div>
      </div>
      <DataOptions contextType="user" id={id} />
    </div>
  );
};

export default UserInfo;
