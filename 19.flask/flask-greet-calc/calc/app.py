from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)

@app.route('/add')
def math_add():
    """Perform addition fn(a, b)"""
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    results = add(a,b)
    return str(results)

@app.route('/sub')
def math_sub():
    """Perform subtraction fn(a, b)"""
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    results = sub(a,b)
    return str(results)

@app.route('/mult')
def math_mult():
    """Perform multiplication fn(a, b)"""
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    results = mult(a,b)
    return str(results)

@app.route('/div')
def math_div():
    """Perform division fn(a, b)"""
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    results = div(a,b)
    return str(results)


operation = {
    "add": add,
    "sub": sub,
    "mult": mult,
    "div": div,
}
@app.route('/math/<fn>')
def math_op(fn):
    """Perform math operation(a, b) based on route"""
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    results = operation[fn](a,b)
    return str(results)