"use client";
import React from "react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { DotPattern } from "@/components/ui/dot-pattern";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    TrendingUp,
    Target,
    Eye,
    Crown,
    Lightbulb,
    Smile,
    Box,
    BarChart3,
    BookOpen,
    Coins
} from "lucide-react";

/**
 * Stockology Core Values - Magic UI Bento Grid Layout
 * Ordered to spell STOCKOLOGY
 */
const StockologyCoreValues = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white py-24 px-4 overflow-hidden">
            {/* Background Pattern */}
            <DotPattern
                className="absolute inset-0 h-full w-full text-green-500/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
            />

            <div className="relative max-w-[90rem] mx-auto z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20 space-y-4"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 tracking-tight">
                        Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Values</span>
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
                        The fundamental principles that guide our decisions and define our culture at Stockology Securities.
                    </p>
                </motion.div>

                {/* Magic UI Bento Grid */}
                <BentoGrid className="lg:grid-cols-3 auto-rows-[20rem]">
                    {coreValues.map((item, idx) => (
                        <BentoCard
                            key={idx}
                            {...item}
                        />
                    ))}
                </BentoGrid>

            </div>
        </div>
    );
};

const HighlightFirstLetter = ({ text }: { text: string }) => (
    <span>
        <span className="text-green-600 text-3xl font-extrabold mr-0.5 drop-shadow-sm">
            {text.charAt(0)}
        </span>
        {text.slice(1)}
    </span>
);

const BackgroundImage = ({ src }: { src: string }) => (
    <div className="absolute inset-0 h-full w-full opacity-10 group-hover:opacity-30 transition-all duration-500 grayscale group-hover:grayscale-0">
        <Image
            src={src}
            alt="Background"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/20 dark:from-black dark:via-black/80 dark:to-black/20" />
    </div>
);

const coreValues = [
    {
        name: <HighlightFirstLetter text="Strategy" />,
        description: "Data-driven investment strategies tailored to maximize returns while managing risk effectively.",

        cta: "Learn more",
        className: "lg:col-span-2 lg:row-span-1",
        background: <BackgroundImage src="/Strategy Icon.png" />,
        Icon: TrendingUp,
    },
    {
        name: <HighlightFirstLetter text="Transparency" />,
        description: "Complete clarity in our fee structure, research methodology, and business operations.",

        cta: "Learn more",
        className: "lg:col-span-1 lg:row-span-1",
        background: <BackgroundImage src="/Transparency Icon.png" />,
        Icon: Eye,
    },
    {
        name: <HighlightFirstLetter text="Opportunity" />,
        description: "Identifying high-potential market opportunities before they become mainstream trends.",

        cta: "Learn more",
        className: "lg:col-span-1 lg:row-span-1",
        background: <BackgroundImage src="/Opportunity Icon.png" />,
        Icon: Lightbulb,
    },
    {
        name: <HighlightFirstLetter text="Consistency" />,
        description: "Delivering reliable performance and unwavering support through all market cycles.",

        cta: "Learn more",
        className: "lg:col-span-1 lg:row-span-1",
        background: <BackgroundImage src="/Consistency Icon.png" />,
        Icon: Box,
    },
    {
        name: <HighlightFirstLetter text="Knowledge" />,
        description: "Empowering investors through continuous education and deep market insights.",

        cta: "Learn more",
        className: "lg:col-span-1 lg:row-span-1",
        background: <BackgroundImage src="/Knowledge Icon.png" />,
        Icon: BookOpen,
    },
    {
        name: <HighlightFirstLetter text="Objectivity" />,
        description: "Unbiased market analysis and recommendations based purely on technical and fundamental indicators.",

        cta: "Learn more",
        className: "lg:col-span-1 lg:row-span-1",
        background: <BackgroundImage src="/Objectivity Icon.png" />,
        Icon: Target,
    },
    {
        name: <HighlightFirstLetter text="Leadership" />,
        description: "Setting industry standards through innovation, integrity, and exceptional client service.",

        cta: "Learn more",
        className: "lg:col-span-2 lg:row-span-1",
        background: <BackgroundImage src="/Leadership Icon.png" />,
        Icon: Crown,
    },
    {
        name: <HighlightFirstLetter text="Optimism" />,
        description: "Maintaining a positive yet realistic outlook on market growth and wealth creation potential.",

        cta: "Learn more",
        className: "lg:col-span-1 lg:row-span-1",
        background: <BackgroundImage src="/Optimism Icon.png" />,
        Icon: Smile,
    },
    {
        name: <HighlightFirstLetter text="Growth" />,
        description: "Focusing on sustainable long-term capital appreciation for our investors' portfolios.",

        cta: "Learn more",
        className: "lg:col-span-1 lg:row-span-1",
        background: <BackgroundImage src="/Growth Icon.png" />,
        Icon: BarChart3,
    },
    {
        name: <HighlightFirstLetter text="Yield" />,
        description: "Prioritizing investments that generate superior risk-adjusted returns and steady income.",

        cta: "Learn more",
        className: "lg:col-span-1 lg:row-span-1",
        background: <BackgroundImage src="/Yield Icon.png" />,
        Icon: Coins,
    },
];

export default StockologyCoreValues;
