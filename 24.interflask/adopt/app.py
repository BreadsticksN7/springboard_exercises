from flask import Flask, render_template, redirect, flash
from models import db, connect_db, Pet
from forms import PetForm, PetEdit

# Toolbar -- DELETE
from flask_debugtoolbar import DebugToolbarExtension
# Toolbar -- DELETE

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt_pet'
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
    return render_template('404.html'), 404

@app.route('/')
def home():
    pets = Pet.query.all()
    return render_template('index.html', pets=pets)

#Pet Routes
#Pet Routes

@app.route('/pets/add', methods=["GET", "POST"])
def add_pet():
    form = PetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        age = form.age.data
        photo_url = form.photo_url.data
        notes = form.notes.data
        
        new_pet = Pet(name=name, species=species, age=age, photo_url=photo_url, notes=notes)
        
        db.session.add(new_pet)
        db.session.commit()

        flash(f"Added {name} the {species}.")
        return redirect('/')
    else:
        return render_template('pet_add.html', form=form)

@app.route('/pets/<int:pet_id>/edit', methods=["GET", "POST"])
def show_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    form = PetEdit(obj=pet)
    
    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data

        db.session.commit()

        flash(f"Updated {pet.name}")
        return render_template('/')
    else:
        return render_template('pet_edit.html', pet=pet, form=form)