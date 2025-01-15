/**
 * Processes a row object, converting empty strings to `null`.
 *
 * @param {Object} row - The object representing a row of data.
 * @returns {void} - This function modifies the input object in place.
 */
export default (row: any): void => {
  for (const key in row) {
    row[key] = row[key]?.trim() ? row[key] : null;
  }
};
