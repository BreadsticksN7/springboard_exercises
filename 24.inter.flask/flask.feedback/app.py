from flask import Flask, render_template, redirect, session
from models import connect_db, db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm, FeedbackUpdateForm
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import Unauthorized

from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__, template_folder="templates")
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///flaskfeedback_db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True

# Debug Toolbar
app.config["SECRET_KEY"] = "flaskfeedback"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)
# Debug Toolbar

connect_db(app)
db.create_all()


# Home and 404 route
@app.route('/')
def home_page():
    feedback = Feedback.query.all()
    return render_template('index.html', feedback=feedback)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


# Registration
@app.route('/register', methods=["GET", "POST"])
def register_user():
    """Create new user form"""
    form = RegisterForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        new_user = User.register(username, password, email, first_name, last_name)
        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append("Username taken.")
            return render_template('/users/register.html', form=form)

        session['username'] = new_user.username

        return redirect('/')
    else:
        return render_template('/users/register.html', form=form)


# Login / Logout Routes
@app.route('/login', methods=["GET", "POST"])
def login_user():
    """Login user form"""
    if 'username' in session:
        return redirect(f'/users/{session["username"]}')
    
    form = LoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)

        if user:
            session['username'] = user.username
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ["Incorrect username or password"]
            return render_template('/users/login.html', form=form)
    
    return render_template('/users/login.html', form=form)

@app.route('/logout')
def logout_user():
    session.pop('username')
    return redirect('/login')


# User Routes
@app.route('/users/<username>')
def users_page(username):
    """User profile"""
    if 'username' not in session or username != session['username']:
        raise Unauthorized()

    users = User.query.get(username)
    feedback = Feedback.query.all()
    return render_template('/users/user.html', users=users, feedback=feedback)

@app.route('/users/<username>/delete', methods=["POST"])
def delete_user(username):
    """Delete user profile"""
    if 'username' not in session or username != session['username']:
        raise Unauthorized()

    users = User.query.get(username)

    db.session.delete(users)
    db.session.commit()
    session.pop('username')

    return redirect('/')


# Feedback Routes
@app.route('/users/<username>/feedback/add', methods=["GET", "POST"])
def add_feedback(username):
    """Add user feedback form"""
    if 'username' not in session or username != session['username']:
        raise Unauthorized()

    form = FeedbackForm()
    
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
    
        new_feed = Feedback(title=title, content=content, username=username)
        db.session.add(new_feed)
        db.session.commit()

        return redirect(f'/users/{new_feed.username}')
    else:
        return render_template('/feedback/feedback.html', form=form)

@app.route('/feedback/<int:feedback_id>/update', methods=["GET", "POST"])
def update_feedback(feedback_id):
    """Update feedback form"""
    feedback = Feedback.query.get_or_404(feedback_id)

    if 'username' not in session or feedback.username != session['username']:
        raise Unauthorized()
    
    form = FeedbackUpdateForm(obj=feedback)
    
    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data

        db.session.commit()

        return redirect(f'/users/{feedback.username}')
    else:
        return render_template('/feedback/update.html', form=form, feedback=feedback)

@app.route('/feedback/<int:feedback_id>/delete', methods=["POST"])
def delete_feedback(feedback_id):
    """Delete feedback"""
    feedback = Feedback.query.get_or_404(feedback_id)
    
    if 'username' not in session or feedback.username != session['username']:
        raise Unauthorized()
    
    db.session.delete(feedback)
    db.session.commit()

    return redirect(f'/users/{feedback.username}')