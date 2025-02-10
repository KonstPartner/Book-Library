import { coverImage } from "@/constants/images";
import BookType from "@/types/BookType";

const getBookValues = (book: BookType) => {
  return {
    id: book.id,
    title: book.title,
    description: book.description || '-',
    author: book.author || 'Unknown',
    image: book.image || coverImage,
    infoLink: book.infoLink || '',
    publishedDate: book.publishedDate || '-',
    publisher: book.publisher || '-',
    category: book.category || '',
   ratingsCount: book.ratingsCount,
  };
};

export default getBookValues;
