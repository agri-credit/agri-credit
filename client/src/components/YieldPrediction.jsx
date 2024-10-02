import { CloudCog, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function YieldPrediction() {
  const [state] = useState("Karnataka");
  const [district, setDistrict] = useState("");
  const [season, setSeason] = useState("");
  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [uniqueDistricts, setUniqueDistricts] = useState([]);
  const [uniqueSeasons, setUniqueSeasons] = useState([]);
  const [uniqueCrops, setUniqueCrops] = useState([]);
  const [loading, setLoading]= useState(false)
console.log(loading)
  useEffect(() => {
    const fetchUniqueValues = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/uniquevalues");
        const data = await response.json();

        if (response.ok) {
          setUniqueDistricts(data.districts);
          setUniqueSeasons(data.Season);
          setUniqueCrops(data.Crops);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Failed to fetch unique values");
      }
    };

    fetchUniqueValues();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const inputData = {
      state: state,
      district: district,
      season: season,
      crop: crop,
      area: area,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/yieldpredict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction(data.prediction);
        setError("");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Something went wrong!");
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-green-100 dark:bg-green-900 flex flex-col items-center justify-center p-5">
      <h1 className="text-4xl font-bold text-green-800 dark:text-green-200 mb-6 shadow-lg">
        Crop Yield Prediction
      </h1>
      <p className="mb-2 text-green-700 dark:text-green-300">
        Enter the details below to predict the yield of a crop.
      </p>
      <p className="mb-6 text-green-600 dark:text-green-400">
        Please note, it may take some time to process the request.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-96 bg-white dark:bg-green-800 p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label className="block text-green-700 dark:text-green-300 font-medium">
            State:
          </label>
          <input
            type="text"
            value={state}
            readOnly
            className="mt-1 p-2 border border-green-400 rounded w-full bg-green-50 dark:bg-green-700 text-green-700 dark:text-green-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-green-700 dark:text-green-300 font-medium">
            District:
          </label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
            className="mt-1 p-2 border border-green-400 rounded w-full bg-green-50 dark:bg-green-700 text-green-700 dark:text-green-300"
          >
            <option value="">Select District</option>
            {uniqueDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-green-700 dark:text-green-300 font-medium">
            Season:
          </label>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            required
            className="mt-1 p-2 border border-green-400 rounded w-full bg-green-50 dark:bg-green-700 text-green-700 dark:text-green-300"
          >
            <option value="">Select Season</option>
            {uniqueSeasons.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-green-700 dark:text-green-300 font-medium">
            Crop:
          </label>
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            required
            className="mt-1 p-2 border border-green-400 rounded w-full bg-green-50 dark:bg-green-700 text-green-700 dark:text-green-300"
          >
            <option value="">Select Crop</option>
            {uniqueCrops.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-green-700 dark:text-green-300 font-medium">
            Area (in hectares):
          </label>
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
            className="mt-1 p-2 border border-green-400 rounded w-full bg-green-50 dark:bg-green-700 text-green-700 dark:text-green-300"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-all flex"
        >
          {loading && <Loader2 className="animate-spin text-center"/> }Predict Yield
        </button>
      </form>

      {prediction && (
        <div className="mt-6 p-4 bg-green-200 dark:bg-green-700 rounded">
          <h2 className="text-green-800 dark:text-green-200 font-bold">
            Predicted Yield: {prediction}
          </h2>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-200 dark:bg-red-600 rounded">
          <h2 className="text-red-800 dark:text-red-100">Error: {error}</h2>
        </div>
      )}
    </div>
  );
}
