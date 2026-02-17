"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";

const GatewaySection = () => {
    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 py-24 md:py-40">
            {/* Enhanced Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 opacity-90"></div>

            {/* Subtle Dot Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
            }}></div>

            {/* Soft Glow Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full lg:w-1/2 text-white space-y-8"
                    >
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="inline-block"
                            >
                                <span className="px-4 py-2 bg-white/20 border border-white/30 rounded-full text-white text-sm font-semibold backdrop-blur-sm shadow-lg">
                                    🚀 Your Investment Partner
                                </span>
                            </motion.div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
                                Your Gateway to <br />
                                <span className="text-white">
                                    Smarter Investments
                                </span>
                            </h2>
                        </div>

                        {/* <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl drop-shadow">
                            Navigate the markets with confidence. Stockology combines real-time insights, advanced analytics, and expert-driven strategies to help you stay ahead and grow your investments smarter.
                        </p> */}

                        {/* Feature Pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap gap-3"
                        >
                            {['Real-time Data', 'Advanced Chart', 'Smart Tools'].map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-sm font-medium shadow-lg"
                                >
                                    ✓ {feature}
                                </div>
                            ))}
                        </motion.div>

                        <div className="pt-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative bg-white text-green-600 font-bold py-4 px-10 rounded-full shadow-2xl transition-all duration-300 overflow-hidden hover:shadow-white/20"
                            >
                                <a href="https://play.google.com/store/search?q=stockology&c=apps">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Explore Our App
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                    <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                </a>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Graphic Content with Orbiting Elements */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-[600px] h-[500px] md:h-[600px] flex items-center justify-center">

                            {/* Main Gateway Image - Center */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="relative z-30"
                            >
                                <div className="relative">
                                    {/* Soft Glow */}
                                    <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full transform scale-125"></div>

                                    <Image
                                        src="/GatewaySection.png"
                                        alt="Stockology Trading App Interface"
                                        width={350}
                                        height={350}
                                        className="relative z-10 w-full max-w-[250px] md:max-w-[350px] h-auto drop-shadow-2xl"
                                        priority
                                    />
                                </div>
                            </motion.div>

                            {/* Orbiting Elements using OrbitingCircles Component */}
                            <OrbitingCircles
                                radius={250}
                                duration={25}
                                path={true}
                                iconSize={120}
                            >
                                {/* Element 1 */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="relative group"
                                >
                                    <div className="absolute "></div>
                                    <div className="transition-all duration-300">
                                        <Image
                                            src="/element_1.png"
                                            alt="Investment Element 1"
                                            width={100}
                                            height={100}
                                            className="w-20 h-20 md:w-24 md:h-24 object-contain"
                                            loading="eager"
                                        />
                                    </div>
                                </motion.div>

                                {/* Element 2 */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="relative group"
                                >
                                    <div className="absolute "></div>
                                    <div className="transition-all duration-300">
                                        <Image
                                            src="/element_2.png"
                                            alt="Investment Element 2"
                                            width={100}
                                            height={100}
                                            className="w-20 h-20 md:w-24 md:h-24 object-contain"
                                            loading="eager"
                                        />
                                    </div>
                                </motion.div>

                                {/* Element 3 */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                    className="relative group"
                                >
                                    <div className="absolute "></div>
                                    <div className="relative transition-all duration-300">
                                        <Image
                                            src="/element_3.png"
                                            alt="Investment Element 3"
                                            width={100}
                                            height={100}
                                            className="w-20 h-20 md:w-24 md:h-24 object-contain"
                                            loading="eager"
                                        />
                                    </div>
                                </motion.div>

                                {/* Element 4 */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.9 }}
                                    className="relative group"
                                >
                                    <div className="absolute "></div>
                                    <div className="relative transition-all duration-300">
                                        <Image
                                            src="/element_4.png"
                                            alt="Investment Element 4"
                                            width={100}
                                            height={100}
                                            className="w-20 h-20 md:w-24 md:h-24 object-contain"
                                            loading="eager"
                                        />
                                    </div>
                                </motion.div>
                            </OrbitingCircles>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default GatewaySection;
