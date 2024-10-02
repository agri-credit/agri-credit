import React, { useEffect, useState } from "react";

export default function RainPrediction() {
  const [states, setStates] = useState([]);
  const [months] = useState([
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [predictedRainfall, setPredictedRainfall] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/states");
        const data = await response.json();
        setStates(data);
        setSelectedState(data[0]); // Set default state
      } catch (error) {
        setError("Error fetching states");
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/predictrainfall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state: selectedState,
          month: selectedMonth,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setPredictedRainfall(data.predicted_rainfall);
      setError("");
    } catch (error) {
      setError("There was an error predicting rainfall");
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 dark:bg-green-800 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-green-700 dark:text-green-300 mb-6">
        Rainfall Prediction
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-green-700 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-green-600 dark:text-green-300 font-medium">
            State:
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="mt-1 p-2 border border-green-300 rounded w-full bg-green-50 dark:bg-green-600 text-green-700 dark:text-green-200"
            required
          >
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-green-600 dark:text-green-300 font-medium">
            Month:
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="mt-1 p-2 border border-green-300 rounded w-full bg-green-50 dark:bg-green-600 text-green-700 dark:text-green-200"
            required
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-all"
        >
          Predict Rainfall
        </button>
      </form>

      {predictedRainfall !== null && (
        <div className="mt-6 p-4 bg-green-200 dark:bg-green-700 rounded">
          <h2 className="text-green-700 dark:text-green-100 font-bold">
            Predicted Rainfall: {predictedRainfall} mm
          </h2>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-200 dark:bg-red-600 rounded">
          <h2 className="text-red-700 dark:text-red-100">Error: {error}</h2>
        </div>
      )}
    </div>
  );
}
