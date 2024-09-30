import React, { useState } from "react";

const CropList = () => {
  const [selectedSoilType, setSelectedSoilType] = useState("");
  const [cropsData, setCrops] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Fetch crops based on selected soil type
  };

  const handleSoilTypeChange = (event) => {
    setSelectedSoilType(event.target.value);
  };

  return (
    <div className="croplist1 p-6 bg-gradient-to-b from-green-100 to-blue-50 min-h-[calc(100dvh-5rem)] flex items-center justify-center">
      <div className="crop_list bg-green-100 rounded-lg shadow-lg p-8 max-w-md w-full transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-4">
          Select Your Crop
        </h2>
        <form
          onSubmit={handleSubmit}
          className="form-11 flex flex-col space-y-4"
        >
          <label
            htmlFor="soilType"
            className="text-lg font-semibold text-gray-700"
          >
            Soil Type
          </label>
          <select
            id="soilType"
            value={selectedSoilType}
            onChange={handleSoilTypeChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 hover:border-green-400"
          >
            <option value="">Select Soil</option>
            <option value="Alluvial Soil">Alluvial Soil</option>
            <option value="Black Soil">Black Soil</option>
            <option value="Red Soil">Red Soil</option>
            <option value="Mountain Soil">Mountain Soil</option>
          </select>
          <button
            type="submit"
            disabled={selectedSoilType === ""}
            className={`bg-green-600 text-white rounded-md px-4 py-2 transition duration-300 
              ${
                selectedSoilType === ""
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
};

export default CropList;
