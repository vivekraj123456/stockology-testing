"use client";

import React from "react";
import { motion } from "framer-motion";
import DownloadCard from "../Components/DownloadCard";
import { ShieldCheck, Scale, FileJson, ArrowRight, MessageCircleQuestion } from "lucide-react";

export default function DownloadsPage() {
    const documents = [
        {
            title: "Account Opening Procedure",
            description: "Detailed process and guidelines for opening a SEBI compliant trading and demat account with Stockology. Ensure all your documents are in order for a seamless experience.",
            pdfUrl: "/Stockology_SEBI_Compliant_Account_Opening_Process.pdf",
            detailUrl: "/downloads/sebi-account-opening",
            icon: <ShieldCheck size={28} />,
        },
        {
            title: "RMS Policy",
            description: "Understand our Risk Management System (RMS) policy. This document outlines the margin requirements, exposure limits, and risk containment measures for safe trading.",
            pdfUrl: "/Rms%20Policy%20Of%20stockology%20Securities%20Pvt%20ltd.pdf",
            detailUrl: "/downloads/rms-policy",
            icon: <Scale size={28} />,
        },
        {
            title: "Investor Charter",
            description: "The Investor Charter outlines your rights and responsibilities as an investor. It reflects our commitment to transparency, fair practices, and investor protection.",
            pdfUrl: "/Investor%20Charter.pdf",
            detailUrl: "/downloads/investor-charter",
            icon: <FileJson size={28} />,
        },
        {
            title: "Investor Grievance Policy",
            description: "Details on how to lodge complaints and the grievance redressal mechanism. We are committed to resolving your concerns promptly and observing high standards of service.",
            pdfUrl: "/Investor%20Grievance%20Policy.pdf",
            detailUrl: "/downloads/investor-grievance",
            icon: <MessageCircleQuestion size={28} />,
        },
    ];

    return (
        <div className="flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16 max-w-3xl"
            >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-green-200 bg-white/50 backdrop-blur-sm text-green-800 text-sm font-bold tracking-wide shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    RESOURCE CENTRE
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                    Compliance & <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">Downloads</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto font-medium">
                    Access critical documents, policies, and procedural guidelines to ensure transparency and compliance in your trading journey with Stockology.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {documents.map((doc, index) => (
                    <DownloadCard
                        key={index}
                        {...doc}
                        className={`delay-[${index * 100}ms]`}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-24 w-full max-w-5xl"
            >
                <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-white to-green-50/50" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-100/50 blur-[50px] rounded-full translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-100/50 blur-[50px] rounded-full -translate-x-1/3 translate-y-1/3" />

                    <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div className="max-w-xl">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Need personalized assistance?</h3>
                            <p className="text-gray-600 text-lg">
                                Our support team is ready to guide you through the account opening process and answer any queries regarding these documents.
                            </p>
                        </div>
                        <a href="/Contact" className="flex-shrink-0 group relative px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-green-900/20 transition-all hover:-translate-y-1 block">
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative flex items-center gap-2">
                                Contact Support
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
