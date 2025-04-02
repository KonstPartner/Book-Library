import BookType from './BookType';
import RatingType from './RatingType';
import UserType from './UserType';

type FieldsType = Partial<BookType> | Partial<RatingType> | Partial<UserType>;

export default FieldsType;
