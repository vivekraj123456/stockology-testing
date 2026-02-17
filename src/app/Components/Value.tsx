"use client";

import React from "react";
import { motion } from "framer-motion";
import Card from "./Card";

const Value = () => {
  return (
    <div className="container mx-auto px-3 md:py-20 py-10 relative overflow-hidden">
      {/* Background Waves */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 z-0"></div>
      <svg className="absolute top-0 left-0 w-full h-auto" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="white" d="M0,160L48,154.7C96,149,192,139,288,154.7C384,171,480,213,576,213.3C672,213,768,171,864,144C960,117,1056,107,1152,122.7C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
      </svg>

      <div className="max-w-7xl mx-auto relative z-10 text-white text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl text-primary font-bold"
        >
          Why Choose STOCKOLOGY?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl mt-4 text-light"
        >
          Empowering investors with trust, transparency, and technology.
        </motion.p>
      </div>

      {/* Investment Options */}
      <div className="flex justify-center mt-10 relative z-10">
        <motion.div
          className='md:grid grid-cols-2 md:gap-8'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className='mt-5'><Card name={'Intraday Trading'} /></div>
          <div className='mt-5'><Card name={'Delivery Trading'} /></div>
          <div className='mt-5'><Card name={'Future  Trading'} /> </div>
          <div className='mt-5'><Card name={' Option Trading'} /></div>
          {/* <div className='mt-5'><Card name={'NRI & NRO accounts'}/></div> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Value;
