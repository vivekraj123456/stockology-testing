"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(22,163,74,0.05),rgba(255,255,255,0))]" />

            {/* Animated Background Blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
                className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-200/30 blur-[100px] rounded-full"
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, -30, 0],
                    y: [0, 50, 0]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 2
                }}
                className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-green-300/10 blur-[80px] rounded-full"
            />

            {/* Tech Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#22c55e 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
        </div>
    );
}
