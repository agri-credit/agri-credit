import React, { useEffect, useState } from 'react';

function RainPrediction() {
  const [states, setStates] = useState([]);
  const [months, setMonths] = useState([
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [predictedRainfall, setPredictedRainfall] = useState(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/states'); // Adjust if needed
        const data = await response.json();
        setStates(data);
        setSelectedState(data[0]); // Set default state
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/predictrainfall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          state: selectedState,
          month: selectedMonth,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPredictedRainfall(data.predicted_rainfall);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div>
      <h1>Rainfall Prediction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            State:
            <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Month:
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">Predict Rainfall</button>
      </form>
      {predictedRainfall !== null && (
        <h2>Predicted Rainfall: {predictedRainfall} mm</h2>
      )}
    </div>
  );
}

export default RainPrediction;
