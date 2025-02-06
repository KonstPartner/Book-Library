import { SearchBooksFieldsType } from '@/types/SearchFields';
import { toast } from 'react-toastify';

const validateSearch = (search: SearchBooksFieldsType) => {
  if (
    (Object.keys(search) as Array<keyof SearchBooksFieldsType>).some(
      (key) => search[key].length === 1 || search[key].length > 255
    )
  ) {
    toast.warn('Searchable fields must be between 2 and 255 characters length!');
    return false;
  }

  return true;
};

const validateBooksSearch = (search: SearchBooksFieldsType) => {
  if (!validateSearch(search)) {
    return false;
  }

  if(search.publishedDate.length > 50 || /[a-zA-Z]/.test(search.publishedDate)){
    toast.warn('Published date must be less then 50 characters and include only numbers and dashes');
    return false;
  }
  
  return true;
};

export { validateBooksSearch };
