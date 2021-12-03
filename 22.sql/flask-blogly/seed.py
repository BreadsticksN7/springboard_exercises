from models import User, Post, Tag, PostTag, db
from app import app

# Create tables
db.drop_all()
db.create_all()

# Empty existing tables
PostTag.query.delete()
Post.query.delete()
User.query.delete()
Tag.query.delete()

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

# Add Tags
tag1 = Tag(tag_name='Normandy')
tag2 = Tag(tag_name='Citadel')
tag3 = Tag(tag_name='Whatever')

# Add Post Tags
ptag1 = PostTag(post_id = 1, tag_id = 2)
ptag2 = PostTag(post_id = 2, tag_id = 3)
ptag3 = PostTag(post_id = 3, tag_id = 1)

# Add users to session and commit
db.session.add_all([shepard, liara, garrus, tali])
db.session.commit()

db.session.add_all([post1, post2, post3, post4])
db.session.commit()

db.session.add_all([tag1, tag2, tag3])
db.session.commit()

db.session.add_all([ptag1, ptag2, ptag3])
db.session.commit()