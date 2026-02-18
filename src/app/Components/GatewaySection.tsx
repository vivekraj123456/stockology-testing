"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";

const featureItems = ["Real-time Data", "Advanced Chart", "Smart Tools"];

const GatewaySection = () => {
  return (
    <section className="relative isolate w-full overflow-hidden bg-gradient-to-br from-green-700 via-emerald-600 to-green-700 py-16 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.14),transparent_45%)]" />

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full space-y-7 text-white lg:w-1/2"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex rounded-full border border-white/35 bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm"
            >
              Your Investment Partner
            </motion.div>

            <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Your Gateway to <br />
              <span>Smarter Investments</span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-3"
          >
            {featureItems.map((feature) => (
              <span
                key={feature}
                className="rounded-lg border border-white/30 bg-white/18 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-sm"
              >
                {feature}
              </span>
            ))}
          </motion.div>

          <motion.a
            href="https://play.google.com/store/search?q=stockology&c=apps"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 font-bold text-green-700 shadow-2xl transition-all duration-300 hover:bg-green-50"
          >
            Explore Our App
            <svg
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </motion.a>
        </motion.div>

        <div className="w-full lg:w-1/2">
          <div className="relative mx-auto flex h-[360px] w-full max-w-[520px] items-center justify-center sm:h-[420px] md:h-[500px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="relative z-20"
            >
              <div className="absolute inset-0 scale-110 rounded-full bg-white/20 blur-3xl" />

              <Image
                src="/GatewaySection.png"
                alt="Stockology Trading App Interface"
                width={360}
                height={360}
                className="relative z-10 h-auto w-full max-w-[220px] drop-shadow-2xl sm:max-w-[280px] md:max-w-[320px]"
                priority
              />
            </motion.div>

            <OrbitingCircles
              radius={210}
              duration={24}
              path
              iconSize={88}
              className="z-30"
            >
              {["/element_1.png", "/element_2.png", "/element_3.png", "/element_4.png"].map(
                (src, index) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: 0.18 + index * 0.12 }}
                    className="transition-transform duration-300 hover:scale-105"
                  >
                    <Image
                      src={src}
                      alt={`Investment element ${index + 1}`}
                      width={96}
                      height={96}
                      className="h-16 w-16 object-contain sm:h-20 sm:w-20"
                      loading="eager"
                    />
                  </motion.div>
                ),
              )}
            </OrbitingCircles>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GatewaySection;
