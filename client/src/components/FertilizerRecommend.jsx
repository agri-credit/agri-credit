import React, { useState } from "react";

export default function FertilizerRecommend() {
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    Temperature: "",
    Humidity: "",
    SoilMoisture: "",
    SoilType: "",
    CropType: "",
  });

  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPrediction("");

    try {
      const response = await fetch("http://127.0.0.1:5000/predict_fertilizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      setPrediction(data.fertilizer);
    } catch (error) {
      setError("Error predicting fertilizer. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-green-100 dark:bg-green-800 text-green-900 dark:text-white flex flex-col items-center justify-center p-5">
      <h1 className="text-center mb-6 text-4xl font-bold text-green-700 dark:text-green-300 shadow-lg">
        Fertilizer Prediction
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-80 border border-green-400 rounded-lg p-6 bg-green-100 bg-opacity-60 backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-opacity-70"
      >
        <label className="mb-4 text-green-800 font-medium">
          Enter the following details:
        </label>

        <input
          type="text"
          name="N"
          placeholder="Nitrogen (N)"
          value={formData.N}
          onChange={handleChange}
          required
          className="mb-3 p-2 border border-green-400 rounded focus:outline-none focus:ring-2 text-green-900 focus:ring-green-500 transition-all"
        />
        <input
          type="text"
          name="P"
          placeholder="Phosphorus (P)"
          value={formData.P}
          onChange={handleChange}
          required
          className="mb-3 p-2 border border-green-400 rounded focus:outline-none focus:ring-2 text-green-900 focus:ring-green-500 transition-all"
        />
        <input
          type="text"
          name="K"
          placeholder="Potassium (K)"
          value={formData.K}
          onChange={handleChange}
          required
          className="mb-3 p-2 border border-green-400 rounded focus:outline-none focus:ring-2 text-green-900 focus:ring-green-500 transition-all"
        />
        <input
          type="text"
          name="Temperature"
          placeholder="Temperature"
          value={formData.Temperature}
          onChange={handleChange}
          required
          className="mb-3 p-2 border border-green-400 rounded focus:outline-none focus:ring-2 text-green-900 focus:ring-green-500 transition-all"
        />
        <input
          type="text"
          name="Humidity"
          placeholder="Humidity"
          value={formData.Humidity}
          onChange={handleChange}
          required
          className="mb-3 p-2 border border-green-400 rounded focus:outline-none focus:ring-2 text-green-900 focus:ring-green-500 transition-all"
        />
        <input
          type="text"
          name="SoilMoisture"
          placeholder="Soil Moisture"
          value={formData.SoilMoisture}
          onChange={handleChange}
          required
          className="mb-3 p-2 border border-green-400 rounded focus:outline-none focus:ring-2 text-green-900 focus:ring-green-500 transition-all"
        />
        <input
          type="text"
          name="SoilType"
          placeholder="Soil Type (e.g., Sandy)"
          value={formData.SoilType}
          onChange={handleChange}
          required
          className="mb-3 p-2 border border-green-400 rounded focus:outline-none focus:ring-2 text-green-900 focus:ring-green-500 transition-all"
        />
        <input
          type="text"
          name="CropType"
          placeholder="Crop Type (e.g., Maize)"
          value={formData.CropType}
          onChange={handleChange}
          required
          className="mb-3 p-2 border border-green-400 rounded focus:outline-none focus:ring-2 text-green-900 focus:ring-green-500 transition-all"
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 rounded mt-4 shadow-lg hover:bg-green-600 transition-all"
        >
          Predict
        </button>
      </form>

      {prediction && (
        <h2 className="mt-6 text-2xl text-green-800 dark:text-green-200 opacity-0 animate-fadeIn">
          {`Predicted Fertilizer: ${prediction}`}
        </h2>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
