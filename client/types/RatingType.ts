type RatingType = {
  id: string;
  reviewHelpfulness: string | null;
  reviewScore: string | null;
  reviewSummary: string | null;
  reviewText: string | null;
  user: string;
  book: string;
};

export default RatingType;
