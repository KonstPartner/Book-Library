interface BookAttributes {
  id: number;
  title: string;
  description: string | null;
  author: string | null;
  image: string | null;
  publisher: string | null;
  publishedDate: string | null;
  infoLink: string | null;
  categoryId: number | null;
  userId: string | null;
}

interface CategoryAttributes {
  id: number;
  name: string;
}

interface RatingAttributes {
  id: string;
  bookId: number;
  userId: string;
  reviewHelpfulness: string | null;
  reviewScore: string | null;
  reviewSummary: string | null;
  reviewText: string | null;
}

interface UserAttributes {
  id: string;
  name: string;
}

interface RegisteredUserAttributes {
  id: string;
  users_id: string;
  password: string;
}

export { BookAttributes, CategoryAttributes, RatingAttributes, UserAttributes, RegisteredUserAttributes };
