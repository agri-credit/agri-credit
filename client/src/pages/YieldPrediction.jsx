import React, { useState, useEffect } from 'react';

function YieldPrediction() {
    const [state, setState] = useState('Karnataka');
    const [district, setDistrict] = useState('');
    const [season, setSeason] = useState('');
    const [crop, setCrop] = useState('');
    const [area, setArea] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState('');
    const [uniqueDistricts, setUniqueDistricts] = useState([]);
    const [uniqueSeasons, setUniqueSeasons] = useState([]);
    const [uniqueCrops, setUniqueCrops] = useState([]);

    useEffect(() => {
        const fetchUniqueValues = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/uniquevalues');
                const data = await response.json();

                if (response.ok) {
                    setUniqueDistricts(data.districts);
                    setUniqueSeasons(data.Season);
                    setUniqueCrops(data.Crops);
                } else {
                    setError(data.error);
                }
            } catch (err) {
                setError('Failed to fetch unique values');
            }
        };

        fetchUniqueValues();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data to send to the server
        const inputData = {
            state: state,
            district: district,
            season: season,
            crop: crop,
            area: area
        };

        try {
            // Send data to Flask backend
            console.log(inputData);
            const response = await fetch('http://127.0.0.1:5000/yieldpredict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputData),
            });

            // Get the response from the server
            const data = await response.json();

            if (response.ok) {
                // Set prediction result
                setPrediction(data.prediction);
                setError('');
            } else {
                // Display error if any
                setError(data.error);
            }
        } catch (err) {
            setError('Something went wrong!');
        }
    };

    return (
        <div>
            <h1>Crop Yield Prediction</h1>
            <p>Enter the details below to predict the yield of a crop:</p>
            <p>It will take some time, please wait</p>
            <p>Karnataka selected as whole India takes a lot of time</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>State:</label>
                    <input
                        type="text"
                        value={state}
                        readOnly
                    />
                </div>
                <div>
                    <label>District:</label>
                    <select value={district} onChange={(e) => setDistrict(e.target.value)} required>
                        <option value="">Select District</option>
                        {uniqueDistricts.map((district) => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Season:</label>
                    <select value={season} onChange={(e) => setSeason(e.target.value)} required>
                        <option value="">Select Season</option>
                        {uniqueSeasons.map((season) => (
                            <option key={season} value={season}>{season}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Crop:</label>
                    <select value={crop} onChange={(e) => setCrop(e.target.value)} required>
                        <option value="">Select Crop</option>
                        {uniqueCrops.map((crop) => (
                            <option key={crop} value={crop}>{crop}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Area (in hectares):</label>
                    <input
                        type="number"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Predict Yield</button>
            </form>

            {prediction && (
                <div>
                    <h2>Predicted Yield: {prediction}</h2>
                </div>
            )}

            {error && (
                <div>
                    <h2>Error: {error}</h2>
                </div>
            )}
        </div>
    );
}

export default YieldPrediction;
