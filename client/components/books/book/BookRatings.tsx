import React, { useEffect, useState } from 'react';
import RatingsList from '../../ratings/RatingsList';
import fetchData from '@/utils/fetchData';
import { ALL_BOOKS_URL } from '@/constants/apiSources';

const BookRatings = ({
  id,
  ratingsCount,
}: {
  id: number;
  ratingsCount: number;
}) => {
  const [ratings, setRatings] = useState([]);
  console.log(ratings);
  useEffect(() => {
    const fetchRatings = async () => {
      const data = await fetchData(`${ALL_BOOKS_URL}/${id}/ratings`);
      if (data?.data) {
        setRatings(data.data);
      }
    };
    fetchRatings();
  }, [id]);
  console.log(ratings);

  return (
    <div>
      <div>Reviews ({ratingsCount})</div>
      <RatingsList ratings={ratings} />
    </div>
  );
};

export default BookRatings;
