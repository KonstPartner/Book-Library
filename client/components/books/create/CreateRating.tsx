'use client';

import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaStar } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { ratingInputFields } from '@/constants/createFields';
import fetchData from '@/utils/fetchData';
import { ALL_RATINGS_URL } from '@/constants/apiSources';

type RatingForm = {
  user: string;
  reviewScore: string;
  reviewSummary: string;
  reviewText: string;
};

const CreateRating = ({ id }: { id: number }) => {
  const router = useRouter();

  const [formData, setFormData] = useState<RatingForm>({
    user: '',
    reviewScore: '',
    reviewSummary: '',
    reviewText: '',
  });
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
    setIsLoading(true);

    if (!formData.user.trim() || !formData.reviewScore.trim()) {
      toast.warn('User and rating are required!');
      setIsLoading(false);
      return;
    }

    const ratingData = {
      bookId: id,
      reviewHelpfulness: '0/0',
      ...Object.fromEntries(
        Object.entries(formData).filter(([, value]) => value.trim() !== '')
      ),
    };

    const data = await fetchData(ALL_RATINGS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ratingData),
    });

    if (data?.data) {
      toast.success('Rating submitted successfully!');
      router.push(`/ratings/${data.data.id}`);
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full mx-auto mt-6 p-6 border rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <h2 className="font-semibold mb-4 text-center">Share your opinion</h2>
      <div className="flex flex-col gap-4">
        {ratingInputFields.map((field) => (
          <div key={field} className="flex flex-col">
            {field === 'reviewText' ? (
              <textarea
                name={field}
                value={formData[field as keyof RatingForm]}
                onChange={handleChange}
                placeholder="Your review"
                className="p-3 border rounded-md
                bg-gray-100 dark:bg-transparent dark:border-gray-400"
              />
            ) : field === 'reviewScore' ? (
              <div className="m-auto">
                <p className="text-center text-gray-500">Select rating:</p>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          reviewScore: star.toString(),
                        })
                      }
                      className={`cursor-pointer text-xl transition-all ${
                        star <= Number(formData.reviewScore)
                          ? 'text-yellow-300'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <Input
                name={field}
                value={formData[field as keyof RatingForm]}
                onChange={handleChange}
                placeholder={field === 'user' ? 'User name' : field}
                className={`${
                  field === 'user' ? 'p-1' : 'p-2'
                } border rounded-md dark:bg-transparent dark:border-gray-400 focus:ring-2 focus:ring-blue-500`}
              />
            )}
          </div>
        ))}

        <Button
          onClick={handleClick}
          disabled={isLoading}
          className="m-auto border-none bg-blue-500 dark:bg-blue-700 text-white hover:bg-blue-600"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default CreateRating;
