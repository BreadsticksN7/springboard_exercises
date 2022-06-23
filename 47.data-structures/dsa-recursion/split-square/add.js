/* add(s) - add two split squares */

function add(s1, s2) {
  if (Number.isInteger(s1) && Number.isInteger(s2)) {
    // Not || for "logical-or", but | for "bitwise-or"
    //   0|0=0  0|1=1  1|0=1  1|1=1
    return s1 | s2;
  }

  if (Array.isArray(s1) && !Array.isArray(s2)) {
    s2 = [s2, s2, s2, s2];
  }

  if (Array.isArray(s2) && !Array.isArray(s1)) {
    s1 = [s1, s1, s1, s1];
  }

  return [
    add(s1[0], s2[0]),
    add(s1[1], s2[1]),
    add(s1[2], s2[2]),
    add(s1[3], s2[3])
  ];
}
