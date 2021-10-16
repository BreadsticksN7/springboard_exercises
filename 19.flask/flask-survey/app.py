from flask import Flask, request, render_template, redirect, flash, session
from surveys import satisfaction_survey as survey

app = Flask(__name__)
app.config['SECRET_KEY'] = "ninja_turtles_rock!"

responses_key = "responses"

@app.route("/")
def survey_home():
    return render_template('survey.html', survey=survey)

@app.route("/start", methods=["POST"])
def survey_start():
    session[responses_key] = []
    return redirect('/questions/0')

@app.route("/questions/<int:qid>")
def survey_question(qid):
    responses = session.get(responses_key)

    if (responses is None):
        return redirect("/")
    if (len(responses) == len(survey.questions)):
        return redirect("/finish")
    if (len(responses) != qid):
        flash(f"Invalid id: {qid}")
        return redirect(f"/questions/{len(responses)}")

    question = survey.questions[qid]
    return render_template('question.html', question_num=qid, question=question, survey=survey)

@app.route("/answer", methods=["POST"])
def survey_answer():
    choice = request.form['answer']
    responses = session[responses_key]
    responses.append(choice)
    session[responses_key] = responses

    if (len(responses) == len(survey.questions)):
        return redirect("/finish")
    else:
        return redirect(f"/questions/{len(responses)}")

@app.route("/finish")
def survey_finish():
    return render_template('finish.html', survey=survey)