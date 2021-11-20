from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, TextAreaField, BooleanField
from wtforms.validators import InputRequired, Optional, NumberRange

class PetForm(FlaskForm):
    name = StringField('Name', validators=[InputRequired(message="A pet name is required.")])
    species = SelectField('Species', choices=[("cat", "Cat"), ("dog", "Dog"), ("porcupine", "Porcupine")])
    age = IntegerField("Age", validators=[Optional(), NumberRange(min=0, max=30, message="Please select between 0 and 30.")])
    photo_url = StringField('Photo url', validators=[Optional()])
    notes = TextAreaField('Notes', validators=[Optional()])

class PetEdit(FlaskForm):
    photo_url = StringField('Photo url', validators=[Optional()])
    notes = TextAreaField('Notes', validators=[Optional()])
    available = BooleanField('Available')