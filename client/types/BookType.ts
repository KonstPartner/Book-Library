type BookType = {
  id?: number;
  title: string;
  description: string | null;
  author: string | null;
  image: string | null;
  publisher: string | null;
  publishedDate: string | null;
  infoLink: string | null;
  category: string | null;
  ratingsCount?: number
};

export default BookType;
