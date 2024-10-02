import React, { useState } from "react";

export default function CropRecommender() {
  const [formData, setFormData] = useState({
    n: "",
    p: "",
    k: "",
    t: "",
    h: "",
    ph: "",
    r: "",
  });
  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://127.0.0.1:5000/predict_crop_recommend",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const result = await response.json();
    setPrediction(result.prediction);
  };

  return (
    <div className="min-h-screen bg-green-100 dark:bg-green-800 text-green-900 dark:text-white flex flex-col items-center justify-center p-5">
      <h1 className="text-center mb-6 text-4xl font-bold text-green-700 dark:text-green-300 shadow-lg">
        Crop Recommendation System
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-80 border border-green-400 rounded-lg p-6 bg-green-100 bg-opacity-60 backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-opacity-70"
      >
        <label className="mb-4 text-green-800 dark:text-green-300 font-medium">
          Enter the following details:
        </label>

        <input
          type="number"
          name="n"
          placeholder="Nitrogen (N)"
          value={formData.n}
          onChange={handleChange}
          required
          className="mb-3 p-2 border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
        <input
          type="number"
          name="p"
          placeholder="Phosphorus (P)"
          value={formData.p}
          onChange={handleChange}
          required
          className="mb-3 p-2 border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
        <input
          type="number"
          name="k"
          placeholder="Potassium (K)"
          value={formData.k}
          onChange={handleChange}
          required
          className="mb-3 p-2 border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
        <input
          type="number"
          name="t"
          placeholder="Temperature (T)"
          value={formData.t}
          onChange={handleChange}
          required
          className="mb-3 p-2 border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
        <input
          type="number"
          name="h"
          placeholder="Humidity (H)"
          value={formData.h}
          onChange={handleChange}
          required
          className="mb-3 p-2 border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
        <input
          type="number"
          step="0.1"
          name="ph"
          placeholder="pH level"
          value={formData.ph}
          onChange={handleChange}
          required
          className="mb-3 p-2 border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
        <input
          type="number"
          name="r"
          placeholder="Rainfall (R)"
          value={formData.r}
          onChange={handleChange}
          required
          className="mb-3 p-2 border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 rounded mt-4 shadow-lg hover:bg-green-600 transition-all"
        >
          Submit
        </button>
      </form>

      {prediction && (
        <h2 className="mt-6 text-2xl text-green-800 dark:text-green-200 opacity-0 animate-fadeIn">{`Predicted Crop: ${prediction}`}</h2>
      )}
    </div>
  );
}
