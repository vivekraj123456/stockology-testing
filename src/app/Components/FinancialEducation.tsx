"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, ArrowRightLeft, Boxes, PieChart, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const content = [
  {
    title: "Equity Market",
    description:
      "The equity market, or stock market, is where shares of publicly listed companies are bought and sold. Investors buy shares to own a part of a company, and they earn profits through price appreciation and dividends.",
    image: "/equity101.svg",
    icon: <TrendingUp className="w-8 h-8" />,
    points: ["Invest in shares", "Earn dividends", "Long-term growth potential"],
  },
  {
    title: "Derivative Market",
    description:
      "Derivatives are financial contracts whose value depends on the price of an underlying asset, such as stocks, commodities, or interest rates. The most common types of derivatives are options, futures, and swaps.",
    image: "/equity105.svg",
    icon: <ArrowRightLeft className="w-8 h-8" />,
    points: ["Manage risk", "Leverage trading", "High potential returns"],
  },
  {
    title: "Commodity Market",
    description:
      "The commodity market involves trading raw materials or primary agricultural products like oil, gold, silver, wheat, and natural gas.",
    image: "/equity104.svg",
    icon: <Boxes className="w-8 h-8" />,
    points: ["Trade raw materials", "Hedge against inflation", "Diverse asset classes"],
  },
  {
    title: "Investment Strategy",
    description:
      "Investment strategy refers to the approach an investor uses to meet their financial goals. This includes asset selection, diversification, risk management, and time horizon.",
    image: "/equity103.svg",
    icon: <PieChart className="w-8 h-8" />,
    points: ["Diversification", "Risk management", "Long-term planning"],
  },
  {
    title: "Hedging",
    description:
      "Hedging is a risk management strategy used to offset potential losses in investments by taking an opposite position in a related asset.",
    image: "/equity102.svg",
    icon: <ShieldCheck className="w-8 h-8" />,
    points: ["Reduce investment risk", "Use derivatives", "Protect assets"],
  },
  {
    title: "Mutual Funds",
    description:
      "Mutual funds pool money from many investors to purchase securities. They offer diversification and professional management.",
    image: "/equity101.svg", // Reusing image or need a new one
    icon: <PieChart className="w-8 h-8" />,
    points: ["Professional management", "Diversification", "Liquidity"],
  }
];

const FinancialEducation = () => {
  const [selected, setSelected] = useState(content[0]);

  // Auto change selected content every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelected((prev) => {
        const nextIndex = (content.indexOf(prev) + 1) % content.length;
        return content[nextIndex];
      });
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto text-center py-16">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">Financial Education</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Empower yourself with the knowledge to navigate the financial markets confidently.
        </p>
      </motion.div>

      {/* Icons Row */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
        {content.slice(0, 5).map((item, index) => ( // Limiting to 5 to fit nicely or I can show all
          <div
            key={index}
            className={`flex flex-col items-center cursor-pointer group transition-all duration-300 ${selected.title === item.title ? "scale-110" : "opacity-70 hover:opacity-100"
              }`}
            onClick={() => setSelected(item)}
          >
            <div className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl shadow-sm transition-colors duration-300 ${selected.title === item.title
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card text-muted-foreground hover:bg-green-100 dark:hover:bg-green-900/20 hover:text-green-600"
              }`}>
              {item.icon}
            </div>
            <p className={`mt-3 text-sm md:text-base font-semibold transition-colors ${selected.title === item.title ? "text-primary" : "text-muted-foreground"
              }`}>
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Description & Image Section */}
      <div className="bg-card rounded-3xl shadow-xl border border-border/50 overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center"
          >
            {/* Left Side: Description */}
            <div className="text-left space-y-6">
              <h2 className="text-3xl font-bold text-primary">{selected.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {selected.description}
              </p>
              <ul className="space-y-3">
                {selected.points.map((point, index) => (
                  <li key={index} className="flex items-center text-muted-foreground bg-secondary/50 px-4 py-2 rounded-lg w-fit">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side: Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[400px] aspect-[4/3]">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  layout="fill"
                  objectFit="contain"
                  className="drop-shadow-xl"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FinancialEducation;
