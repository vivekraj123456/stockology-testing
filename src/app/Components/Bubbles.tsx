"use client";

import { motion } from "framer-motion";

export default function Banner() {
  return (
    <motion.div
      className="relative w-full h-40  flex rounded-md items-center justify-center overflow-hidden bg-gradient-to-r from-green-500 to-red-500 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background with Moving Elements */}
      <motion.div className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-red-400 opacity-50 animate-pulse"></motion.div>
      <motion.div
        className="absolute top-0 left-0 w-32 h-32 bg-white opacity-20 rounded-full"
        animate={{ x: [0, 300, -300, 0], y: [0, 150, -150, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      ></motion.div>
      <motion.div
        className="absolute bottom-0 right-0 w-24 h-24 bg-black opacity-10 rounded-full"
        animate={{ x: [0, -200, 200, 0], y: [0, -100, 100, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      ></motion.div>

      {/* Large Text with Justified Center Alignment */}
      <div className="relative z-10 text-center px-4 md:px-8">
        <h1 className="text-2xl md:text-4xl font-extrabold">
          Why Traders & Investors Choose Us
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 pt-5 text-sm md:text-lg">
          <p className="px-2">Customer Support</p>
          <p className="px-2">Trusted & Secure</p>
          <p className="px-2">Advanced Market Analysis</p>
        </div>
      </div>
    </motion.div>
  );
}