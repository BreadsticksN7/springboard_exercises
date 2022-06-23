"""Produce new square adding two inputs squares.

Two simple squares can be added::

    >>> s1 = 0
    >>> s2 = 1

    >>> add(s1, s2)
    1

A simple square and a split square can be added::

    >>> s1 = 0
    >>> s2 = [1, 0, 1, 0]

    >>> add(s1, s2)
    [1, 0, 1, 0]

Two split squares can be added::

    >>> s1 = [0, 0, 0, 1]
    >>> s2 = [0, 1, 0, 1]

    >>> add(s1, s2)
    [0, 1, 0, 1]

Nested squares can be added::

    >>> s1 = [0, [1, 1, 1, [0, 0, 0, 0]], [0, 0, 0, 0], 1]
    >>> s2 = [1, [1, 0, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]

    >>> add(s1, s2)
    [1, [1, 1, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]

Unevenly-nested squares can be added::

    >>> s1 = [0, [1, 1, 1, 0           ], [0, 0, 0, 0], 1]
    >>> s2 = [1, [1, 0, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]

    >>> add(s1, s2)
    [1, [1, 1, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]

    >>> s1 = [0, [1, 1, 1, 1                      ], [0, 0, 0, 0], 1]
    >>> s2 = [1, [1, 0, 1, [0, [0, 0, 0, 0], 1, 1]], [1, 0, 1, 0], 1]

    >>> add(s1, s2)
    [1, [1, 1, 1, [1, [1, 1, 1, 1], 1, 1]], [1, 0, 1, 0], 1]
"""


def add(s1, s2):
    """Produce new split square adding two input squares."""

    # START SOLUTION

    # Base case: both are simple filled squares

    if type(s1) == type(s2) == int:
        # Return OR of squares: if either is filled in, it's filled in;
        # otherwise, it's empty
        #
        # Instead of using | operator, could do this directly with:
        # return 0 if (s1 == 0 and s2 == 0) else 1

        return s1 | s2

    # Otherwise, if one is filled square and not a divided square,
    # make a divided square out of it

    if type(s1) == int:
        s1 = [s1, s1, s1, s1]

    if type(s2) == int:
        s2 = [s2, s2, s2, s2]

    # Recursively find sum of four quadrants of both squares
    #
    # zip(s1, s2) is nice --- it takes s1=[1,1,1,1] and s1=[0,0,0,0] and
    # returns list of pairings [(1,0), (1,0), (1,0), (1,0)].
    # Alternatively, you could do this with
    #
    # return [add(s1[i], s2[i]) for i in [0, 1, 2, 3]]

    return [add(q1, q2) for q1, q2 in zip(s1, s2)]

    # END SOLUTION


if __name__ == "__main__":
    import doctest
    if doctest.testmod().failed == 0:
        print "\n*** ALL TESTS PASS; YOU'RE A RECURSION WIZARD!\n"
