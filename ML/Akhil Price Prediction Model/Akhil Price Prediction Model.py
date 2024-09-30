import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta

# Load the dataset
df = pd.read_csv("D:/Personal/others/nibbaproject/web/agri-credit/Akhil Price Prediction Model/Price_Agriculture_commodities_Week.csv")

def predict_crop_price(crop_name, prediction_date_str):
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

def predict_next_7_days(crop_name, prediction_date_str):
    """
    Predicts the modal price of a specific crop for the next 7 days.

    Args:
        crop_name: The name of the crop to predict.
        prediction_date_str: The starting date for predictions (in 'YYYY-MM-DD' format).
    """
    try:
        prediction_date = datetime.strptime(prediction_date_str, '%Y-%m-%d').date()
    except ValueError:
        print("Invalid date format. Please use YYYY-MM-DD.")
        return

    for i in range(7):
        current_date = prediction_date + timedelta(days=i)
        predicted_price = predict_crop_price(crop_name, current_date.strftime('%Y-%m-%d'))
        if predicted_price is not None:
            print(f"Predicted modal price for {crop_name} on {current_date.strftime('%Y-%m-%d')}: {predicted_price:.2f}")

# Example of usage
if __name__ == "__main__":
    crop_name = input("Enter the crop name to predict for next 7 days: ")
    prediction_start_date_str = input("Enter the starting date for prediction (YYYY-MM-DD): ")
    predict_next_7_days(crop_name, prediction_start_date_str)
