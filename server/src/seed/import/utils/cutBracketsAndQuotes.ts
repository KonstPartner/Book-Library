export default (str: string) => {
  return str.replace(/^\['|'\]$/g, '').replace(/'\s*,\s*'/g, ', ');
};
