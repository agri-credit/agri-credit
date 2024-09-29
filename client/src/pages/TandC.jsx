import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div
                className="text-center max-w-2xl"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Terms and Conditions
                </h1>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    <Typewriter
                        words={["This page is coming soon. Stay tuned"]}
                        cursorColor="transparent"
                        typeSpeed={50}
                        delaySpeed={1000}
                        loop={1}  // Repeat indefinitely
                    />
                </div>

                <Link
                    to="/"
                    className="inline-block px-6 py-2 text-sm font-semibold text-teal-500 border border-teal-500 rounded-lg hover:bg-teal-500 hover:text-white transition-colors duration-300"
                >
                    Return Home
                </Link>
            </motion.div>
        </motion.div>
    );
}
