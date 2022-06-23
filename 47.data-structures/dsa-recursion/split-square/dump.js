/* dump(s) - returns split square as string */

function dump(s) {
  if (s === 0 || s === 1) {
    return s.toString();
  } else {
    // Array.map(fn) - return new array of [fn(item1), fn(item2), ...]
    return s.map(dump).join(" ");
  }
}

