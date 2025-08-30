from flask import Flask, request, render_template_string
import pickle

app = Flask(__name__, template_folder='.')

import joblib  

# load
model = joblib.load("food_waste_model.pkl")


@app.route('/')
def home():
    with open("index.html", "r") as f:
        return f.read()

@app.route('/predict', methods=['POST'])
def predict():
    food_cooked = float(request.form['food_cooked'])
    prediction = model.predict([[food_cooked]])[0]
    return f"Prediction: {prediction}"

if __name__ == '__main__':
    app.run(debug=True)
