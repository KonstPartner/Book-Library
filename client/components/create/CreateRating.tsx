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
    <div className="w-full mx-auto mt-6 gradient-blur-container p-2">
      <span className="absolute top-0 left-0 w-full h-1 bg-[linear-gradient(to_right,#8b5cf6,#ec4899,#8b5cf6,#3b82f6)] animate-gradient-x" />

      <h2 className="text-xl xs:text-2xl md:text-3xl gradient-title text-center mb-6 relative">
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
                placeholder="Your Review"
                className="form-textarea"
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
                placeholder={field === 'reviewSummary' ? 'Review Summary' : field}
                className="form-input"
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
          className="rating-submit-button"
        >
          Send
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 animate-shine" />
        </Button>
      </div>
    </div>
  );
};

export default CreateRating;
