import React, { useState } from "react";

function CropPrice() {
  const [cropName, setCropName] = useState("");
  const [predictionDate, setPredictionDate] = useState("");
  const [predictions, setPredictions] = useState({});
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/predict_crop_price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crop_name: cropName,
          prediction_date: predictionDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setPredictions(data);
      setError("");
    } catch (err) {
      setError("Error fetching predictions. Please try again.");
      setPredictions({});
    }
  };

  return (
    <div className="min-h-screen bg-green-100 dark:bg-green-800 text-green-900 dark:text-white flex flex-col items-center justify-center p-5">
      <h1 className="text-center mb-5 text-4xl font-bold text-green-700 dark:text-green-300 shadow-lg">
        Crop Price Predictor
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-6 bg-green-100 bg-opacity-60 backdrop-blur-md rounded-lg shadow-xl transition-all duration-300 hover:bg-opacity-70"
      >
        <input
          type="text"
          placeholder="Crop Name"
          value={cropName}
          onChange={(e) => setCropName(e.target.value)}
          required
          className="mb-4 p-2 border border-green-400 rounded-md w-72 text-black focus:outline-none focus:border-green-500 transition-all"
        />
        <input
          type="date"
          value={predictionDate}
          onChange={(e) => setPredictionDate(e.target.value)}
          required
          className="mb-4 p-2 border border-green-400 rounded-md w-72 text-black focus:outline-none focus:border-green-500 transition-all"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded-md shadow-md transition-all hover:scale-105"
        >
          Predict
        </button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-10 p-6 border border-green-400 rounded-lg bg-green-100 bg-opacity-50 shadow-xl w-full max-w-xl">
        <h2 className="text-center text-2xl font-semibold text-green-800 dark:text-green-200">
          Predictions will be displayed below:
        </h2>
        <div className="flex justify-center mt-4">
          <ul className="w-full">
            {Object.entries(predictions).map(([date, price]) => (
              <li
                key={date}
                className="bg-green-200 dark:bg-green-700 p-3 my-2 rounded-md transition-all hover:bg-green-300 dark:hover:bg-green-600 hover:scale-105"
              >
                {`Date: ${date}, Predicted Price: ₹${price.toFixed(2)}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CropPrice;
