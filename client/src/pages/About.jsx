import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const About = () => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center bg-green-800 text-[#283618] dark:bg-[#283618] dark:text-[#fefae0]`}
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-300 dark:from-green-700 dark:to-green-900"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      ></motion.div>

      <div className="relative z-10 p-6 text-center">
        {/* Header Animation */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4caf50] to-[#8bc34a] mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          About AgriCredit
        </motion.h1>

        {/* Paragraph Animation */}
        <motion.p
          className="text-lg md:text-xl mb-8 max-w-lg mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          At AgriCredit, we empower farmers by providing innovative financial
          solutions tailored to their needs. Our platform combines advanced
          technology with a deep understanding of agriculture, enabling farmers
          to access resources, insights, and support for sustainable farming
          practices.
        </motion.p>

        {/* Button Animation */}
        <motion.a
          href="mailto:rohith018.r@gmail.com"
          className="inline-block px-6 py-3 bg-[#4caf50] text-white rounded-full shadow-lg hover:bg-[#8bc34a] transition duration-300 transform hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        >
          Contact Us
        </motion.a>
      </div>
    </div>
  );
};

export default About;
