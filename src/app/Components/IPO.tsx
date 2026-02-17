"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function IPO() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:py-16 py-12">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">
          IPO Investment Opportunities
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover high-growth potential by investing in promising companies at an early stage.
        </p>
      </motion.div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Image with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full -z-10 transform scale-90"></div>
          <Image
            src="/IPOimage.png"
            alt="IPO Investment"
            width={550}
            height={500}
            className="w-full max-w-[500px] h-auto rounded-2xl shadow-2xl hover:scale-[1.02] transition-transform duration-500"
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 space-y-8"
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-primary">
            Why Invest in IPOs?
          </h3>

          <ul className="space-y-4">
            {[
              "Opportunity for High Returns",
              "Exposure to Emerging Companies",
              "Access to Early-Stage Growth",
              "Potential for Long-Term Value",
            ].map((benefit, index) => (
              <motion.li
                key={index}
                className="flex items-center space-x-4 text-lg text-muted-foreground"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle2 className="text-green-500 w-6 h-6 flex-shrink-0" />
                <span>{benefit}</span>
              </motion.li>
            ))}
          </ul>

          <p className="text-base text-muted-foreground leading-relaxed">
            Investing in IPOs provides an opportunity to be part of a company&apos;s
            journey from the start. However, thorough research and due diligence
            are essential before making investment decisions.
          </p>

          {/* CTA Button with Animation */}
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="inline-block">
            {/* <Link href="/IPOInvestments"> */}
            <button className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-lg font-medium rounded-full shadow-lg hover:bg-primary/90 transition duration-300">
              Explore More <ArrowRight className="w-5 h-5" />
            </button>
            {/* </Link> */}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
