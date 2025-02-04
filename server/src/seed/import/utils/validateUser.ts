export default (name: string): string => {
  if (!name || typeof name !== 'string') {
    return '';
  }
  let cleanedName = name.replace(/[^a-zA-Z\s_@-]/g, '');
  cleanedName = cleanedName.replace(/-/g, ' ');
  cleanedName = cleanedName.replace(/\s+/g, ' ');
  cleanedName = cleanedName.replace(/\u00A0/g, ' ');
  cleanedName = cleanedName.replace(
    /([a-zA-Z])([\s_@-]+)([a-zA-Z])/g,
    (_, before, separator, after) => {
      if (separator.trim().length > 1) {
        return `${before} ${after}`;
      }
      return `${before}${separator}${after}`;
    }
  );
  cleanedName = cleanedName.trim();
  return cleanedName;
};
