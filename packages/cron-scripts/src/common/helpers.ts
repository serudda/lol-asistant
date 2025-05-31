/**
 * Normalize a string to a slug.
 *
 * - replace special characters from a string.
 *
 * @function
 * @param {string} str - string to parse.
 * @returns {string} string parsed (e.g. Fabula Nino)
 * @use - normalizeStringToSlug('Fábula Niño');
 */
export const normalizeStringToSlug = (str: string) => {
  // VARIABLES
  const from = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
  const to = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
  const mapping: Record<string, string> = {};
  for (let i = 0; i < from.length; i++) {
    mapping[from.charAt(i)] = to.charAt(i);
  }
  const ret = [];
  for (let i = 0; i < str.length; i++) {
    const c = str.charAt(i);
    if (Object.prototype.hasOwnProperty.call(mapping, str.charAt(i))) {
      ret.push(mapping[c]);
    } else {
      ret.push(c);
    }
  }
  // Join characters back together and remove any character that is not an
  // alphanumeric one. That means we strip punctuation AND spaces so that
  // "Kha'Zix" -> "KhaZix" and "Dr. Mundo" -> "DrMundo".
  return ret
    .join('')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
};

/**
 * Parse a percentage string to a number. Example: "48.0%"
 * or "48.0" becomes 48.0.
 */
export const normalizePercentage = (value: string): number | null => {
  const cleaned = value.replace('%', '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
};
