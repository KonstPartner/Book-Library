const bookInputFields = [
  'title',
  'description',
  'author',
  'image',
  'publisher',
  'publishedDate',
  'infoLink',
  'category',
] as const;

const ratingInputFields = [
  'user',
  'reviewScore',
  'reviewSummary',
  'reviewText',
];

export { bookInputFields, ratingInputFields };
