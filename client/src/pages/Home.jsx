import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { AgriFeatures } from "../components/AgriFeatures";

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
            Agricultural solutions.
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Key Features
              </h2>
            <div className="container px-4 md:px-6 flex justify-items-center">
              <AgriFeatures/>
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
