import BooksMetadata from './BooksMetadata';
import BookType from './BookType';

type BooksType = { data: BookType[] | []; metadata: BooksMetadata };

export default BooksType;
