import { SearchBooksFieldsType } from '@/types/SearchFields';
import { toast } from 'react-toastify';

const validateSearch = (search: SearchBooksFieldsType) => {
  if (
    (Object.keys(search) as Array<keyof SearchBooksFieldsType>).some(
      (key) => search[key].length === 1 || search[key].length > 255
    )
  ) {
    toast.warn(
      'Searchable fields must be between 2 and 255 characters length!'
    );
    return false;
  }

  return true;
};

export default validateSearch;
