import SingleBook from '@/components/books/book/SingleBook';
import { ALL_BOOKS_URL } from '@/constants/apiSources';
import BookType from '@/types/BookType';
import fetchData from '@/utils/fetchData';

const BookPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  let book: BookType | null = null;
  let error: string | null = null;

  try {
    const response = await fetchData(`${ALL_BOOKS_URL}/${id}`);
    book = response?.data || null;

    if (!book) {
      error = `No book found with id ${id}`;
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch book';
  }

  return <SingleBook initialBook={book} fetchError={error} />;
};

export default BookPage;
