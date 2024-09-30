import React, { useState } from "react";
const FertiList = () => {
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [options2, setOptions2] = useState([]);
  const [fertilizersData, setFertilizers] = useState([]);

  const handleDropdown1Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption1(selectedValue);

    // Define options based on selected soil type
    const soilOptions = {
      Alluvial: [
        "Rice",
        "Wheat",
        "Sugarcane",
        "Cotton",
        "Jute",
        "Corn",
        "Barley",
      ],
      "Black Soil": [
        "Cotton",
        "Soyabean",
        "Sugarcane",
        "Groundnut",
        "Wheat",
        "Chickpea",
        "Sunflower",
        "Sorghum",
      ],
      "Red Soil": [
        "Groundnut",
        "Cotton",
        "Tobacco",
        "Chilli",
        "Red Lentils",
        "Sorghum",
        "Sugarcane",
        "Sesame",
        "Pearl Millet",
      ],
      "Mountain Soil": [
        "Tea",
        "Coffee",
        "Apple",
        "Potato",
        "Cloves",
        "Pepper",
        "Ginger",
      ],
    };

    // Set options for the second dropdown based on selected soil type
    setOptions2(soilOptions[selectedValue] || []);
    setSelectedOption2(""); // Reset the selected crop name when soil type changes
  };

  const handleDropdown2Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption2(selectedValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Fetch fertilizers based on selected soil type and crop name
  };

  return (
    <div className="fertilizer1 p-6 min-h-screen flex items-center justify-center">
      <div className="fertilist bg-green-100 rounded-lg shadow-lg p-8 max-w-md w-full transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-4">
          Fertilizer Recommendation
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
            value={selectedOption1}
            onChange={handleDropdown1Change}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 hover:border-green-400"
          >
            <option value="">Select Soil Type</option>
            <option value="Alluvial">Alluvial Soil</option>
            <option value="Black Soil">Black Soil</option>
            <option value="Red Soil">Red Soil</option>
            <option value="Mountain Soil">Mountain Soil</option>
          </select>

          {/* Second dropdown for crop name */}
          <label
            htmlFor="cropName"
            className="text-lg font-semibold text-gray-700"
          >
            Crop Name
          </label>
          <select
            id="cropName"
            value={selectedOption2}
            onChange={handleDropdown2Change}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 hover:border-green-400"
          >
            <option value="">Select Crop Name</option>
            {options2.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={selectedOption1 === ""}
            className={`bg-green-600 text-white rounded-md px-4 py-2 transition duration-300 
              ${
                selectedOption1 === ""
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

export default FertiList;
