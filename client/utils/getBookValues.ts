import BookType from "@/types/BookType";

const getBookValues = (book: BookType) => {
  return {
    id: book.id,
    title: book.title,
    description: book.description || '-',
    author: book.author || '-',
    image: book.image || '',
    infoLink: book.infoLink || '',
    publishedDate: book.publishedDate || '-',
    publisher: book.publisher || '-',
    category: book.category || '',
  };
};

export default getBookValues;
