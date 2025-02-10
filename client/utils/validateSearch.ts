import { SearchBooksFieldsType, SearchRatingsFieldsType } from '@/types/SearchFields';
import { toast } from 'react-toastify';

const validateSearch = (search: SearchBooksFieldsType | SearchRatingsFieldsType) => {
  if (
    (Object.keys(search) as Array<keyof typeof search>).some(
      (key) => (search as any)[key].length === 1 || (search as any)[key].length > 255
    )
  ) {
    toast.warn('Searchable fields must be between 2 and 255 characters length!');
    return false;
  }

  return true;
};

export default validateSearch;
