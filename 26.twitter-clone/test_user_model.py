"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase
from sqlalchemy import exc

from models import db, User, Message, Follows

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler_test"


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()


class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()
        Follows.query.delete()

        user1 = User.signup("User1", "user@user.com", "nopass", None)
        userId1 = 1
        user1.id = userId1

        user2 = User.signup("User2", "super@user.com", "nopass", None)
        userId2 = 2
        user2.id = userId2

        db.session.commit()
        user1 = User.query.get(userId1)
        user2 = User.query.get(userId2)

        self.user1 = user1
        self.userId1 = userId1
        self.user2 = user2
        self.userId2 = userId2


        self.client = app.test_client()
    
    def tearDown(self):
        res = super().tearDown()
        db.session.rollback()
        return res

    def test_user_model(self):
        """Does basic model work?"""

        u = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD"
        )

        db.session.add(u)
        db.session.commit()

        # User should have no messages & no followers
        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)
    
    def test_user_follows(self):
        self.user1.following.append(self.user2)
        db.session.commit()

        self.assertEqual(len(self.user2.following), 0)
        self.assertEqual(len(self.user2.followers), 1)
        self.assertEqual(len(self.user1.followers), 0)
        self.assertEqual(len(self.user1.following), 1)

        self.assertEqual(self.user2.followers[0].id, self.user1.id)
        self.assertEqual(self.user1.following[0].id, self.user2.id)

    def test_is_following(self):
        self.user1.following.append(self.user2)
        db.session.commit()
        
        self.assertTrue(self.user1.is_following(self.user2))
        self.assertFalse(self.user2.is_following(self.user1))
    
    def test_is_followed_by(self):
        self.user1.following.append(self.user2)
        db.session.commit()

        self.assertTrue(self.user2.is_followed_by(self.user1))
        self.assertFalse(self.user1.is_followed_by(self.user2))

    
    def test_valid_signup(self):
        u_test = User.signup("user", "test@user.com", "nopass", None)
        userId = 900
        u_test.id = userId
        db.session.commit()

        u_test = User.query.get(userId)
        self.assertIsNotNone(u_test)
        self.assertEqual(u_test.username, "user")
        self.assertEqual(u_test.email, "test@user.com")
        self.assertNotEqual(u_test.password, "nopass")
        self.assertTrue(u_test.password.startswith("$2b$"))
    
    def test_invalid_username_signup(self):
        invalid = User.signup(None, "testing@user.com", "nopass", None)
        userId = 99
        invalid.id = userId
        with self.assertRaises(exc.IntegrityError) as context:
            db.session.commit()
    
    def test_invalid_email_signup(self):
        invalid = User.signup("user", None, "nopass", None)
        userId = 999
        invalid.id = userId
        with self.assertRaises(exc.IntegrityError) as context:
            db.session.commit()
    
    def test_invalid_password_signup(self):
        with self.assertRaises(ValueError) as context:
            User.signup("testtest", "email@email.com", "", None)
        
        with self.assertRaises(ValueError) as context:
            User.signup("testtest", "email@email.com", None, None)
    

    def test_invalid_authentication(self):
        user = User.authenticate(self.user1.username, "nopass")
        self.assertIsNotNone(user)
        self.assertEqual(user.id, self.userId1)
    
    def test_invalid_username(self):
        self.assertFalse(User.authenticate("whatever", "nopass"))

    def test_wrong_password(self):
        self.assertFalse(User.authenticate(self.user1.username, "pass"))