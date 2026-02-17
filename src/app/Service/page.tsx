"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Zap, TrendingUp, BarChart2, Globe, BookOpen } from "lucide-react";
import Image from "next/image";

// Importing Service Components
import Service1 from "../Components/Service1";
import EquityBroking from "../Components/EquityBroking";
import IPO from "../Components/IPO";
import MutualFunds from "../Components/MutualFunds";
import FinancialEducation from "../Components/FinancialEducation";
import MobileOnline from "../Components/Mobile&Online";

const ServicePage = () => {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen font-sans selection:bg-secondary/20 overflow-x-hidden pt-20">

      {/* Premium Service Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-100/50 dark:bg-green-900/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/50 dark:bg-emerald-900/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
                <ShieldCheck className="w-4 h-4 text-secondary mr-2" />
                <span className="text-secondary font-black tracking-widest text-[10px] uppercase">Professional Financial Solutions</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-primary dark:text-white uppercase tracking-tighter leading-none">
                Elevate Your <br />
                <span className="text-secondary italic underline decoration-secondary/30 decoration-8 underline-offset-8">Financial Journey</span>
              </h1>

              <p className="text-xl text-light dark:text-gray-400 font-medium leading-relaxed max-w-lg italic font-serif">
                &quot;From institutional broking to personalized wealth management, we provide the tools and intelligence you need to dominate the markets.&quot;
              </p>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-primary dark:text-white tracking-tighter">10+</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Services</span>
                </div>
                <div className="h-10 w-px bg-gray-200 dark:bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-primary dark:text-white tracking-tighter">Expert Support</span>
                  {/* <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Expert Support</span> */}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-video rounded-[3rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-[0_32px_80px_rgba(0,0,0,0.15)] group">
                <Image
                  src="/service.jpg"
                  alt="Financial Services"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-20">
                  <div className="text-white">
                    <div className="font-black text-[10px] uppercase tracking-[0.2em] opacity-80 mb-1">Stockology Exclusive</div>
                    <div className="text-2xl font-black tracking-tighter">Premium Portfolios</div>
                  </div>
                  <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-white shadow-xl rotate-[-10deg] group-hover:rotate-0 transition-transform">
                    <Zap className="w-6 h-6 fill-white" />
                  </div>
                </div>
              </div>

              {/* Floating Decorative Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-white dark:bg-slate-900 rounded-full shadow-2xl flex items-center justify-center p-4 border border-gray-100 dark:border-slate-800 hidden md:flex"
              >
                <div className="text-center">
                  <div className="text-secondary font-black text-2xl">99%</div>
                  <div className="text-[8px] font-black uppercase tracking-widest leading-none">Successful <br />Executions</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Service Layout */}
      <div className="space-y-0">

        {/* Service Overview Cards */}
        <section className="py-24 bg-[#fbfdfc] dark:bg-slate-950/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black text-primary dark:text-white uppercase tracking-tighter leading-tight mb-6">
                Our Core <span className="text-secondary">Ecosystem</span>
              </h2>
              <div className="h-1 w-24 bg-secondary mx-auto mb-8 rounded-full" />
              <p className="text-lg text-light dark:text-gray-400 font-medium italic">
                A comprehensive suite of financial instruments designed for modern traders and long-term investors alike.
              </p>
            </div>
            <Service1 />
          </div>
        </section>

        {/* Equity Broking Section */}
        <div id="equity" className="bg-white dark:bg-slate-950">
          <EquityBroking />
        </div>

        {/* IPO Investment Section */}
        <section className="py-24 md:py-32 bg-[#fbfdfc] dark:bg-slate-950/50 border-y border-gray-100 dark:border-white/5">
          <IPO />
        </section>

        {/* Mutual Funds Section */}
        <div id="Mutual-funds" className="bg-white dark:bg-slate-950">
          <MutualFunds />
        </div>

        {/* Financial Education Section */}
        <section className="py-24 md:py-32 bg-[#fbfdfc] dark:bg-slate-950/50">
          <FinancialEducation />
        </section>

        {/* Mobile & Online Trading Solution */}
        <div className="bg-white dark:bg-slate-950">
          <MobileOnline />
        </div>

      </div>

      {/* Final Premium CTA Section */}
      <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto relative bg-[#1a3a34] dark:bg-white/5 rounded-[4rem] p-16 md:p-24 overflow-hidden shadow-2xl border border-white/5 group">
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 text-left">
                <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                  Ready to trade <br />
                  <span className="text-secondary italic">smarter</span>?
                </h3>
                <p className="text-xl text-white/70 font-medium italic">
                  Join thousands of Indian investors moving their portfolios to a faster, more transparent brokerage experience.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="https://backoffice.stockologysecurities.com/EKYC/EKYCAccountOpening/Get?RefID=704AF1A76EA24DCEBA655434A385F26E">
                    <button className="bg-white text-[#1a3a34] px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:translate-y-[-4px] transition-all active:scale-95">
                      Open Account
                    </button>

                  </a>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src="/service.jpg"
                    alt="Join Stockology"
                    fill
                    className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/10 backdrop-blur-3xl rounded-full flex items-center justify-center border border-white/20">
                      <ArrowRight className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
