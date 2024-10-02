import React, { useEffect, useState } from "react";
import { FaChartLine, FaCloudRain } from "react-icons/fa"; // For rain prediction and yield
import { GiFertilizerBag, GiPlantRoots } from "react-icons/gi"; // Fertilizer and crop recommendation
import { MdAttachMoney, MdOutlineGrain } from "react-icons/md"; // Price and crop prediction
import { Link, useLocation } from "react-router-dom";
import { AgriFeatures } from "../components/AgriFeatures";
import CropPrediction from "../components/CropPrediction";
import CropPrice from "../components/CropPrice";
import CropRecommender from "../components/CropRecommender";
import FertilizerRecommend from "../components/FertilizerRecommend";
import RainPrediction from "../components/RainPrediction";
import YieldPrediction from "../components/YieldPrediction";

const AgriHelp = () => {
  const location = useLocation();
  const [tab, setTab] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const selectedTab = urlParams.get("tab") || null; // Default to 'dash' if no tab is found
    setTab(selectedTab);
  }, [location.search]);
  return (
    <>
      {!tab && (
         <div className="outer-container bg-green-100 dark:bg-green-800 p-10 min-h-screen flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-8">Agricultural Assistance</h1>
        <AgriFeatures/>
        </div>
      )}
      {tab && (
        <>
          <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-green-500 rounded-lg sm:hidden hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-200 dark:text-green-400 dark:hover:bg-green-700 dark:focus:ring-green-600"
            onClick={() => setSidebar(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>

          <aside
            id="default-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-${
              sidebar ? "0" : "full"
            } sm:translate-x-0`}
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-20 overflow-y-auto bg-green-50 dark:bg-green-800">
              <div
                onClick={() => setSidebar(false)}
                className="flex float-end bg-green-800 rounded-full p-2 text-white sm:hidden"
              >
                X
              </div>
              <ul className="space-y-2 font-medium">
                <li>
                  <Link
                    to="/agrihelp"
                    className="flex items-center p-2 text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700 group"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 transition duration-75 dark:text-green-400 group-hover:text-green-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                    >
                      <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                    </svg>
                    <span className="ms-3">Agri Help</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agrihelp?tab=crop_recommender"
                    className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700 ${
                      tab === "crop_recommender"
                        ? "bg-green-100 dark:bg-green-700"
                        : ""
                    } group`}
                  >
                    <GiPlantRoots className="w-5 h-5 text-green-500 transition duration-75 dark:text-green-400 group-hover:text-green-900 dark:group-hover:text-white" />
                    <span className="ms-3">Crop Recommender</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/agrihelp?tab=crop_price"
                    className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700 ${
                      tab === "crop_price"
                        ? "bg-green-100 dark:bg-green-700"
                        : ""
                    } group`}
                  >
                    <MdAttachMoney className="w-5 h-5 text-yellow-500 transition duration-75 dark:text-yellow-400 group-hover:text-green-900 dark:group-hover:text-white" />
                    <span className="ms-3">Crop Price</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/agrihelp?tab=fertilizer_recommend"
                    className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700 ${
                      tab === "fertilizer_recommend"
                        ? "bg-green-100 dark:bg-green-700"
                        : ""
                    } group`}
                  >
                    <GiFertilizerBag className="w-5 h-5 text-orange-500 transition duration-75 dark:text-orange-400 group-hover:text-green-900 dark:group-hover:text-white" />
                    <span className="ms-3">Fertilizer Recommend</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/agrihelp?tab=yield_prediction"
                    className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700 ${
                      tab === "yield_prediction"
                        ? "bg-green-100 dark:bg-green-700"
                        : ""
                    } group`}
                  >
                    <FaChartLine className="w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-green-900 dark:group-hover:text-white" />
                    <span className="ms-3">Yield Prediction</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/agrihelp?tab=rain_prediction"
                    className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700 ${
                      tab === "rain_prediction"
                        ? "bg-green-100 dark:bg-green-700"
                        : ""
                    } group`}
                  >
                    <FaCloudRain className="w-5 h-5 text-lightblue-500 transition duration-75 dark:text-lightblue-400 group-hover:text-green-900 dark:group-hover:text-white" />
                    <span className="ms-3">Rain Prediction</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/agrihelp?tab=crop_prediction"
                    className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700 ${
                      tab === "crop_prediction"
                        ? "bg-green-100 dark:bg-green-700"
                        : ""
                    } group`}
                  >
                    <MdOutlineGrain className="w-5 h-5 text-brown-500 transition duration-75 dark:text-brown-400 group-hover:text-green-900 dark:group-hover:text-white" />
                    <span className="ms-3">Crop Prediction</span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          <div className="p-4 sm:ml-64">
            {tab === "crop_recommender" && <CropRecommender />}
            {tab === "crop_price" && <CropPrice />}
            {tab === "fertilizer_recommend" && <FertilizerRecommend />}
            {tab === "yield_prediction" && <YieldPrediction />}
            {tab === "rain_prediction" && <RainPrediction />}
            {tab === "crop_prediction" && <CropPrediction />}
          </div>
        </>
      )}
    </>
  );
};

export default AgriHelp;
