import React, { useState } from 'react';

function FertilizerRecommend() {
    const [formData, setFormData] = useState({
        N: '',
        P: '',
        K: '',
        Temperature: '',
        Humidity: '',
        SoilMoisture: '',
        SoilType: '',
        CropType: ''
    });

    const [prediction, setPrediction] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setPrediction('');

        try {
            const response = await fetch('http://127.0.0.1:5000/predict_fertilizer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch prediction');
            }

            const data = await response.json();
            setPrediction(data.fertilizer);
        } catch (error) {
            setError('Error predicting fertilizer. Please try again.');
        }
    };

    return (
        <div>
            <h1>Fertilizer Prediction</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="N"
                    placeholder="Nitrogen (N)"
                    value={formData.N}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="P"
                    placeholder="Phosphorus (P)"
                    value={formData.P}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="K"
                    placeholder="Potassium (K)"
                    value={formData.K}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="Temperature"
                    placeholder="Temperature"
                    value={formData.Temperature}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="Humidity"
                    placeholder="Humidity"
                    value={formData.Humidity}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="SoilMoisture"
                    placeholder="Soil Moisture"
                    value={formData.SoilMoisture}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="SoilType"
                    placeholder="Soil Type (e.g., Sandy)"
                    value={formData.SoilType}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="CropType"
                    placeholder="Crop Type (e.g., Maize)"
                    value={formData.CropType}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Predict</button>
            </form>
            {prediction && <h2>Predicted Fertilizer: {prediction}</h2>}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
}

export default FertilizerRecommend;
