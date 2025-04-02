const getPrettyField = (input: string): string => {
  const fieldMap: { [key: string]: string } = {
    title: 'Title',
    description: 'Description',
    author: 'Author',
    image: 'Image URL',
    publisher: 'Publisher',
    publishedDate: 'Published Date',
    infoLink: 'More Info URL',
    category: 'Category',
    reviewHelpfulness: 'Helpfulness',
    reviewSummary: 'Title',
    reviewText: 'Opinion',
    user: 'User',
    reviewScore: 'Rating',
  };

  return fieldMap[input] || input;
};

export default getPrettyField;
