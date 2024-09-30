from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from flask_cors import CORS
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# Load the dataset once at startup
df = pd.read_csv("../ML/Akhil Price Prediction Model/Price_Agriculture_commodities_Week.csv")

def calculate_crop_price(crop_name, prediction_date_str):
    """
    Predicts the modal price of a specific crop for a given date.
    
    Args:
        crop_name: The name of the crop to predict.
        prediction_date_str: The date for which to predict the price (in 'YYYY-MM-DD' format).
    
    Returns:
        The predicted modal price.
    """
    try:
        prediction_date = datetime.strptime(prediction_date_str, '%Y-%m-%d').date()
    except ValueError:
        print("Invalid date format. Please use YYYY-MM-DD.")
        return None

    crop_data = df[df['Commodity'] == crop_name].copy()
    if crop_data.empty:
        print(f"No data found for crop: {crop_name}")
        return None

    # Convert 'Arrival_Date' to datetime objects
    crop_data['Arrival_Date'] = pd.to_datetime(crop_data['Arrival_Date'])

    # Extract numerical features (e.g., day of year)
    crop_data['DayOfYear'] = crop_data['Arrival_Date'].dt.dayofyear

    # Create a Linear Regression model
    X = crop_data[['DayOfYear']]
    y = crop_data['Modal Price']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = LinearRegression()
    model.fit(X_train, y_train)

    # Predict for the given date
    day_of_year = prediction_date.timetuple().tm_yday
    predicted_price = model.predict([[day_of_year]])

    return predicted_price[0]

# API endpoint to predict crop recommendations
@app.route('/predict_crop_recommend', methods=['POST'])
def predict_crop_recommend():
    dataset_crop_recommend = pd.read_csv('../ML/crop_recommendation/Crop_recommendation.csv')

    X = dataset_crop_recommend.iloc[:, :-1].values
    y = dataset_crop_recommend.iloc[:, -1].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

    classifier = RandomForestClassifier(n_estimators=10, criterion='entropy', random_state=0)
    classifier.fit(X_train, y_train)

    data = request.json
    user_input = np.array([[data['n'], data['p'], data['k'], data['t'], data['h'], data['ph'], data['r']]])
    prediction = classifier.predict(user_input)
    return jsonify({'prediction': str(prediction[0])})

# API endpoint to predict crop prices
@app.route('/predict_crop_price', methods=['POST'])
def predict_crop_price_api():
    data = request.get_json()
    crop_name = data['crop_name']
    prediction_start_date = data['prediction_date']
    print(crop_name, prediction_start_date)

    # Get predictions for the next 7 days
    predictions = {}
    try:
        for i in range(7):
            current_date = datetime.strptime(prediction_start_date, '%Y-%m-%d') + timedelta(days=i)
            predicted_price = calculate_crop_price(crop_name, current_date.strftime('%Y-%m-%d'))
            predictions[current_date.strftime('%Y-%m-%d')] = predicted_price
    except Exception as e:
        return jsonify({'error': str(e)}), 400

    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True)
