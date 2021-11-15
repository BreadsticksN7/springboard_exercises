from models import User, Post, db
from app import app

# Create tables
db.drop_all()
db.create_all()

# Empty existing tables
User.query.delete()
Post.query.delete()

# Add users
shepard = User(first_name='Jane', last_name='Shepard')
liara = User(first_name='Liara', last_name='Tsoni')
garrus = User(first_name='Garrus', last_name='Vakarian')
tali = User(first_name='Tali', last_name='Zorah')

# Add posts
post1 = Post(title='First post!', content="I'm Commander Shepard and this is my favorite post on the Citadel", user_id=1)
post2 = Post(title='Citadel Visit', content="You owe me a rematch.  You know where.", user_id=3)
post3 = Post(title='Prothean Ruins', content="Anyone know of any ruins to explore?", user_id=2)
post4 = Post(title='Flotilla Equipment', content="Looking to pick up some extra air filters if anyone has spares.", user_id=4)

# Add users to session and commit
db.session.add_all([shepard, liara, garrus, tali])
db.session.commit()

db.session.add_all([post1, post2, post3, post4])
db.session.commit()