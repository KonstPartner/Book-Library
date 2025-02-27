const highlightText = (text: string, searchText: string | undefined | null) => {
  if (!searchText || !text) return text;

  const regex = new RegExp(`(${searchText})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === searchText.toLowerCase() ? (
      <span key={index} className="bg-yellow-200 dark:bg-yellow-600">
        {part}
      </span>
    ) : (
      part
    )
  );
};

export default highlightText;
