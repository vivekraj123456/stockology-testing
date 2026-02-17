'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from "react";
import { FaChartLine, FaUserShield, FaBolt } from "react-icons/fa";
import { CheckCircle2, Sparkles } from "lucide-react";
import Button from '../Components/Button';
import Value from '../Components/Value';
import FAQSection from '../Components/AppFAQ';


export default function App() {
  const [activeImage, setActiveImage] = useState("/app_show_1.png");
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      icon: <FaChartLine className="text-2xl md:text-3xl text-blue-500" />,
      title: "Real-time Stock Analysis",
      description: "Get real-time stock insights and analysis.",
      image: "/app_show_1.png"
    },
    {
      icon: <FaUserShield className="text-2xl md:text-3xl text-green-500" />,
      title: "Secure Transactions",
      description: "Your investments are protected with end-to-end encryption.",
      image: "/app_show_2.png"
    },
    {
      icon: <FaBolt className="text-2xl md:text-3xl text-yellow-500" />,
      title: "Fast Execution",
      description: "Instant order execution to help you stay ahead in the market.",
      image: "/app_show_3.png"
    },
    {
      icon: <FaBolt className="text-2xl md:text-3xl text-purple-500" />,
      title: "Goal Setting",
      description: "Set your financial goals and track your progress effortlessly.",
      image: "/app_show_4.png"
    },
  ];

  const comparisonRows = [
    {
      feature: "Real-time Market Alerts",
      value: "Instant alerts",
      detail: "Smart notifications with live market triggers.",
    },
    {
      feature: "Lowest Brokerage",
      value: "Cost-efficient",
      detail: "Competitive pricing designed for active traders.",
    },
    {
      feature: "Customer Support",
      value: "Dedicated help",
      detail: "Quick response support from trained experts.",
    },
    {
      feature: "Secure Transactions",
      value: "Bank-level security",
      detail: "Strong protection for account and transaction safety.",
    },
    {
      feature: "Customizable Dashboard",
      value: "Fully flexible",
      detail: "Personalize widgets, watchlists, and key insights.",
    },
  ];

  return (
    <div className='w-full'>
      <section className="w-full relative overflow-hidden bg-gradient-to-b from-green-50 to-white py-20 lg:py-32">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-green-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">

            {/* Left Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left max-w-2xl"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
                Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Trading</span> Experience
              </h1>
              <p className="text-lg md:text-xl text-gray-600 font-medium mt-6 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Stay ahead in the stock market with real-time updates, expert insights, and seamless trading tools designed for modern investors.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-4 text-lg font-bold text-white bg-gray-900 rounded-full shadow-xl hover:bg-gray-800 hover:scale-105 transition-all duration-300">
                  Get Started
                </button>
                <button className="px-8 py-4 text-lg font-bold text-gray-900 bg-white border-2 border-gray-200 rounded-full shadow-md hover:border-green-500 hover:text-green-600 transition-all duration-300">
                  View Features
                </button>
              </div>
            </motion.div>

            {/* Right Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 flex justify-center lg:justify-end relative"
            >
              <div className="relative w-full max-w-[500px] lg:max-w-[600px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-transparent rounded-full blur-2xl transform scale-90" />

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 -left-10 z-20 w-24 md:w-32 drop-shadow-xl"
                >
                  <Image src="/sensex.png" alt="Sensex" width={128} height={128} className="w-full h-auto" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-1/2 -right-8 z-20 w-24 md:w-32 drop-shadow-xl"
                >
                  <Image src="/nifty.png" alt="Nifty" width={128} height={128} className="w-full h-auto" />
                </motion.div>

                <motion.div
                  animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-8 left-10 z-20 w-20 md:w-28 drop-shadow-xl"
                >
                  <Image src="/arrow_3d.png" alt="Growth Arrow" width={128} height={128} className="w-full h-auto" />
                </motion.div>

                <Image
                  src="/App_herosection.png"
                  alt="Stock Trading App Interface"
                  width={800}
                  height={800}
                  quality={100}
                  priority
                  className="relative z-10 w-full h-auto drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-extrabold text-gray-900 mb-4">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Mobile App</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience seamless trading with our feature-rich mobile application designed for both beginners and experts.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">

            {/* Left Section: Mobile Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-[300px] md:w-[350px] lg:w-[400px] flex-shrink-0"
            >
              {/* Phone Frame */}
              <div className="relative z-10 w-full aspect-[9/16] md:aspect-auto md:h-[600px] flex items-center justify-center">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.image}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeImage === feature.image ? 1 : 0,
                      zIndex: activeImage === feature.image ? 10 : 0
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={400}
                      height={800}
                      className="object-contain h-full w-auto"
                      priority={index === 0}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-green-500/20 blur-[80px] -z-10 rounded-full" />
            </motion.div>

            {/* Right Section: Features List */}
            <div className="flex flex-col gap-6 w-full max-w-xl">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => {
                    setActiveImage(feature.image);
                    setActiveIndex(index);
                  }}
                  className={`
                    group cursor-pointer p-6 rounded-2xl border transition-all duration-300
                    ${activeIndex === index
                      ? 'bg-white border-green-500 shadow-lg scale-[1.02]'
                      : 'bg-white border-transparent hover:border-green-200 hover:shadow-md'
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className={`
                      p-3 rounded-xl transition-colors duration-300
                      ${activeIndex === index ? 'bg-green-100' : 'bg-gray-100 group-hover:bg-green-50'}
                    `}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${activeIndex === index ? 'text-gray-900' : 'text-gray-700'}`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 px-6 md:px-20 text-center shadow-2xl">
          {/* Background Glow */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
            >
              Manage Your Wealth <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">On the Go</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto"
            >
              Experience the power of professional trading right in your pocket.
              Real-time data, instant execution, and secure transactions - anytime, anywhere.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-6"
            >
              <Button name={"Google Play"} href={""} image={"/google.svg"} />
              <Button name={"Apple Store"} href={""} image={"/app.png"} />
            </motion.div>
          </div>
        </div>
      </div>

      
      {/* Comparison Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center md:mb-14"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              App Advantage
            </span>
            <h2 className="mt-4 mb-4 text-center text-4xl font-bold text-gray-900 md:text-5xl">
              Why Choose <span className="text-primary">Stockology?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600">
              A premium trading experience built for clarity, speed, and confidence.
            </p>
          </motion.div>

          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_24px_55px_-35px_rgba(22,163,74,0.5)]">
              <div className="grid grid-cols-[1.2fr,1fr] bg-gradient-to-r from-primary via-primary to-emerald-600 text-white">
                <div className="px-8 py-6 text-left text-lg font-semibold">Feature</div>
                <div className="px-8 py-6 text-center text-lg font-semibold">Stockology Advantage</div>
              </div>

              <div className="divide-y divide-gray-100">
                {comparisonRows.map((row, index) => (
                  <motion.div
                    key={row.feature}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className="grid grid-cols-[1.2fr,1fr] items-center bg-white px-8 py-5 transition-colors hover:bg-emerald-50/40"
                  >
                    <div className="pr-4 font-medium text-gray-800">{row.feature}</div>
                    <div className="justify-self-center text-center">
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                        <CheckCircle2 className="h-4 w-4" />
                        {row.value}
                      </span>
                      <p className="mt-2 text-sm text-gray-500">{row.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="mt-8 space-y-4 md:hidden">
            {comparisonRows.map((row, index) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-[0_20px_45px_-35px_rgba(22,163,74,0.45)]"
              >
                <h3 className="text-base font-semibold text-gray-900">{row.feature}</h3>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  {row.value}
                </div>
                <p className="mt-2 text-sm text-gray-600">{row.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Section */}


      {/*About part */}
      {/* <div className="container mx-auto">
        <div
          className="relative bg-cover bg-fixed bg-center flex flex-col justify-between p-6 text-white min-h-[80vh]  mx-auto rounded-xl "
          style={{
            backgroundImage: "url('/app1.jpg')",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backgroundBlendMode: "overlay",
          }}
        >
          
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:text-4xl text-2xl font-extrabold uppercase tracking-wide "
          >
            🚀 Benefits of <span className="text-secondary">Stockology</span>
          </motion.h2>

      
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:text-lg md:pl-16   text-gray-200 max-w-xl leading-relaxed "
          >
            Stockology offers a seamless and intelligent **stock trading experience**, empowering you with **real-time alerts, and zero-commission trades** to maximize your investments.
          </motion.p>

        
          <div className="md:flex  justify-center max-w-7xl items-center mx-auto gap-6 sm:space-y-0 space-y-2 text-white ">
            {[
              { icon: "📊", title: "Real-Time Alerts", desc: "Stay ahead with instant market notifications." },
              // { icon: "🤖", title: "AI Insights", desc: "Smart recommendations tailored to your trading style." },
              { icon: "💰", title: "Zero Commission", desc: "Trade without extra fees, keep more profits." },
              { icon: "🔒", title: "Secure Transactions", desc: "ensures safe investments." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex items-center space-x-1  p-2 bg-white/10 sm:gap-0 gap-4 rounded-lg shadow-md  "
              >
                <span className="text-4xl">{item.icon}</span>
                <div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-200 text-xl "
          >
            Stockology is built for **investors, beginners, and traders** looking for an edge in the stock market. Experience **speed, security, and innovation** in every trade.
          </motion.p>
        </div>
      </div> */}

      <div className='py-2 container mx-auto'>
        <Value />
      </div>

      <div className='container mx-auto'>
        <FAQSection />
      </div>


    </div>
  );
}

