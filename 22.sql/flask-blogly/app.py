from flask import Flask, render_template, request, redirect
from models import db, connect_db, User

# Toolbar -- DELETE
from flask_debugtoolbar import DebugToolbarExtension
# Toolbar -- DELETE

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

# Toolbar -- DELETE
app.config['SECRET_KEY'] = "totallytubular"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)
# Toolbar -- DELETE

connect_db(app)
# db.create_all()

@app.route('/')
def home():
    return redirect('/users')

@app.route('/users')
def user_list():
    """Shows a list of users currently in db"""
    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template('users.html', users=users)

@app.route('/add', methods=["GET"])
def add_user_form():
    return render_template('add.html')

@app.route('/add', methods=["POST"])
def add_user():
    
    new_user = User(
        first_name = request.form['first_name'], 
        last_name = request.form['last_name'], 
        image_url = request.form['image_url'] or None
        )
    db.session.add(new_user)
    db.session.commit()
    return redirect('/users')

@app.route('/<int:user_id>')
def show_user(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('user.html', user=user)

@app.route('/<int:user_id>/edit')
def edit_user(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('edit.html', user=user)

@app.route('/<int:user_id>/edit', methods=["POST"])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.image_url = request.form['image_url']

    db.session.add(user)
    db.session.commit()
    return redirect('/users')

@app.route('/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect('/users')