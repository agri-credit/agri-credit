import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  // const featuresRef = useRef(null);
  const user = useSelector((state) => state.user.currentUser);
  const [email, setEmail] = useState(user.email);
  // const scrollToFeatures = () => {
  //   featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

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
          subject: "Sbscried",
          text: "sub",
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
    <div
      className={
        "relative flex items-center justify-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100"
      }
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 "
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      ></motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center p-2 text-center">
        <div className="min-h-screen flex flex-col items-center justify-center">
          {/* Header Animation */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-6"
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
            // href="/blogs"
            className="inline-block px-6 py-3 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition duration-300 transform hover:scale-110"
            cursor={true}
            cursorStyle="|"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            e="inline-block px-6 py-3 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition duration-300 transform hover:scale-110"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          >
            <Link to="/sign-up">Get Started</Link>
          </motion.div>
        </div>
        <main className="">
          <section id="features" className="w-full py-12 md:py-24 lg:py-3">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                Key Features
              </h2>
              <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-green-100 p-2">
                    <svg
                      className=" h-6 w-6 text-green-600"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2v20" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">
                    AI-Powered Risk Assessment
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400 mt-2">
                    Intelligent credit scoring using alternative data sources.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-green-100 p-2">
                    <svg
                      className=" h-6 w-6 text-green-600"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m8 6 4-4 4 4" />
                      <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
                      <path d="m20 22-5-5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">
                    Dynamic Loan Structuring
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400 mt-2">
                    Flexible repayment options aligned with harvest cycles.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-green-100 p-2">
                    <svg
                      className=" h-6 w-6 text-green-600"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">
                    Voice-Activated Assistant
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400 mt-2">
                    Easy-to-use interface with voice command support.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to Get Started?
                  </h2>
                  <p className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join AgriCredit today and experience the future of
                    agricultural finance.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2" onSubmit={handleEmailSubmit}>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1 dark:text-black"
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="inline-block px-6 py-3 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition duration-300 transform hover:scale-110"
                    >
                      Subscribe
                    </button>
                  </form>
                  <p className="text-xs text-gray-700 dark:text-gray-400">
                    By subscribing, you agree to our{" "}
                    <Link to={"/t&c"}>Terms & Conditions</Link> and{" "}
                    <Link to={"privacypolicy"}>Privacy Policy</Link>.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
