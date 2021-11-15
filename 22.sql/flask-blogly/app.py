from flask import Flask, render_template, request, redirect, flash
from models import db, connect_db, User, Post

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

@app.errorhandler(404)
def page_not_found(e):
    """404 error page"""
    return render_template('404.html'), 404

@app.route('/')
def home():
    user = User.query.all()
    posts = Post.query.all()
    return render_template('index.html', posts=posts, user=user)

# Users
# Users

@app.route('/users')
def user_list():
    """Shows a list of users currently in db"""
    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template('user_list.html', users=users)

@app.route('/add', methods=["GET"])
def add_user_form():
    """Show form to add user"""
    return render_template('user_new.html')

@app.route('/add', methods=["POST"])
def add_user():
    """Submit form to add new user"""
    new_user = User(
        first_name = request.form['first_name'], 
        last_name = request.form['last_name'], 
        image_url = request.form['image_url'] or None
        )
    db.session.add(new_user)
    db.session.commit()
    flash(f"{new_user.full_name} was added.")
    return redirect('/users')

@app.route('/user/<int:user_id>')
def show_user(user_id):
    """Show user profile"""
    user = User.query.get_or_404(user_id)
    return render_template('user_details.html', user=user)

@app.route('/user/<int:user_id>/edit')
def edit_user(user_id):
    """Load edit options for user profile"""
    user = User.query.get_or_404(user_id)
    return render_template('user_edit.html', user=user)

@app.route('/user/<int:user_id>/edit', methods=["POST"])
def update_user(user_id):
    """Submit changes for user profile"""
    user = User.query.get_or_404(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.image_url = request.form['image_url']

    db.session.add(user)
    db.session.commit()
    flash(f"{user.full_name} was updated.")
    return redirect('/users')

@app.route('/user/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    """Delete user profile"""
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    flash(f"{user.full_name} was deleted.")
    return redirect('/users')

# Posts
# Posts

@app.route('/user/<int:user_id>/new_post')
def add_post_form(user_id):
    """Get user posts"""
    user = User.query.get_or_404(user_id)
    return render_template('post_new.html', user=user)

@app.route('/user/<int:user_id>/new_post', methods=["POST"])
def add_posts(user_id):
    """Submit form to add new post"""
    user = User.query.get_or_404(user_id)
    new_post = Post(
        title = request.form['post_title'],
        content = request.form['post_content'],
        user = user
    )
    db.session.add(new_post)
    db.session.commit()
    flash(f"{new_post.title} was added.")
    return redirect(f"/user/{user_id}")

@app.route('/post/<int:post_id>')
def show_post(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template('post_details.html', post=post)

@app.route('/post/<int:post_id>/edit')
def edit_post(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template('post_edit.html', post=post)

@app.route('/post/<int:post_id>/edit', methods=["POST"])
def edit_post_form(post_id):
    post = Post.query.get_or_404(post_id)
    post.title = request.form['post_title'],
    post.content = request.form['post_content']

    db.session.add(post)
    db.session.commit()
    flash(f"{post.title} was updated.")
    return redirect(f"/user/{post.user_id}")

@app.route('/post/<int:post_id>/delete', methods=["POST"])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    
    db.session.delete(post)
    db.session.commit()
    flash(f"{post.title} has been deleted.")
    return redirect(f"/user/{post.user_id}")