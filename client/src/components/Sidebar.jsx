import { React, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Set initial state to true to show sidebar

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-green-100 p-4 border-r-2 border-green-300 transition-transform duration-300 
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <button
        className="absolute top-4 right-[-30px] bg-green-700 text-white rounded-full p-2 cursor-pointer text-xl transition-colors duration-300 
        hover:bg-green-800"
        onClick={toggleSidebar}
      >
        {isOpen ? "❯" : "❮"}
      </button>
      <div className="opacity-100 transition-opacity duration-300">
        <h2 className="text-2xl font-bold mb-4">Sections</h2>
        <ul className="list-none p-0">
          <li className="mb-4">
            <Link
              to={"/croplist"}
              className="text-green-700 text-lg transition-colors duration-300 hover:text-green-800"
            >
              <span>Crop List</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to={"/fertilist"}
              className="text-green-700 text-lg transition-colors duration-300 hover:text-green-800"
            >
              <span>Fertilizers</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to={"/diseases"}
              className="text-green-700 text-lg transition-colors duration-300 hover:text-green-800"
            >
              <span>Diseases</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to={"/pesticides"}
              className="text-green-700 text-lg transition-colors duration-300 hover:text-green-800"
            >
              <span>Pesticides</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
