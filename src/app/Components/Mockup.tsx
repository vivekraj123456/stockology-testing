"use client";

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { RiStockFill } from "react-icons/ri";
import Image from "next/image";
import { ChevronRight, TrendingUp, Scale, Bell } from "lucide-react";
import { useRef } from "react";

const FeatureBadge = ({ icon: Icon, text, className, delay = 0 }: { icon: any, text: string, className: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: 1,
      scale: 1,
      y: [0, -10, 0]
    }}
    transition={{
      scale: { delay, duration: 0.6, ease: "easeOut" },
      opacity: { delay, duration: 0.6 },
      y: { repeat: Infinity, duration: 4 + Math.random(), ease: "easeInOut", delay }
    }}
    className={`absolute z-20 flex items-center gap-2 md:gap-4 group ${className}`}
  >
    <div className="relative">
      <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-white/95 backdrop-blur-md border border-green-100 p-2 md:p-3 rounded-2xl shadow-xl group-hover:shadow-green-200/50 transition-all duration-300 text-green-600 group-hover:scale-110">
        <Icon size={18} className="md:w-6 md:h-6" />
      </div>
    </div>

    <div className="flex flex-col bg-white/90 backdrop-blur-md border border-green-50 px-3 md:px-4 py-1.5 md:py-2 rounded-2xl shadow-sm transform group-hover:translate-x-1 transition-all duration-300 overflow-hidden">
      <span className="text-[10px] md:text-[13px] font-black text-gray-800 tracking-tight whitespace-nowrap">
        {text}
      </span>
      <motion.div
        className="h-0.5 bg-green-500 rounded-full mt-0.5"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </div>
  </motion.div>
);

const Mockup = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-[#fdfdfd] lg:py-[120px] md:py-20 py-12 px-4">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-100/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(#22c55e 0.5px, transparent 0.5px)", backgroundSize: "30px 30px" }} />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:grid lg:grid-cols-[1.1fr,0.9fr] gap-12 lg:gap-16 items-center relative z-10">

        {/* Content Side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ y: textY }}
          className="flex flex-col space-y-6 md:space-y-10"
        >
          <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 text-xs md:text-sm font-bold rounded-full uppercase tracking-widest shadow-lg shadow-green-100/50"
            >
              India's Trusted Broker
            </motion.span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#1F2937] leading-[1.05] lg:leading-[0.95] tracking-tight">
              Stockology <br />
              <span className="bg-gradient-to-r from-[#22C55E] via-[#16a34a] to-[#10b981] bg-clip-text text-transparent">
                Secure Your <br /> Future
              </span>
              <br />
              <span className="text-2xl md:text-4xl lg:text-5xl text-gray-500 mt-3 block font-bold">Start Investing Today</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 font-medium max-w-xl leading-relaxed">
              Shape Your Future with Smart Investments. Trade smartly, invest with strategy, and grow your wealth.
            </p>
          </motion.div>

          {/* New Trust Badge Layout */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="flex items-center gap-4 md:gap-6 bg-white border border-gray-200 p-4 md:p-6 rounded-3xl w-fit shadow-xl shadow-black/8 group"
          >
            <div className="bg-gradient-to-br from-[#22C55E] to-[#16a34a] p-3 md:p-4 rounded-2xl text-white shadow-lg group-hover:shadow-green-600/40 transition-all group-hover:scale-110">
              <RiStockFill size={28} />
            </div>
            <div className="flex flex-col border-l border-gray-200 pl-4 md:pl-6">
              <span className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-wider">Active Traders</span>
            </div>
          </motion.div>

          {/* Responsive CTA */}
          <motion.div variants={itemVariants} className="flex flex-col space-y-4 lg:space-y-6">
            <a
              href="https://backoffice.stockologysecurities.com/EKYC/EKYCAccountOpening/Get?RefID=704AF1A76EA24DCEBA655434A385F26E"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-fit"
            >
              <div className="absolute -inset-1.5 bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 rounded-[1.5rem] lg:rounded-[2rem] blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <button className="relative w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-[#1F2937] to-[#111827] hover:from-black hover:to-black text-white px-9 lg:px-14 py-4 lg:py-6 rounded-[1.2rem] lg:rounded-[1.5rem] font-black text-xl lg:text-2xl transition-all shadow-2xl hover:shadow-2xl hover:-translate-y-2 active:scale-95 border border-gray-700">
                Open Demat Account
                <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform truncate" />
              </button>
            </a>

            <p className="text-[11px] md:text-[13px] text-gray-400 font-bold flex items-center gap-1.5 pl-2">
              <span className="text-red-500 font-black animate-pulse">*</span>
              By continuing, I accept Stockology{" "}
              <a href="/Terms-&-Conditions" className="text-[#22C55E] hover:text-green-600 transition-colors underline underline-offset-4">
                T&C and Privacy policy
              </a>
            </p>
          </motion.div>
        </motion.div>

        {/* Visual Mockup Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ y: imgY }}
          className="relative flex justify-center items-center h-[350px] md:h-[500px] lg:h-[600px] w-full"
        >
          {/* Main Visual Containment to prevent Overflow */}
          <div className="relative w-full h-full flex items-center justify-center max-w-[500px] lg:max-w-none">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-green-200/20 rounded-full blur-[80px] -z-10" />

            {/* Responsive Feature Badges */}
            <FeatureBadge
              icon={TrendingUp}
              text="IPO Investments"
              className="top-[5%] left-[0%] md:left-[-5%] lg:left-[-15%]"
              delay={0.4}
            />
            <FeatureBadge
              icon={Scale}
              text="Equity Broking"
              className="bottom-[10%] left-[2%] md:left-[-2%] lg:left-[-10%]"
              delay={0.7}
            />
            <FeatureBadge
              icon={Bell}
              text="Smart Alerts"
              className="top-[40%] right-[0%] md:right-[-5%] lg:right-[-12%]"
              delay={1}
            />

            {/* Dashboard Mockup with Shadow */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [-0.5, 0.5, -0.5]
              }}
              transition={{
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative z-10 w-[85%] lg:w-full max-w-[580px] drop-shadow-[0_50px_100px_rgba(34,197,94,0.35)]"
            >
              <Image
                src="/homemockup1.png"
                alt="Stockology Dashboard"
                width={700}
                height={700}
                className="w-full h-auto select-none pointer-events-none rounded-3xl"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Modern Beams for Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <BackgroundBeams className="opacity-25" />
      </div>
    </div>
  );
};

export default Mockup;