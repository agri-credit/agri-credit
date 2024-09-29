import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const About = () => {
    const { theme } = useSelector(state => state.theme);

    return (
        <div className={`relative min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100`}>
            {/* Background Animation */}
            <motion.div
                className="absolute inset-0"
                animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            ></motion.div>

            <div className="relative z-10 p-6 text-center">
                {/* Header Animation */}
                <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    About Us
                </motion.h1>

                {/* Paragraph Animation */}
                <motion.p
                    className="text-lg md:text-xl mb-8 max-w-lg mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                >
                    At ThoughtPulse, we share the latest and most groundbreaking ideas. Our platform is where creativity meets innovation, and where you can explore the future of technology and trends.
                </motion.p>

                {/* Button Animation */}
                <motion.a
                    href="mailto:rohith018.r@gmail.com"
                    className="inline-block px-6 py-3 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition duration-300 transform hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 1 }}
                >
                    Contact Us
                </motion.a>
            </div>
        </div>
    );
};

export default About;
