import React, { useState } from 'react';
import '../styles/CropPrice.css'; // Make sure this path is correct

function CropPrice() {
    const [cropName, setCropName] = useState('');
    const [predictionDate, setPredictionDate] = useState('');
    const [predictions, setPredictions] = useState({});
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/predict_crop_price', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    crop_name: cropName,
                    prediction_date: predictionDate,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setPredictions(data);
            setError('');
        } catch (err) {
            setError('Error fetching predictions. Please try again.');
            setPredictions({});
        }
    };

    return (
        <div>
            <h1>Crop Price Predictor</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Crop Name"
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={predictionDate}
                    onChange={(e) => setPredictionDate(e.target.value)}
                    required
                />
                <button type="submit">Predict</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='predictions-container'>
            <h2>Predictions will be displayed below:</h2>
            <div className='predictions'>
                
                <ul>
                    {Object.entries(predictions).map(([date, price]) => (
                        <li key={date}>{`Date: ${date}, Predicted Price: ${price.toFixed(2)}`}</li>
                    ))}
                </ul>
            </div>
            </div>
        </div>
    );
}

export default CropPrice;
