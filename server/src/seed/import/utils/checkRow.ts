const checkRow = (
  row: any,
  fieldObject: any,
  title: string,
  requiredTitle: boolean = false
) => {
  for (const { field, maxLength } of fieldObject) {
    if (row[field]?.length > maxLength) {
      console.error(
        `${title} Error: Field "${field}" invalid length (${row[field].length}).`
      );
      return false;
    }
  }

  if (requiredTitle && !row.Title) {
    console.error(`${title} Error: Missing or empty "Title" field!`);
    return false;
  }

  return true;
};

export const checkBooksAndCategiries = (row: any) => {
  const fieldValidations = [
    { field: 'Title', maxLength: 255 },
    { field: 'authors', maxLength: 235 },
    { field: 'image', maxLength: 255 },
    { field: 'publisher', maxLength: 255 },
    { field: 'publishedDate', maxLength: 50 },
    { field: 'infoLink', maxLength: 255 },
    { field: 'categories', maxLength: 255 },
  ];

  return checkRow(row, fieldValidations, 'BooksAndCategiries', true);
};

export const checkRatingRow = (row: any) => {
  const fieldValidations = [
    { field: 'Id', maxLength: 50 },
    { field: 'User_id', maxLength: 255 },
    { field: 'profileName', maxLength: 255 },
    { field: 'review/helpfulness', maxLength: 255 },
    { field: 'review/score', maxLength: 5 },
    { field: 'review/summary', maxLength: 255 },
  ];

  return checkRow(row, fieldValidations, 'Rating', true);
};
