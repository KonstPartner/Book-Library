import SingleBook from '@/components/books/book/SingleBook';
import { ALL_BOOKS_URL } from '@/constants/apiSources';
import BookType from '@/types/BookType';
import RatingType from '@/types/RatingType';
import fetchData from '@/utils/fetchData';

const BookPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  let book: BookType | null = null;
  let error: string | null = null;
  let ratings: RatingType[] = [];

  try {
    const bookResponse = await fetchData(`${ALL_BOOKS_URL}/${id}`);
    book = bookResponse?.data || null;

    if (!book) {
      error = `No book found with id ${id}`;
    } else {
      const ratingsResponse = await fetchData(`${ALL_BOOKS_URL}/${id}/ratings`);
      ratings = ratingsResponse?.data?.data || [];
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch book';
  }

  return (
    <SingleBook
      initialBook={book}
      fetchError={error}
      initialRatings={ratings}
    />
  );
};

export default BookPage;
