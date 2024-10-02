from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from flask_cors import CORS
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier
from flask import Flask, request, jsonify
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier

from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
import joblib


# Load the dataset



# Create the Flask app

# Load the dataset
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Assuming your frontend runs on this port
class Decision_Node:
    def __init__(self,question,true_branch,false_branch):
        self.question=question
        self.true_branch = true_branch
        self.false_branch = false_branch

class Question:
    def __init__(self,column,value):
        self.column =column
        self.value=value
    def match(self,example):
        val = example[self.column]
        return val == self.value
    def match2(self,example):
        if example == 'True' or example == 'true' or example == '1':
            return True
        else:
            return False
    def __repr__(self):
        return "Is %s %s %s?" %(
            header[self.column],"==",str(self.value))
class Leaf:
    def __init__(self,Data):
        self.predictions = class_counts(Data)




 # Replace with your actual data source

@app.route('/predictcrop', methods=['POST'])
def predictcrop():
    dt_model_final = joblib.load('../ML/crop_prediction/filetest2.pkl')

# Load your data into a DataFrame
    data = pd.read_csv('../ML/crop_prediction/preprocessed2.csv') 
    # Get input data from the request
    data = request.json
    state = data['state']
    district = data['district']
    season = data['season']
    
    # Prepare the input for prediction
    testing_data = [[state, district, season]]

    # Perform the prediction
    predictions = classify(testing_data[0], dt_model_final)
    predicted_probabilities = print_leaf(predictions)

    return jsonify(predicted_probabilities)

def classify(row, node):
    if isinstance(node, Leaf):
        return node.predictions
    if node.question.match(row):
        return classify(row, node.true_branch)
    else:
        return classify(row, node.false_branch)

def print_leaf(counts):
    total = sum(counts.values()) * 1.0
    probs = {}
    for lbl in counts.keys():
        probs[lbl] = str(int(counts[lbl] / total * 100)) + "%"
    return probs

@app.route('/options', methods=['GET'])
def get_options():
    data = pd.read_csv('../ML/crop_prediction/preprocessed2.csv') 

    states = data['State_Name'].unique().tolist()
    districts = data['District_Name'].unique().tolist()
    seasons = data['Season'].unique().tolist()
    
    return jsonify({
        'states': states,
        'districts': districts,
        'seasons': seasons,
    })
















@app.route('/api/states', methods=['GET'])
def get_states():
    # Load the CSV file
    df = pd.read_csv('../ML/rainfall_prediction/rainfall_in_india_1901-2015.csv')
    
    # Extract unique states
    unique_states = df['SUBDIVISION'].unique().tolist()
    
    return jsonify(unique_states)
# Define a function to predict rainfall for a given state and month
def predict_rainfall(state, month):
    df = pd.read_csv('../ML/rainfall_prediction/rainfall_in_india_1901-2015.csv')

    # Filter the dataframe to only include rows with the given state
    state_data = df[df['SUBDIVISION'] == state]

    # Calculate the average rainfall for the given month across all the years
    avg_rainfall = state_data[month].mean()
    
    # Return the predicted rainfall for the given month
    return avg_rainfall

@app.route('/predictrainfall', methods=['POST'])
def predictrainfall():
    data = request.json
    state = data['state']
    month = data['month']
    
    predicted_rainfall = predict_rainfall(state, month)
    
    return jsonify({'predicted_rainfall': predicted_rainfall})



@app.route('/uniquevalues', methods=['GET'])
def uniquevalues():
    try:
        # Extract unique values from the DataFrame
        df = pd.read_csv('../ML/yield_prediction/crop_production_karnataka.csv')
        
        # Check if required columns exist
        if 'District_Name' not in df.columns or 'Season' not in df.columns or 'Crop' not in df.columns:
            return jsonify({'error': 'Required columns are missing from the dataset.'}), 400
        
        unique_districts = df['District_Name'].unique().tolist()
        unique_seasons = df['Season'].unique().tolist()
        unique_crops = df['Crop'].unique().tolist()

        # Return as JSON
        return jsonify({
            'districts': sorted(unique_districts),
            'Season': sorted(unique_seasons),
            'Crops': sorted(unique_crops),
        })
    
    except FileNotFoundError:
        return jsonify({'error': 'The specified CSV file was not found.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

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



# Define the route for predictions
@app.route('/predict_fertilizer', methods=['POST'])
def predict_fertilizer():
    try:
        data = pd.read_csv("../ML/fertilizer_recommendation/fertilizer_recommendation.csv")

        # Label encoding for categorical features
        le_soil = LabelEncoder()
        data['Soil Type'] = le_soil.fit_transform(data['Soil Type'])
        le_crop = LabelEncoder()
        data['Crop Type'] = le_crop.fit_transform(data['Crop Type'])

        # Splitting the data into input and output variables
        X = data.iloc[:, :-1]  # All columns except the last one (Fertilizer Name)
        y = data.iloc[:, -1]   # The last column is the target (Fertilizer Name)

        # Train the Decision Tree Classifier model
        dtc = DecisionTreeClassifier(random_state=0)
        dtc.fit(X, y)

        # Get the JSON data from the request
        data = request.json

        # Extract input values from the JSON object
        jsonn = int(data['N'])
        jsonp = int(data['P'])
        jsonk = int(data['K'])
        jsont = float(data['Temperature'])
        jsonh = float(data['Humidity'])
        jsonsm = float(data['SoilMoisture'])
        jsonsoil = data['SoilType']  # Categorical value
        jsoncrop = data['CropType']  # Categorical value

        # Encode categorical inputs
        soil_enc = le_soil.transform([jsonsoil])[0]
        crop_enc = le_crop.transform([jsoncrop])[0]

        # Create a DataFrame for the user input
        user_input = pd.DataFrame({
            'Temperature': [jsont],
            'Humidity': [jsonh],
            'Soil Moisture': [jsonsm],
            'Soil Type': [soil_enc],
            'Crop Type': [crop_enc],
            'Nitrogen': [jsonn],
            'Potassium': [jsonk],
            'Phosphorous': [jsonp]
        })

        # Make the prediction
        fertilizer_name = dtc.predict(user_input)

        # Return the prediction as JSON
        return jsonify({'fertilizer': str(fertilizer_name[0])})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400







@app.route('/yieldpredict', methods=['POST'])
def yieldpredict():
    try:
        df = pd.read_csv("../ML/yield_prediction/crop_production_karnataka.csv")

# Drop the Crop_Year column
        df = df.drop(['Crop_Year'], axis=1)

        # Separate the features and target variables
        X = df.drop(['Production'], axis=1)
        y = df['Production']

        # Split the data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Categorical columns for one-hot encoding
        categorical_cols = ['State_Name', 'District_Name', 'Season', 'Crop']

        # One-hot encode the categorical columns
        ohe = OneHotEncoder(handle_unknown='ignore')
        ohe.fit(X_train[categorical_cols])

        # Convert categorical columns to one-hot encoding
        X_train_categorical = ohe.transform(X_train[categorical_cols])
        X_test_categorical = ohe.transform(X_test[categorical_cols])

        # Combine the one-hot encoded categorical columns and numerical columns
        X_train_final = np.hstack((X_train_categorical.toarray(), X_train.drop(categorical_cols, axis=1)))
        X_test_final = np.hstack((X_test_categorical.toarray(), X_test.drop(categorical_cols, axis=1)))

        # Train the model
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X_train_final, y_train)
        # Get the input JSON data from the React frontend
        data = request.json
        
        # Extract user inputs
        state = data['state']
        district = data['district']
        season = data['season']
        crop = data['crop']
        area = float(data['area'])
        
        # Create a user input array
        user_input = np.array([[state, district, season, crop, area]])
        
        # Convert the categorical columns to one-hot encoding
        user_input_categorical = ohe.transform(user_input[:, :4])
        
        # Combine the one-hot encoded categorical columns and numerical columns
        user_input_final = np.hstack((user_input_categorical.toarray(), user_input[:, 4:].astype(float)))
        
        # Make the prediction
        prediction = model.predict(user_input_final)
        
        # Return the prediction as JSON
        return jsonify({'prediction': float(prediction[0])})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
