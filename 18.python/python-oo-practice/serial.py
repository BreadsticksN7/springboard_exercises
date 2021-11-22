"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start=0):
        """Creates initial generator"""
        self.start = self.next = start
    def __repr__(self):
        """Returns values"""
        return f"{self.start} and {self.next}"
    def gen(self):
        """Increments values"""
        self.next += 1
        return self.next - 1
    def reset(self):
        """Resets value"""
        self.next = self.start