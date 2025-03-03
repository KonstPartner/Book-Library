export type SearchFieldType = {
  field: string;
  isExact: boolean;
};

export type SearchBookFieldsType = {
  title: SearchFieldType;
  description: SearchFieldType;
  author: SearchFieldType;
  publishedDate: SearchFieldType;
  publisher: SearchFieldType;
  category: SearchFieldType;
};

export type SearchRatingFieldsType = {
  reviewHelpfulness: SearchFieldType;
  reviewScore: SearchFieldType;
  reviewSummary: SearchFieldType;
  reviewText: SearchFieldType;
  user: SearchFieldType;
  book: SearchFieldType;
};
