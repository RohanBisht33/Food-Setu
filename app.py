import joblib
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# load the trained model
model = joblib.load("food_waste_model.pkl")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    food_cooked = float(request.form["food_cooked"])
    prediction = model.predict([[food_cooked]])[0]
    return render_template("index.html", prediction=f"Food Saved: {prediction:.2f}")

if __name__ == "__main__":
    app.run(debug=True)
