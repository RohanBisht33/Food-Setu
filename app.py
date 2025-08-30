from flask import Flask, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load trained model
model = joblib.load("food_waste_model.pkl")

@app.route("/predict")
def predict():
    # Predict for Sep–Dec (months 9–12)
    future_months = np.arange(9, 13).reshape(-1, 1)
    predictions = model.predict(future_months)

    data = {
        "months": ["Sep", "Oct", "Nov", "Dec"],
        "predicted": [int(p) for p in predictions]
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
