"use client";

import MeetOurDirectors from "../Components/Directors";
import Vision from "../Components/Visionandmision";
import Image from "next/image";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const About = () => {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen font-sans selection:bg-secondary/20 overflow-x-hidden pt-20">



      {/* Stockology Info Section Refined */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-1 w-12 bg-secondary rounded-full" />
                  <span className="text-secondary font-black uppercase text-[10px] tracking-widest italic">The Mission</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-primary dark:text-white uppercase tracking-tighter leading-tight">
                  Democratizing <br />
                  <span className="text-secondary italic">Investing</span>
                </h2>
              </div>

              <div className="space-y-6 text-lg md:text-xl text-light dark:text-gray-400 leading-relaxed font-serif italic max-w-xl">
                <p>
                  Stockology is your gateway to understanding the stock market with precision and clarity.
                  We provide in-depth insights, market trends, and the latest strategies to help you make informed decisions.
                </p>
                <div className="h-px w-full bg-gray-100 dark:bg-white/5" />
                <p className="text-base font-sans not-italic text-light/70 dark:text-gray-500">
                  Whether you&apos;re a beginner or an expert trader, Stockology empowers you to navigate the financial world with confidence.
                </p>
              </div>
            </div>

            <div className="relative group lg:pl-10">
              <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden border-4 border-white dark:border-slate-950 shadow-2xl transition-all duration-1000 group-hover:scale-[1.02]">
                <Image
                  src="/about.png"
                  alt="Financial Excellence"
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 z-20">
                  <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-2xl inline-flex">
                    <div className="w-10 h-10 bg-secondary rounded-2xl flex items-center justify-center text-white">
                      <Zap className="w-5 h-5 fill-white" />
                    </div>
                    <div className="text-white">
                      <div className="font-black text-[9px] uppercase tracking-widest">Philosophy</div>
                      <div className="text-base font-bold tracking-tight">Transparency</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Component */}
      <MeetOurDirectors />
      {/* Vision & Mission Sections */}
      <Vision />

      {/* Wisdom Quote Section */}
      <section className="py-24 relative overflow-hidden bg-[#fbfdfc] dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto relative bg-[#1a3a34] dark:bg-white/5 rounded-[4rem] p-12 md:p-20 overflow-hidden shadow-2xl border border-white/5 group">
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            <span className="absolute left-6 top-6 text-[15rem] text-white/5 font-serif pointer-events-none italic leading-none select-none">“</span>
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              className="relative z-10 space-y-8 text-center"
            >
              <h3 className="text-2xl md:text-4xl font-black text-white leading-tight italic max-w-4xl mx-auto tracking-tighter">
                &quot;Wealth flows from the impatient to the patient—it&apos;s not about timing, but <span className="text-secondary">time in the market</span>.&quot;
              </h3>
              <div className="flex flex-col items-center gap-4">
                <div className="h-0.5 w-16 bg-secondary rounded-full" />
                <div className="text-secondary font-black tracking-[0.4em] uppercase text-[9px]">The Stockology Credo</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
