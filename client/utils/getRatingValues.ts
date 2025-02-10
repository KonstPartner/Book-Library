import RatingType from '@/types/RatingType';

const getRatingValues = (rating: RatingType) => {
  return {
    id: rating.id,
    user: rating.user,
    book: rating.book,
    reviewHelpfulness: rating.reviewHelpfulness || '0/0',
    reviewScore: rating.reviewScore || '5.0',
    reviewSummary: rating.reviewSummary || '',
    reviewText: rating.reviewText || '',
  };
};

export default getRatingValues;
