import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [email, setEmail] = useState(user?.email);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          subject: "Subscribed",
          text: "Subscription successful",
          html: "<b>Title</b>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, aspernatur.",
        }),
      });
      if (response.ok) {
        alert("Thank you for subscribing!");
        setEmail("");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send email. Please try again later.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-700 dark:to-green-900"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      ></motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center p-2 text-center">
        <div className="min-h-screen flex flex-col items-center justify-center">
          {/* Header Animation */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#e76f51] to-[#dda15e] mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Welcome to <br />
            <span className="inline-block">
              <Typewriter
                words={["AI-Powered Credit", "Risk Management"]}
                loop={0}
                cursor={true}
                cursorStyle="|"
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={1000}
              />
            </span>
            for Farmers
          </motion.h1>

          {/* Paragraph Animation */}
          <motion.p
            className="text-lg md:text-xl mb-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            AgriCredit: Empowering farmers with accessible, intelligent
            financial solutions.
          </motion.p>

          {/* Button Animation */}
          <motion.div
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          >
            <Link to="/sign-up">Get Started</Link>
          </motion.div>
        </div>

        <main className="w-full">
          <section id="features" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Key Features
              </h2>
              <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                {[
                  {
                    title: "AI-Powered Risk Assessment",
                    description:
                      "Intelligent credit scoring using alternative data sources.",
                    color: "#e9c46a",
                    iconPath:
                      "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
                  },
                  {
                    title: "Dynamic Loan Structuring",
                    description:
                      "Flexible repayment options aligned with harvest cycles.",
                    color: "#dda15e",
                    iconPath:
                      "M8 6L12 2l4 4M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22m16-4l-5-5",
                  },
                  {
                    title: "Voice-Activated Assistant",
                    description:
                      "Easy-to-use interface with voice command support.",
                    color: "#e76f51",
                    iconPath:
                      "M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5zM18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center text-center bg-green-100 dark:bg-green-800 bg-glass p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className={`mb-4 rounded-full p-2`}
                      style={{ backgroundColor: feature.color }}
                    >
                      <svg
                        className="h-6 w-6 text-[#283618]"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d={feature.iconPath} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-[#606c38] dark:text-[#fefae0] mt-2">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Stay Updated
                  </h2>
                  <p className="text-lg text-[#606c38] dark:text-[#fefae0]">
                    Subscribe to get the latest updates.
                  </p>
                </div>

                <form
                  className="w-full max-w-md flex items-center justify-center"
                  onSubmit={handleEmailSubmit}
                >
                  <input
                    className="w-full py-2 px-4 rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e76f51] dark:bg-[#606c38] dark:text-white"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="inline-block px-6 py-2 bg-[#e76f51] text-[#fefae0] rounded-r-md shadow-lg hover:bg-[#dda15e] transition duration-300"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
