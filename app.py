from flask import Flask, render_template

app = Flask(__name__)
app.config['SECRET_KEY'] = 'turboagro-secret-key'

@app.route('/')
def index():
    return render_template('public/index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/users')
def users():
    return render_template('users.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/pricing')
def pricing():
    return render_template('pricing.html')

@app.route('/team')
def team():
    return render_template('team.html')

@app.route('/contact')
def contact():
    return render_template('public/contact.html')

@app.route('/inicio')
def inicio():
    return render_template('index.html')

@app.route('/precos')
def precos():
    return render_template('public/pricing.html')

@app.route('/equipe')
def equipe():
    return render_template('public/team.html')

if __name__ == '__main__':
    app.run()