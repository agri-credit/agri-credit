import React, { useState, useEffect } from "react";

export default function CropPrediction() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/options");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStates(data.states);
        setDistricts(data.districts);
        setSeasons(data.seasons);
        setError(""); // Clear any existing error
      } catch (error) {
        setError("Error fetching options.");
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/predictcrop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state: selectedState,
          district: selectedDistrict,
          season: selectedSeason,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPrediction(data);
      setError(""); // Clear any existing error
    } catch (error) {
      setError("Error fetching prediction.");
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 dark:bg-green-800 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-6">
        Crop Prediction
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
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-green-600 dark:text-green-300 font-medium">
            District:
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="mt-1 p-2 border border-green-300 rounded w-full bg-green-50 dark:bg-green-600 text-green-700 dark:text-green-200"
            required
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-green-600 dark:text-green-300 font-medium">
            Season:
          </label>
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="mt-1 p-2 border border-green-300 rounded w-full bg-green-50 dark:bg-green-600 text-green-700 dark:text-green-200"
            required
          >
            <option value="">Select Season</option>
            {seasons.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-all"
        >
          Predict
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-200 dark:bg-red-600 rounded">
          <h2 className="text-red-700 dark:text-red-100">{error}</h2>
        </div>
      )}

      {prediction && (
        <div className="mt-6 p-4 bg-green-200 dark:bg-green-700 rounded">
          <h2 className="text-green-700 dark:text-green-100 font-bold">
            Predictions:
          </h2>
          <pre className="text-green-900 dark:text-green-200">
            {JSON.stringify(prediction, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
