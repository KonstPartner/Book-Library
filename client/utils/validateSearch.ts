import { toast } from "react-toastify";
import BookType from "@/types/BookType";
import RatingType from "@/types/RatingType";

const validateSearch = (search: Partial<BookType> | Partial<RatingType>) => {
  return Object.entries(search).some(([, value]) => {
    if (typeof value === 'string') {
      return value.length === 1 || value.length > 255;
    }
    return false;
  })
    ? (toast.warn('Searchable fields must be between 2 and 255 characters length!'), false)
    : true;
};

export default validateSearch;
