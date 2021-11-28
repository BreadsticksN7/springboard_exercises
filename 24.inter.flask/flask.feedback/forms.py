from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, EmailField, TextAreaField
from wtforms.validators import InputRequired, Length


class RegisterForm(FlaskForm):
    """User Registration"""
    username = StringField("Username", validators=[InputRequired(), Length(min=1, max=20)])
    password = PasswordField("Password", validators=[InputRequired(), Length(min=6, max=50)])
    email = EmailField("Email", validators=[InputRequired(), Length(max=50)])
    first_name = StringField("First Name", validators=[InputRequired(), Length(max=50)])
    last_name = StringField("Last Name", validators=[InputRequired(), Length(max=50)])


class LoginForm(FlaskForm):
    username = StringField("Username", validators=[InputRequired(), Length(min=1, max=20)])
    password = PasswordField("Password", validators=[InputRequired(), Length(min=1, max=50)])


class FeedbackForm(FlaskForm):
    title = StringField("Title", validators=[InputRequired(), Length(max=100)])
    content = TextAreaField("Content", validators=[InputRequired()])

class FeedbackUpdateForm(FlaskForm):
    title = StringField("Title", validators=[InputRequired(), Length(max=100)])
    content = TextAreaField("Content", validators=[InputRequired()])