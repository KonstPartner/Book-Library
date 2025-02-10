import React, { useEffect, useState } from 'react';
import RatingsList from '../../ratings/RatingsList';
import fetchData from '@/utils/fetchData';
import { ALL_BOOKS_URL } from '@/constants/apiSources';
import Link from 'next/link';

const BookRatings = ({
  id,
  ratingsCount,
}: {
  id: number;
  ratingsCount: number;
}) => {
  const [ratings, setRatings] = useState([]);
  useEffect(() => {
    const fetchRatings = async () => {
      const data = await fetchData(`${ALL_BOOKS_URL}/${id}/ratings`);
      if (data?.data) {
        setRatings(data.data);
      }
    };
    fetchRatings();
  }, [id]);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
      <div className="flex justify-between">
        <p>Reviews ({ratingsCount})</p>
        <Link href={`/books/${id}/ratings`}>
          <p className='text-blue-600'>Show All</p>
        </Link>
      </div>
      <RatingsList ratings={ratings} />
    </div>
  );
};

export default BookRatings;
