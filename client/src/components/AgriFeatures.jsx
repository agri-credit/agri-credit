import React from 'react';
import { FaChartLine, FaCloudRain } from "react-icons/fa"; // For rain prediction and yield
import { GiFertilizerBag, GiPlantRoots } from "react-icons/gi"; // Fertilizer and crop recommendation
import { MdAttachMoney, MdOutlineGrain } from "react-icons/md";
import { Link } from "react-router-dom";
export const AgriFeatures = () => {
  return (
   
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="cont1 bg-green-100 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
              <Link
                to="/agrihelp?tab=crop_recommender"
                className="flex flex-col items-center"
              >
                <GiPlantRoots className="h-10 w-10 text-[#4CAF50] mb-3" />{" "}
                {/* Green for growth and crop recommendation */}
                <div className="container1 text-[#3b5a26] text-xl font-bold">
                  Crop Recommender
                </div>
                <div className="disc text-green-700 mt-2 text-center">
                  Get crop recommendations based on soil and climate data.
                </div>
              </Link>
            </div>

            <div className="cont1 bg-green-100 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
              <Link
                to="/agrihelp?tab=crop_price"
                className="flex flex-col items-center"
              >
                <MdAttachMoney className="h-10 w-10 text-[#FFD700] mb-3" />{" "}
                {/* Gold for money and prices */}
                <div className="container1 text-[#3b5a26] text-xl font-bold">
                  Crop Price
                </div>
                <div className="disc text-green-700 mt-2 text-center">
                  Get the latest market prices for your crops.
                </div>
              </Link>
            </div>

            <div className="cont1 bg-green-100 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
              <Link
                to="/agrihelp?tab=fertilizer_recommend"
                className="flex flex-col items-center"
              >
                <GiFertilizerBag className="h-10 w-10 text-[#FF5722] mb-3" />{" "}
                {/* Orange for fertilizer */}
                <div className="container1 text-[#3b5a26] text-xl font-bold">
                  Fertilizer Recommend
                </div>
                <div className="disc text-green-700 mt-2 text-center">
                  Get the best fertilizer recommendations for your crops.
                </div>
              </Link>
            </div>

            <div className="cont1 bg-green-100 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
              <Link
                to="/agrihelp?tab=yield_prediction"
                className="flex flex-col items-center"
              >
                <FaChartLine className="h-10 w-10 text-[#3B82F6] mb-3" />{" "}
                {/* Blue for data and prediction */}
                <div className="container1 text-[#3b5a26] text-xl font-bold">
                  Yield Prediction
                </div>
                <div className="disc text-green-700 mt-2 text-center">
                  Predict the yield of your crops based on environmental data.
                </div>
              </Link>
            </div>

            <div className="cont1 bg-green-100 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
              <Link
                to="/agrihelp?tab=rain_prediction"
                className="flex flex-col items-center"
              >
                <FaCloudRain className="h-10 w-10 text-[#00BFFF] mb-3" />{" "}
                {/* Light blue for rain */}
                <div className="container1 text-[#3b5a26] text-xl font-bold">
                  Rain Prediction
                </div>
                <div className="disc text-green-700 mt-2 text-center">
                  Get rain forecasts to plan your crop cultivation.
                </div>
              </Link>
            </div>

            <div className="cont1 bg-green-100 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
              <Link
                to="/agrihelp?tab=crop_prediction"
                className="flex flex-col items-center"
              >
                <MdOutlineGrain className="h-10 w-10 text-[#8B4513] mb-3" />{" "}
                {/* Brown for soil and grain */}
                <div className="container1 text-[#3b5a26] text-xl font-bold">
                  Crop Prediction
                </div>
                <div className="disc text-green-700 mt-2 text-center">
                  Predict the types of crops that can grow best based on soil
                  and climate.
                </div>
              </Link>
            </div>
          </div>
  )
}
