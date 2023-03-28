/**
 * Saves value into localStorage, saves JSON object
 * @param param
 * @param value
 */
export const storageSave = (param, value) => {
  localStorage.setItem(param, JSON.stringify(value));
};

/**
 * Gets value from localStorage from a JSON object
 * @param param
 * @returns {any}
 */
export const storageGet = (param) => {
  return JSON.parse(localStorage.getItem(param));
};

/**
 * Deletes value by param from localStorage
 * @param param
 */
export const storageDelete = (param) => {
  localStorage.removeItem(param);
};
