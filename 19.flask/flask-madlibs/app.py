from flask import Flask, request, render_template
from stories import stories

app = Flask(__name__)

@app.route("/")
def story_pick():
    return render_template('selection.html', stories=stories.values())

@app.route("/form")
def story_form():
    story_id = request.args["story_id"]
    story = stories[story_id]
    prompts = story.prompts
    return render_template('form.html', prompts=prompts, story_id=story_id, title=story.title)

@app.route("/story")
def story_page():
    story_id = request.args["story_id"]
    story = stories[story_id]
    text = story.generate(request.args)
    
    return render_template('story.html', text=text, title=story.title)