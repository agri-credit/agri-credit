import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardComp from "../components/DashboardComp";
import DashComments from "../components/DashComments";
import DashPosts from "../components/DashPosts";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import DashUsers from "../components/DashUsers";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("dash"); // Default tab to 'dash'

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const selectedTab = urlParams.get("tab") || "dash"; // Default to 'dash' if no tab is found
    setTab(selectedTab);
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-green-100 text-[#283618] dark:bg-[#283618] dark:text-[#fefae0]">
      <div className="md:w-56">
        {/* Sidebar */}
        <motion.div
          className="bg-[#606c38] text-white min-h-full shadow-lg"
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 70 }}
        >
          <DashSidebar />
        </motion.div>
      </div>
      <div className="flex-1 p-4">
        {/* Render the corresponding tab component */}
        <motion.div
          className="transition-opacity duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {tab === "profile" && <DashProfile />}
          {tab === "posts" && <DashPosts />}
          {tab === "users" && <DashUsers />}
          {tab === "comments" && <DashComments />}
          {tab === "dash" && <DashboardComp />}
        </motion.div>
      </div>
    </div>
  );
}
