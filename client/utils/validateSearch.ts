import { toast } from 'react-toastify';
import {
  SearchBookFieldsType,
  SearchRatingFieldsType,
} from '@/types/SearchFieldsType';

const validateSearch = (
  search: SearchBookFieldsType | SearchRatingFieldsType
) => {
  return Object.entries(search).some(([, { field }]) => {
    if (typeof field === 'string') {
      return field.length === 1 || field.length > 255;
    }
    return false;
  })
    ? (toast.warn(
        'Searchable fields must be between 2 and 255 characters length!'
      ),
      false)
    : true;
};

export default validateSearch;
