"use client";

import { motion } from "framer-motion";
import { TrendingUp, LineChart, BarChart3, Activity, PieChart, CandlestickChart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaChartLine, FaShieldAlt, FaUsers, FaLightbulb, FaHandshake, FaCheckCircle } from "react-icons/fa";

const features = [
  { icon: <FaChartLine />, title: "Real-time Analytics", description: "" },
  { icon: <FaShieldAlt />, title: "Secure Platform", description: "" },
  { icon: <FaUsers />, title: "Expert Support", description: "" },
];

const movingIcons = [
  { icon: <FaChartLine />, name: "Market Analysis" },
  { icon: <FaShieldAlt />, name: "Secure Investments" },
  { icon: <FaUsers />, name: "Community Driven" },
  { icon: <FaLightbulb />, name: "Smart Strategies" },
  { icon: <FaHandshake />, name: "Trusted Partnerships" },
];

const floatingIcons = [
  { Icon: TrendingUp, position: "top-10 left-10", size: 45, duration: 4 },
  { Icon: PieChart, position: "top-20 right-1/4", size: 40, duration: 4.5 },
  { Icon: LineChart, position: "bottom-20 right-10", size: 40, duration: 4.5 },
  { Icon: BarChart3, position: "top-1/4 right-20", size: 38, duration: 5 },
  { Icon: Activity, position: "bottom-10 left-1/3", size: 35, duration: 4.2 },
  { Icon: CandlestickChart, position: "bottom-20 left-10", size: 40, duration: 4.5 },
];

const WhyChooseUs = () => {
  return (
    <section
      id="why-choose-us"
      className="relative py-28 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating Stock Icons */}
      {floatingIcons.map(({ Icon, position, size, duration }, index) => (
        <motion.div
          key={index}
          className={`absolute ${position} text-white/20 hidden lg:block`}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ repeat: Infinity, duration, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <Icon size={size} className="drop-shadow-lg" />
        </motion.div>
      ))}

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* Left Side: Enhanced Image Card */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full max-w-lg">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-white/20 blur-3xl rounded-3xl transform scale-95"></div>

              <motion.div
                className="relative bg-white/10 backdrop-blur-lg border-2 border-white/30 shadow-2xl rounded-3xl overflow-hidden p-6"
                animate={{ y: [0, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/whobg.jpg"
                  alt="Stockology Team"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover rounded-2xl shadow-xl"
                  priority
                />

                {/* Overlay Badge */}
                <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <p className="text-green-600 font-bold text-sm flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    Trusted Platform
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block self-start"
            >
              <span className="px-5 py-2 bg-white/20 border border-white/30 rounded-full text-white text-sm font-semibold backdrop-blur-sm shadow-lg">
                Why Choose Us
              </span>
            </motion.div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-2xl leading-tight">
              Your Trusted Partner in{" "}
              <span className="text-white/90">Smart Trading</span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              At <span className="font-bold text-white">Stockology</span>, we empower traders with cutting-edge tools, real-time insights,to navigate fast-moving markets with confidence.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="text-3xl text-white mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-white/80">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link href="/About" passHref>
                <motion.button
                  className="group relative bg-white text-green-600 font-bold py-4 px-10 rounded-full shadow-2xl transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Learn more about Stockology"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Learn More About Us
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Moving Icons Ticker */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-green-800/40 backdrop-blur-sm border-t border-white/10 flex items-center overflow-hidden">
        <motion.div
          className="flex space-x-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {/* Duplicate for seamless loop */}
          {[...movingIcons, ...movingIcons].map((item, index) => (
            <div key={index} className="flex items-center space-x-3 text-white text-base px-6">
              <span className="text-3xl text-white/90">{item.icon}</span>
              <p className="font-semibold">{item.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
