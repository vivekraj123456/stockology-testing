"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, Target, Heart, Sparkles } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const Vision = () => {
  return (
    <div className="relative py-16 md:py-28 overflow-hidden bg-gradient-to-b from-white via-green-50/40 to-white dark:from-slate-950 dark:via-green-950/10 dark:to-slate-950">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/25 dark:bg-green-500/8 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/25 dark:bg-emerald-500/8 rounded-full blur-3xl" />

      <motion.div
        className="container mx-auto px-4 md:px-6 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 bg-clip-text text-transparent">
              Our Foundation
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Built on strong principles to empower your investment journey
          </p>
        </motion.div>

        {/* Vision & Mission Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12"
          variants={containerVariants}
        >
          {/* Vision Card */}
          <motion.div variants={fadeInUp}>
            <motion.div
              className="relative h-full bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 border-2 border-green-300 dark:border-green-700 shadow-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl mb-6 group-hover:shadow-2xl group-hover:shadow-green-500/40"
                  whileHover={{ rotate: 360, scale: 1.15 }}
                  transition={{ duration: 0.6 }}
                >
                  <Eye className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  Our Vision
                  <Sparkles className="w-5 h-5 text-green-500" />
                </h3>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                  To become India's most trusted platform for empowering investors with real-time insights and intelligent investment tools.
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400/15 to-transparent rounded-bl-full" />
            </motion.div>
          </motion.div>

          {/* Mission Card */}
          <motion.div variants={fadeInUp}>
            <motion.div
              className="relative h-full bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 border-2 border-emerald-300 dark:border-emerald-700 shadow-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-xl mb-6 group-hover:shadow-2xl group-hover:shadow-emerald-500/40"
                  whileHover={{ rotate: 360, scale: 1.15 }}
                  transition={{ duration: 0.6 }}
                >
                  <Target className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  Our Mission
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                </h3>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                  We aim to provide seamless access to market trends and investment strategies so that every user can navigate financial markets with confidence and clarity.
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-400/15 to-transparent rounded-bl-full" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Values Card - Full Width */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scaleIn}
        >
          <motion.div
            className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden group"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated Background Pattern */}
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Icon */}
              <motion.div
                className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg mb-5 mx-auto"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={2.5} fill="white" />
              </motion.div>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                Our Values
                <Sparkles className="w-6 h-6 text-white/90" />
              </h3>

              {/* Description */}
              <p className="text-white/95 text-sm md:text-lg leading-relaxed max-w-3xl mx-auto font-medium">
                We believe in transparency, data-driven analysis, and investor empowerment. Through reliable tools and honest communication, we help you make smarter investment decisions.
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Vision;