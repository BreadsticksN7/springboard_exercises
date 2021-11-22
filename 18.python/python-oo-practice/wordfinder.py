"""Word Finder: finds random words from a dictionary."""
import random

class WordFinder:
    """Reads from dictionary file to pull random words"""
    def __init__(self, path):
        """Reads the file and identifies number of words read"""
        dict_file = open(path)
        self.words = self.parse(dict_file)
        print(f"{len(self.words)} words read")
    def parse(self, dict_file):
        """Parses file for a list of words"""
        return [w.strip() for w in dict_file]
    def random(self):
        """Randomly selects a word from file"""
        return random.choice(self.words)

class SpecialWordFinder(WordFinder):
    def parse(self, dict_file):
        """Parses file to ignore comments"""
        return [w.strip() for w in dict_file if w.strip() and not w.startswith("#")]