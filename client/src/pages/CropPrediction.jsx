import React, { useState, useEffect } from 'react';

function CropPrediction() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/options');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStates(data.states);
        setDistricts(data.districts);
        setSeasons(data.seasons);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    fetchOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/predictcrop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          state: selectedState,
          district: selectedDistrict,
          season: selectedSeason,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  return (
    <div>
      <h1>Crop Prediction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            State:
            <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            District:
            <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Season:
            <select value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)}>
              <option value="">Select Season</option>
              {seasons.map((season) => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">Predict</button>
      </form>
      {prediction && (
        <div>
          <h2>Predictions:</h2>
          <pre>{JSON.stringify(prediction, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CropPrediction;
