import pandas as pd
import sys
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier

# Load the dataset
data = pd.read_csv("../../ML/fertilizer_recommendation/fertilizer_recommendation.csv")

# Label encoding for categorical features
le_soil = LabelEncoder()
data['Soil Type'] = le_soil.fit_transform(data['Soil Type'])
le_crop = LabelEncoder()
data['Crop Type'] = le_crop.fit_transform(data['Crop Type'])

# Splitting the data into input and output variables
X = data.iloc[:, :-1]  # All columns except the last one (Fertilizer Name)
y = data.iloc[:, -1]   # The last column is the target (Fertilizer Name)

# Training the Decision Tree Classifier model
dtc = DecisionTreeClassifier(random_state=0)
dtc.fit(X, y)

# Get the input parameters as command line arguments and convert them to integers
jsonn = int(sys.argv[1])  # Nitrogen
jsonp = int(sys.argv[2])  # Phosphorous
jsonk = int(sys.argv[3])  # Potassium
jsont = float(sys.argv[4])  # Temperature
jsonh = float(sys.argv[5])  # Humidity
jsonsm = float(sys.argv[6])  # Soil Moisture
jsonsoil = sys.argv[7]  # Soil Type (categorical)
jsoncrop = sys.argv[8]  # Crop Type (categorical)

# Encode the categorical inputs
soil_enc = le_soil.transform([jsonsoil])[0]
crop_enc = le_crop.transform([jsoncrop])[0]

# Create the user input as a DataFrame with the correct feature names
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

# Predict fertilizer name
fertilizer_name = dtc.predict(user_input)

# Return the prediction as a string
print(str(fertilizer_name[0]))
