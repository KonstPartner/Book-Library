import DataMetadata from './DataMetadata';
import BookType from './BookType';
import RatingType from './RatingType';

export type BooksType = {
  data: BookType[] | [];
  metadata: DataMetadata;
};

export type RatingsType = {
  data: RatingType[] | [];
  metadata: DataMetadata;
};
