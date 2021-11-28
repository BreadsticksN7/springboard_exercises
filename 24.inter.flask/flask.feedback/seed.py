from models import db, User, Feedback
from app import db

db.drop_all()
db.create_all()

User.query.delete()
Feedback.query.delete()

shepard = User.register(username='cmdshp', password='n7rules', email='cmdshepard@alliance.com', first_name='Jane', last_name='Shepard')
liara = User.register(username='shadowbroker', password='blip', email='tsoni@broker.com', first_name='Liara', last_name='Tsoni')
garrus = User.register(username='sniperpro', password='headshot!!', email='vakarian@normandy.net', first_name='Garrus', last_name='Vakarian')
tali = User.register(username='tzorah', password='GethSuck', email='zorah@normandy.net', first_name='Tali', last_name='Zorah')

db.session.add_all([shepard, liara, garrus, tali])
db.session.commit()

feed1 = Feedback(title="Spectre's Rock!", content="First human spectre in the house!", username="cmdshp")
feed2 = Feedback(title="Boom!", content="Snagged one!", username="sniperpro")
feed3 = Feedback(title="Ruins?", content="Any recent finds to explore?", username="shadowbroker")

db.session.add_all([feed1, feed2, feed3])
db.session.commit()