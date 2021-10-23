from boggle import Boggle
from flask import Flask, session, render_template, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config["SECRET_KEY"] = "SamuraiPizzaCats"

debug = DebugToolbarExtension(app)

boggle_game = Boggle()



@app.route("/")
def home():
    board = boggle_game.make_board()
    session["board"] = board
    highscore = session.get("highscore", 0)
    numplays = session.get("numplays", 0)

    return render_template("index.html", board=board, highscore=highscore, numplays=numplays)

@app.route("/checkword")
def checkword():
    word = request.args["word"]
    board = session["board"]
    response = boggle_game.check_valid_word(board, word)

    return jsonify({'result': response})

@app.route("/postscore", methods=["POST"])
def postscore():
    score = request.json["score"]
    highscore = session.get("highscore", 0)
    numplays = session.get("numplays", 0)

    session["numplays"] = numplays + 1
    session["highscore"] = max(score, highscore)

    return jsonify(brokeRecord=score > highscore)