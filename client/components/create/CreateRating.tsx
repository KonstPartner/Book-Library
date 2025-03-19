'use client';

import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { ratingDataFields, ratingInputFields } from '@/constants/createFields';
import fetchData from '@/utils/fetchData';
import { ALL_RATINGS_URL } from '@/constants/apiSources';
import RatingType from '@/types/RatingType';
import RatingInput from '../ratings/RatingInput';
import useAuth from '@/hooks/useAuth';
import fetchDataWrapper from '@/utils/fetchDataWrapper';

const CreateRating = ({
  id,
  setIsAuthModalOpen,
}: {
  id: number;
  setIsAuthModalOpen: (value: boolean) => void;
}) => {
  const router = useRouter();

  const { isAuthenticated, loading: authLoading, accessToken } = useAuth();
  const [formData, setFormData] =
    useState<Partial<RatingType>>(ratingDataFields);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    if (authLoading) return;

    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    setIsLoading(true);

    if (!formData.reviewScore?.trim()) {
      toast.warn('Rating is required!');
      setIsLoading(false);
      return;
    }

    const ratingData = {
      bookId: id,
      reviewHelpfulness: '0/0',
      ...Object.fromEntries(
        Object.entries(formData).filter(
          ([, value]) => value?.toString().trim() !== ''
        )
      ),
    };
    fetchDataWrapper(async () => {
      const data = await fetchData(ALL_RATINGS_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratingData),
      });

      if (data?.data) {
        toast.success('Rating submitted successfully!');
        router.push(`/ratings/${data.data.id}`);
      }
    }, setIsLoading);
  };

  return (
    <div className="w-full mx-auto mt-6 p-6 bg-gradient-to-br from-white/20 to-gray-100/20 dark:from-gray-900/20 dark:to-blue-950/20 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/40 dark:border-gray-700/40 relative overflow-hidden">
      <span className="absolute top-0 left-0 w-full h-1 bg-[linear-gradient(to_right,#8b5cf6,#ec4899,#8b5cf6,#3b82f6)] animate-gradient-x" />

      <h2 className="text-xl xs:text-2xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent relative">
        Share Your Opinion
        <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
      </h2>

      <div className="flex flex-col gap-4">
        {ratingInputFields.map((field) => (
          <div key={field} className="flex flex-col relative group">
            {field === 'reviewText' ? (
              <textarea
                name={field}
                value={formData[field as keyof RatingType] as string}
                onChange={handleChange}
                placeholder="Your review"
                className="w-full p-3 bg-white/30 dark:bg-gray-900/30 border border-white/40 dark:border-gray-700/40 rounded-lg shadow-sm backdrop-blur-md text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/40 dark:hover:bg-gray-900/40 h-32 resize-y"
              />
            ) : field === 'reviewScore' ? (
              <RatingInput
                field={field}
                dataFields={formData}
                setDataFields={(value) =>
                  setFormData(value as Partial<RatingType>)
                }
              />
            ) : (
              <Input
                name={field}
                value={formData[field as keyof RatingType] as string}
                onChange={handleChange}
                placeholder={field === 'user' ? 'User Name' : field}
                className="w-full p-2 bg-white/30 dark:bg-gray-900/30 border border-white/40 dark:border-gray-700/40 rounded-lg shadow-sm backdrop-blur-md text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            )}

            {field !== 'reviewScore' && (
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            )}
          </div>
        ))}

        <Button
          onClick={handleClick}
          disabled={isLoading}
          className="mt-4 mx-auto px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-500 disabled:hover:via-purple-500 disabled:hover:to-pink-600 relative overflow-hidden"
        >
          Send
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 animate-shine" />
        </Button>
      </div>
    </div>
  );
};

export default CreateRating;
