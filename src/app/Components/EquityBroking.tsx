"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Globe, Users, BarChart3 } from "lucide-react";

const content = [
  {
    title: "Future & Options",
    description: "Trade derivatives smartly ",
    icon: <TrendingUp className="w-6 h-6 text-blue-500" />
  },
  {
    title: "IPO Investments",
    description: "Gain early access to high-growth potential companies.",
    icon: <Globe className="w-6 h-6 text-purple-500" />
  },
  {
    title: "NRI & NRO Accounts",
    description: "Seamless trading solutions for global investors.",
    icon: <Users className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Equity Trading",
    description: "Invest in stocks with strategic insights and risk management.",
    icon: <BarChart3 className="w-6 h-6 text-green-500" />
  },
];

const EquityBroking = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-12">

      {/* Left Side - Image/Visuals */}
      <div className="w-full lg:w-1/2 relative flex justify-center items-center">
        <div className="absolute w-[120%] h-[120%] bg-gradient-to-tr from-green-200/30 to-blue-200/30 rounded-full blur-3xl -z-10"></div>
        <div className="relative z-10 w-full max-w-[500px]">
          <Image
            src="/equity01.png"
            width={600}
            height={600}
            className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            alt="Equity Broking"
          />

          {/* Floating Video/Badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -right-5 md:right-0 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white"
          >
            <video width="100%" height="100%" autoPlay loop muted className="object-cover w-full h-full">
              <source src="/equity.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Content */}
      <motion.div
        className="w-full lg:w-1/2 space-y-8"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div>
          {/* <h2 className="text-sm font-bold text-green-600 tracking-wider uppercase mb-2">Expert Trading</h2> */}
          <h1 className="text-3xl md:text-5xl font-bold text-primary leading-tight">Equity Broking</h1>
          {/* <p className="text-muted-foreground text-lg mt-4 leading-relaxed">
            Personalized equity broking services to help investors make informed decisions, maximize returns, and manage risks effectively.
          </p> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.map((item, index) => (
            <motion.div
              key={index}
              className="p-6 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-green-500/30 transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 p-3 bg-background rounded-xl w-fit shadow-sm group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EquityBroking;
