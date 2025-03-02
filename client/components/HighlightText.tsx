const HighlightText = ({
  text,
  searchText,
  highlightClass,
}: {
  text: string;
  searchText: string | undefined | null;
  highlightClass: string;
}) => {
  if (!searchText || !text) return text;

  const regex = new RegExp(`(${searchText})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === searchText.toLowerCase() ? (
          <span key={index} className={highlightClass}>
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
