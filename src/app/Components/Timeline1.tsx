"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Users, Building2, Package, Award, CheckCircle2, TrendingUp, ChevronDown } from "lucide-react";

const timelineData = [
  {
    year: "2020",
    title: "The Team",
    content: "Started our journey with a small yet highly talented and visionary team, driven by passion and innovation.",
    color: "from-blue-600 to-cyan-500",
    icon: Users,
    image: "/journey1.jpg"
  },
  {
    year: "2021",
    title: "The Company",
    content: "Successfully incorporated as a Private Limited Company, marking a strong foundation for future growth.",
    color: "from-green-600 to-emerald-500",
    icon: Building2,
    image: "/journey2.jpg"
  },
  {
    year: "2023",
    title: "The Products",
    content: "Expanded operations and began working with multiple products, strengthening our market presence.",
    color: "from-emerald-600 to-teal-500",
    icon: Package,
    image: "/journey1.jpg"
  },
  {
    year: "2024",
    title: "The Award",
    content: "Recognized as one of the leading firms in the industry, forming trust through performance and consistency.",
    color: "from-teal-600 to-cyan-500",
    icon: Award,
    image: "/journey2.jpg"
  },
  {
    year: "2025",
    title: "NSE Approval",
    content: "Achieved registration with NSE as a Stock Broker, a major milestone in our financial journey.",
    color: "from-cyan-600 to-indigo-500",
    icon: CheckCircle2,
    image: "/journey1.jpg"
  },
  {
    year: "2026",
    title: "The Growth",
    content: "Successfully launched live market operations as a registered stock broker, entering a new era of growth.",
    color: "from-indigo-600 to-purple-500",
    icon: TrendingUp,
    image: "/journey2.jpg"
  },
];

export default function Journey() {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Use a spring-smoothed progress for logic to avoid jank on reverse
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    // Determine active index based on equal parts of the scroll container
    const sectionSize = 1 / timelineData.length;
    const index = Math.min(
      Math.floor(latest / sectionSize),
      timelineData.length - 1
    );

    if (index !== activeCard && index >= 0) {
      setActiveCard(index);
    }
  });

  return (
    <section className="bg-white dark:bg-slate-950 py-20 md:py-32">
      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full border border-green-200 bg-green-50/50 backdrop-blur-sm dark:bg-green-900/10 dark:border-green-800 mb-6"
          >
            <span className="text-green-600 dark:text-green-400 font-black tracking-widest text-[10px] uppercase italic">Our Evolution</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-primary dark:text-white uppercase tracking-tighter mb-6"
          >
            Road to <span className="text-secondary italic">Success</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-light dark:text-gray-400 leading-relaxed font-serif italic max-w-2xl mx-auto"
          >
            From a visionary idea in 2020 to India&apos;s fastest growing brokerage — witness our landmark achievements.
          </motion.p>
        </div>

        {/* Sticky Scroll Flow (Desktop) */}
        <div
          ref={containerRef}
          className="hidden md:flex h-[600vh] relative flex-row items-start gap-20"
        >
          {/* Left Side: Scrolling Content */}
          <div className="relative w-1/2">
            {timelineData.map((item, index) => (
              <div key={item.year} className="h-screen flex flex-col justify-center">
                <motion.div
                  initial={false}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.1,
                    scale: activeCard === index ? 1 : 0.9,
                    x: activeCard === index ? 0 : -30,
                    filter: activeCard === index ? "blur(0px)" : "blur(4px)"
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ width: activeCard === index ? 48 : 24 }}
                      className={`h-1 bg-gradient-to-r ${item.color} rounded-full`}
                    />
                    <span className={`font-black text-lg md:text-xl tracking-tighter uppercase italic transition-colors duration-500 ${activeCard === index ? 'text-secondary' : 'text-primary/40 dark:text-white/20'}`}>Phase {index + 1}</span>
                  </div>
                  <h3 className="text-5xl md:text-7xl font-black text-primary dark:text-white uppercase tracking-tighter leading-none">
                    Year <span className="text-secondary">{item.year}</span> <br />
                    {item.title}
                  </h3>
                  <p className="text-lg md:text-xl text-light dark:text-gray-400 leading-relaxed font-medium max-w-lg">
                    {item.content}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Right Side: Sticky Visual Panel */}
          <div className="h-screen sticky top-0 w-1/2 flex items-center justify-center self-start">
            <div className="relative w-full aspect-[4/5] max-w-md">
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${timelineData[activeCard].color} opacity-20 rounded-[3rem] blur-[80px] transition-all duration-1000`} />

              <div className="relative h-full w-full rounded-[4rem] overflow-hidden border border-gray-100 dark:border-slate-800 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-white dark:bg-slate-900 group">
                {/* Removed 'wait' mode to allow fluid overlapping cross-fades on fast scroll/reverse */}
                <AnimatePresence>
                  <motion.div
                    key={activeCard}
                    initial={{ opacity: 0, scale: 1.1, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                  >
                    {/* Image Layer with subtle zoom */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <motion.div
                        animate={{ scale: [1, 1.05] }}
                        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={timelineData[activeCard].image}
                          alt={timelineData[activeCard].title}
                          fill
                          className="object-cover opacity-70 grayscale group-hover:grayscale-0 transition-all duration-1000"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 z-10" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${timelineData[activeCard].color} opacity-20 mix-blend-overlay z-10`} />
                    </div>

                    {/* Content Layer (Over Image) - Sharp and Focused */}
                    <div className="absolute inset-x-10 bottom-16 z-40 space-y-8">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-secondary/80 font-black text-xs uppercase tracking-widest italic drop-shadow-sm"
                          >
                            Milestone Reached
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none drop-shadow-md"
                          >
                            {timelineData[activeCard].year}
                          </motion.div>
                        </div>

                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] transform group-hover:scale-110 transition-transform duration-500"
                        >
                          {(() => {
                            const Icon = timelineData[activeCard].icon;
                            return <Icon className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={1} />;
                          })()}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Glass Frame Overlay */}
                <div className="absolute inset-0 border-[24px] border-white/5 pointer-events-none z-30" />
              </div>

              {/* External decorative badge */}
              <motion.div
                key={`badge-${activeCard}`}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 15 }}
                className="absolute -top-8 -right-8 w-28 h-28 rounded-[2rem] bg-secondary shadow-2xl flex items-center justify-center z-50 border-8 border-white dark:border-slate-950 transform hover:scale-110 transition-transform duration-300"
              >
                <span className="text-3xl font-black text-white italic">Go</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Improved Vertical Layout (Mobile) */}
        <div className="md:hidden space-y-16">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative rounded-[3rem] bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 shadow-xl overflow-hidden"
            >
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-secondary font-black text-2xl tracking-tighter italic">{item.year}</span>
                  <item.icon className="w-8 h-8 text-secondary/40" />
                </div>
                <h3 className="text-3xl font-black text-primary dark:text-white uppercase tracking-tighter">{item.title}</h3>
                <p className="text-light dark:text-gray-400 font-medium">{item.content}</p>
              </div>

              {/* Subtle background image for mobile cards */}
              <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
                <Image src={item.image} alt="" fill className="object-cover" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Scroll Prompt */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex flex-col items-center mt-20 md:mt-0 opacity-40"
      >
        <span className="text-[10px] uppercase font-black tracking-[0.2em] mb-2 dark:text-white">Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 text-secondary" />
      </motion.div>
    </section>
  );
}
