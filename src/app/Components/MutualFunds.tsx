"use client";

import React from "react";
import Image from "next/image";
import { PieChart, Users, Banknote, ArrowRightLeft, BadgePercent, Scale } from "lucide-react";
import { motion } from "framer-motion";

const images = ["/mutualimage.jpg", "/mutualimage01.png", "/mutualimage03.png", "/mutualimage04.png"];

const content = [
  { title: "Diversified Investment", icon: <PieChart className="w-10 h-10" /> },
  { title: "Professional Fund Management", icon: <Users className="w-10 h-10" /> },
  { title: "Systematic Investment Plan (SIP)", icon: <Banknote className="w-10 h-10" /> },
  { title: "Liquidity & Accessibility", icon: <ArrowRightLeft className="w-10 h-10" /> },
  { title: "Tax-Saving Benefits", icon: <BadgePercent className="w-10 h-10" /> },
  { title: "Risk-Adjusted Returns", icon: <Scale className="w-10 h-10" /> },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.1 } },
};

const MutualFunds = () => {
  return (
    <motion.div
      className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6">Mutual Funds</h1>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-12">
        Mutual funds offer professional management, risk diversification, and accessibility, making them a preferred investment choice for wealth creation.
      </p>

      <div className="flex flex-col lg:flex-row w-full gap-12 items-center">
        {/* Left Side - Image Arrangement */}
        <motion.div
          className="relative w-full lg:w-1/2 flex justify-center items-center min-h-[400px]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Image */}
          <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-8 border-background shadow-2xl z-10">
            <Image src={images[0]} layout="fill" objectFit="cover" alt="Mutual Funds Main" />
          </div>

          {/* Floating Images */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 md:left-10 w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl z-20"
          >
            <Image src={images[1]} layout="fill" objectFit="cover" alt="Detail 1" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 right-0 md:right-10 w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl z-20"
          >
            <Image src={images[2]} layout="fill" objectFit="cover" alt="Detail 2" />
          </motion.div>

          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-10 right-4 md:right-0 w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden border-4 border-white shadow-xl z-0"
          >
            <Image src={images[3]} layout="fill" objectFit="cover" alt="Detail 3" />
          </motion.div>
        </motion.div>

        {/* Right Side - Icons & Titles */}
        <motion.div
          className="w-full lg:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {content.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="flex flex-col items-center justify-center p-6 bg-card rounded-2xl shadow-sm hover:shadow-lg border border-border/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="text-green-600 mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-sm md:text-base font-semibold text-primary text-center leading-tight">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MutualFunds;
