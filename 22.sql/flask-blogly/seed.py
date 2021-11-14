from models import User, db
from app import app

# Create tables
db.drop_all()
db.create_all()

# Empty existing tables
User.query.delete()

# Add users
shepard = User(first_name='Jane', last_name='Shepard')
liara = User(first_name='Liara', last_name='Tsoni')
garrus = User(first_name='Garrus', last_name='Vakarian')
tali = User(first_name='Tali', last_name='Zorah')

# Add to session
db.session.add(shepard)
db.session.add(liara)
db.session.add(garrus)
db.session.add(tali)

# Commit
db.session.commit()