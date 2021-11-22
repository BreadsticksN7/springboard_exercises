from models import Pet, db
from app import db

db.drop_all()
db.create_all()

Pet.query.delete()

turtle = "https://www.freeiconspng.com/uploads/turtle-png-13.png"
rabbit = "https://www.freeiconspng.com/uploads/single-rabbit-png-2.png"
rat = "https://www.freeiconspng.com/uploads/download-big-image-png-medium-image-png-small-image-png-microsoft--12.png"


leo = Pet(name='Leo', species='Turtle', photo_url=turtle)
raph = Pet(name='Rapheal', species='Turtle', photo_url=turtle)
splinter = Pet(name='Splinter', species='Rat', photo_url=rat)
yoji = Pet(name='Yojimbo', species='Rabbit', photo_url=rabbit)

db.session.add_all([leo, raph, splinter, yoji])
db.session.commit()