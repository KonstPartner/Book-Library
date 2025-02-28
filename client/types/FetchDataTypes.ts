import MetadataType from './MetadataType';
import BookType from './BookType';
import RatingType from './RatingType';

export type BooksType = {
  data: BookType[] | [];
  metadata: MetadataType;
};

export type RatingsType = {
  data: RatingType[] | [];
  metadata: MetadataType;
};
