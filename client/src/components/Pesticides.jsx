import React, { useState } from "react";

export default function Pesticides() {
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [options2, setOptions2] = useState([]);
  const [pesticidesData, setPesticides] = useState([]);

  const handleDropdown1Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption1(selectedValue);

    // Define options based on selected crop
    const cropOptions = {
      Rice: ["Blast", "Sheath Blight"],
      Wheat: ["Rust", "Fusarium Head Blight"],
      Sugarcane: ["Red Rot", "Smut"],
      Cotton: ["Fusarium Wilt", "Verticillium Wilt"],
      Barley: ["Leaf Rust", "Powdery Mildew"],
      Soyabean: ["Soybean Rust", "Stem Canker"],
      Apple: ["Apple Scab", "Fire Blight"],
      Chickpea: ["Ascochyta Blight", "Fusarium Wilt"],
      Chilli: ["Anthracnose", "Powdery Mildew"],
      Cloves: ["Leaf Spot", "Dieback"],
      Coffee: ["Coffee Leaf Rust", "Coffee Berry Disease"],
      Ginger: ["Soft Rot", "Bacterial Wilt"],
      Groundnut: ["Leaf Spot", "Rust"],
      "Pearl Millet": ["Downy Mildew", "Ergot", "Rust", "Blast"],
      Pepper: ["Phytophthora Blight", "Anthracnose"],
      Potato: ["Potato Wart", "Potato Virus Y"],
      Sesame: ["Alternaria Leaf Spot", "Charcoal Rot"],
      Sorghum: ["Anthracnose", "Head Smut"],
      Sunflower: ["Rust", "Downy Mildew"],
      Tea: ["Blister Blight", "Brown Blight"],
      Tobacco: ["Tobacco Mosaic Virus", "Black Shank"],
    };

    // Set options for the second dropdown based on selected crop
    setOptions2(cropOptions[selectedValue] || []);
    setSelectedOption2(""); // Reset the selected disease name when crop changes
  };

  const handleDropdown2Change = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption2(selectedValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your fetch logic here
  };

  return (
    <div className="pesticide1 p-6 bg-gradient-to-b from-green-100 to-blue-50 min-h-screen flex items-center justify-center">
      <div className="pestilist bg-green-100 rounded-lg shadow-lg p-8 max-w-md w-full transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-4">
          Pesticide Identification
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
            value={selectedOption1}
            onChange={handleDropdown1Change}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 hover:border-green-400"
          >
            <option value="">Select Crop Name</option>
            <option value="Rice">Rice</option>
            <option value="Wheat">Wheat</option>
            <option value="Sugarcane">Sugarcane</option>
            <option value="Cotton">Cotton</option>
            <option value="Barley">Barley</option>
            <option value="Soyabean">Soyabean</option>
            <option value="Apple">Apple</option>
            <option value="Chickpea">Chickpea</option>
            <option value="Chilli">Chilli</option>
            <option value="Cloves">Cloves</option>
            <option value="Coffee">Coffee</option>
            <option value="Ginger">Ginger</option>
            <option value="Groundnut">Groundnut</option>
            <option value="Pearl Millet">Pearl Millet</option>
            <option value="Pepper">Pepper</option>
            <option value="Potato">Potato</option>
            <option value="Sesame">Sesame</option>
            <option value="Sorghum">Sorghum</option>
            <option value="Sunflower">Sunflower</option>
            <option value="Tea">Tea</option>
            <option value="Tobacco">Tobacco</option>
          </select>

          {/* Second dropdown for disease name */}
          <label
            htmlFor="diseaseName"
            className="text-lg font-semibold text-gray-700"
          >
            Disease Name
          </label>
          <select
            id="diseaseName"
            value={selectedOption2}
            onChange={handleDropdown2Change}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 hover:border-green-400"
          >
            <option value="">Select Disease Name</option>
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
}
