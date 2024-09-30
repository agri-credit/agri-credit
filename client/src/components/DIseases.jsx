import React, { useState } from "react";

export default function Disease() {
  const [selectedCropName, setSelectedCropName] = useState("");
  const [diseasesData, setDiseases] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your fetch logic here
  };

  const handleChange = (event) => {
    setSelectedCropName(event.target.value);
  };

  return (
    <div className="disease1 p-6  min-h-screen flex items-center justify-center">
      <div className="dislist bg-green-100 rounded-lg shadow-lg p-8 max-w-md w-full transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-4">
          Disease Identification
        </h2>
        <form
          onSubmit={handleSubmit}
          className="form-11 flex flex-col space-y-4"
        >
          <label
            htmlFor="cropName"
            className="text-lg font-semibold text-gray-700"
          >
            Crop Name
          </label>
          <select
            id="cropName"
            value={selectedCropName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 hover:border-green-400"
          >
            <option value="">Select Crop</option>
            <option value="Apple">Apple</option>
            <option value="Barley">Barley</option>
            <option value="Cotton">Cotton</option>
            <option value="Chickpea">Chickpea</option>
            <option value="Chilli">Chilli</option>
            <option value="Cloves">Cloves</option>
            <option value="Coffee">Coffee</option>
            <option value="Ginger">Ginger</option>
            <option value="Groundnut">Groundnut</option>
            <option value="Pearl Millet">Pearl Millet</option>
            <option value="Pepper">Pepper</option>
            <option value="Potato">Potato</option>
            <option value="Rice">Rice</option>
            <option value="Sesame">Sesame</option>
            <option value="Sorghum">Sorghum</option>
            <option value="Soyabean">Soyabean</option>
            <option value="Sugarcane">Sugarcane</option>
            <option value="Sunflower">Sunflower</option>
            <option value="Tea">Tea</option>
            <option value="Tobacco">Tobacco</option>
            <option value="Wheat">Wheat</option>
          </select>
          <button
            type="submit"
            disabled={selectedCropName === ""}
            className={`bg-green-600 text-white rounded-md px-4 py-2 transition duration-300 
              ${
                selectedCropName === ""
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-700"
              }`}
          >
            Get List
          </button>
        </form>
      </div>
    </div>
  );
}
