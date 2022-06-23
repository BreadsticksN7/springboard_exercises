/* is_valid(s) - is this a valid split square? */

function is_valid(s) {
  if (s === 0 || s === 1) {
    return true;
  }

  if (Array.isArray(s) && s.length === 4) {
    // Array.every(fn) = for every item in array, is fn(item) true?
    return s.every(is_valid);
  }

  return false;
}
