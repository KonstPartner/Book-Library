const HighlightText = ({
  text,
  searchText,
}: {
  text: string;
  searchText: string | undefined | null;
}) => {
  if (!searchText || !text) return text;

  const regex = new RegExp(`(${searchText})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === searchText.toLowerCase() ? (
          <span
            key={index}
            className="bg-yellow-300 dark:bg-yellow-500 text-white"
          >
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

export default HighlightText;
