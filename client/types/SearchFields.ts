export type SearchBooksFieldsType = {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  publisher: string;
  category: string;
};

export type SearchRatingsFieldsType = {
  reviewHelpfulness: string;
  reviewScore: string;
  reviewSummary: string;
  reviewText: string;
  user?: string;
  book?: string;
};
