"""Validate that a given square is valid.

Checks that this is either a simple square (``0`` or ``1``), or
a split square (a list of 4 items, each being a simple square or
a split square).

A simple square is valid::

    >>> validate(0)
    True

A split square of four simple filled squares is valid::

    >>> validate([1, 1, 1, 1])
    True

We can nest split and simple squares::

    >>> validate([1, 0, [1, [0, 0, 0, 0], 1, [1, 1, 1, 1]], 1])
    True

    >>> validate([1, [1, 0, 1, [0, [0, 0, 0, 0], 1, 1]], [1, 0, 1, 0], 1])
    True

Simple squares must be either 0 (empty) or 1 (filled)::

    >>> validate(2)
    False

Split squares must contain exactly four parts::

    >>> validate([1, 1, 1, 1, 1])
    False

    >>> validate([1, 0, [1, [0, 0, 0, 0, 1], 1, [1, 1, 1, 1]], 1])
    False

    >>> validate([1, [1, 0, 1, [0, [0, 0, 0], 1, 1]], [1, 0, 1, 0], 1])
    False

"""


def validate(s):
    """Validate that a given square is valid.."""

    # START SOLUTION

    # Base case: it's a simple square, so as long as it's either 0 or 1
    # it's valid.

    if type(s) == int:
        return s == 0 or s == 1

    # Base case: if not a list of 4, it's invalid

    if type(s) != list or len(s) != 4:
        return False

    # It's a split square:
    # Recurse intro quadrants and check each, "failing fast".
    #
    # Note: alternately, we could write the rest of this function in
    # one pretty line by using the awesome `all(iterable)` function:
    #
    #   return all(validate(q) for q in s)

    for q in s:
        if not validate(q):
            return False

    return True

    # It's questionable style, as it's probably less readable, but
    # this entire funtion could be written as
    #
    # return (
    #     (type(s) == int and (s == 0 or s == 1)) or
    #     (type(s) == list and
    #         len(s) == 4 and
    #         all(validate(q) for q in s)
    #     )

    # END SOLUTION


if __name__ == "__main__":
    import doctest
    if doctest.testmod().failed == 0:
        print "\n*** ALL TESTS PASS; THAT'S SUPER-VALID WORK!\n"
