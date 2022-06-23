"""Boggle word check.

Given a 5x5 boggle board, see if you can find a given word in it.

In Boggle, you can start with any letter, then move in any NEWS direction.
You can continue to change directions, but you cannot use the exact same
tile twice.

So, for example::

    N C A N E
    O U I O P
    Z Q Z O N
    F A D P L
    E D E A Z

In this grid, you could find `NOON* (start at the `N` in the top
row, head south, and turn east in the third row). You cannot find
the word `CANON` --- while you can find `CANO` by starting at the
top-left `C`, you can 't re-use the exact same `N` tile on the
front row, and there's no other `N` you can reach.

For example::

    >>> board = make_board('''
    ... N C A N E
    ... O U I O P
    ... Z Q Z O N
    ... F A D P L
    ... E D E A Z
    ... ''')

`NOON` should be found (0, 3) -> (1, 3) -> (2, 3) -> (2, 4)::

    >>> find(board, "NOON")
    True

`NOPE` should be found (0, 3) -> (1, 3) -> (1, 4) -> (0, 4)::

    >>> find(board, "NOPE")
    True

`CANON` can't be found (`CANO` starts at (0, 1) but can't find
the last `N` and can't re-use the N)::

    >>> find(board, "CANON")
    False

You cannot travel diagonally in one move, which would be required
to find `QUINE`::

    >>> find(board, "QUINE")
    False

We can recover if we start going down a false path (start 3, 0)::

    >>> find(board, "FADED")
    True


An extra tricky case --- it needs to find the `N` toward the top right,
and then go down, left, up, up, right to find all four `O`s and the `S`::

    >>> board2 = make_board('''
    ... E D O S Z
    ... N S O N R
    ... O U O O P
    ... Z Q Z O R
    ... F A D P L
    ... ''')

    >>> find(board2, "NOOOOS")
    True

"""


def make_board(board_string):
    """Make a board from a string.

    For example::

        >>> board = make_board('''
        ... N C A N E
        ... O U I O P
        ... Z Q Z O N
        ... F A D P L
        ... E D E A Z
        ... ''')

        >>> len(board)
        5

        >>> board[0]
        ['N', 'C', 'A', 'N', 'E']
    """

    letters = board_string.split()

    board = [
        letters[0:5],
        letters[5:10],
        letters[10:15],
        letters[15:20],
        letters[20:25],
    ]

    return board


# START SOLUTION


def find_from(board, word, y, x, seen):
    """Can we find a word on board, starting at x, y?"""

    # This is called recursively to find smaller and smaller words
    # until all tries are exhausted or until success.

    # Base case: this isn't the letter we're looking for.

    if board[y][x] != word[0]:
        print("%-6s%d,%d  %-3s%-8s%-30s" % ("NO", y, x, board[y][x], word,
                                            seen))
        return False

    # Base case: we've used this letter before in this current path

    if (y, x) in seen:
        print("%-6s%d,%d  %-3s%-8s%-30s" % ("SEEN", y, x, board[y][x], word,
                                            seen))
        return False

    # Base case: we are down to the last letter --- so we win!

    if len(word) == 1:
        print("%-6s%d,%d  %-3s%-8s%-30s" % ("WIN", y, x, board[y][x], word,
                                            seen))
        return True

    # Otherwise, this letter is good, so note that we've seen it,
    # and try of all of its neighbors for the first letter of the
    # rest of the word

    print("%-6s%d,%d  %-3s%-8s%-30s" % ("OK", y, x, board[y][x], word, seen))

    # This next line is a bit tricky: we want to note that we've seen the
    # letter at this location. However, we only want the child calls of this
    # to get that, and if we used `seen.add(...)` to add it to our set,
    # *all* calls would get that, since the set is passed around. That would
    # mean that once we try a letter in one call, it could never be tried again,
    # even in a totally different path. Therefore, we want to create a *new*
    # seen set that is equal to this set plus the new letter. Being a new
    # object, rather than a mutated shared object, calls that don't descend
    # from us won't have this `y,x` point in their seen.
    #
    # To do this, we use the | (set-union) operator, read this line as
    # "rebind seen to the union of the current seen and the set of point(y,x))."
    #
    # (this could be written with an augmented operator as "seen |= {(y, x)}",
    # in the same way "x = x + 2" can be written as "x += 2", but that would seem
    # harder to understand).

    seen = seen | {(y, x)}

    if y > 0:
        if find_from(board, word[1:], y - 1, x, seen):
            return True

    if y < 4:
        if find_from(board, word[1:], y + 1, x, seen):
            return True

    if x > 0:
        if find_from(board, word[1:], y, x - 1, seen):
            return True

    if x < 4:
        if find_from(board, word[1:], y, x + 1, seen):
            return True

    # Couldn't find the next letter, so this path is dead

    return False


# END SOLUTION


def find(board, word):
    """Can word be found in board?"""

    # START SOLUTION

    print("%-6s%s,%s  %-3s%-8s%-30s" % ("out", "y", "x", "bd", "word", "seen"))

    # Find starting letter --- try every spot on board and,
    # win fast, should we find the word at that place.

    for y in range(0, 5):
        for x in range(0, 5):
            if find_from(board, word, y, x, seen=set()):
                return True

    # We've tried every path from every starting square w/o luck.
    # Sad panda.

    return False

    # END SOLUTION


if __name__ == '__main__':
    import doctest
    if doctest.testmod().failed == 0:
        print("\n*** ALL TESTS PASSED; YOU FOUND SUCCESS! ***\n")
