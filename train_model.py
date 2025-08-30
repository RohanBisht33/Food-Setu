import pandas as pd
import joblib
from sklearn.linear_model import LinearRegression

# ===== Dummy Data =====
# Let's assume: feature = amount of food cooked, label = food saved from waste
data = {
    "food_cooked": [100, 200, 300, 400, 500, 600, 700],
    "food_saved":  [90, 180, 250, 330, 410, 500, 580]
}

df = pd.DataFrame(data)

X = df[["food_cooked"]]  # Features
y = df["food_saved"]     # Labels

# ===== Train a Simple Model =====
model = LinearRegression()
model.fit(X, y)

# ===== Save Model =====
joblib.dump(model, "food_waste_model.pkl")

print("✅ Model trained and saved as food_waste_model.pkl")
