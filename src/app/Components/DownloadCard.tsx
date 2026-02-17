"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Download } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DownloadCardProps {
    title: string;
    description: string;
    pdfUrl: string;
    detailUrl: string;
    icon?: React.ReactNode;
    className?: string;
}

const DownloadCard: React.FC<DownloadCardProps> = ({
    title,
    description,
    pdfUrl,
    detailUrl,
    icon,
    className,
}) => {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
                "relative group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(22,163,74,0.1)] hover:border-green-500/20 transition-all duration-300",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-7 flex flex-col h-full z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-xl bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-green-500/30">
                        {icon || <FileText size={24} />}
                    </div>
                    <motion.div
                        initial={{ opacity: 0.5, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1.1 }}
                        className="text-gray-300 hover:text-green-600 transition-colors cursor-pointer"
                    >
                        <Download size={22} />
                    </motion.div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors tracking-tight">
                    {title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                    {description}
                </p>

                <div className="flex gap-3 mt-auto">
                    <Link href={detailUrl} className="flex-1">
                        <button className="w-full py-2.5 px-4 rounded-xl bg-gray-50 border border-gray-100 text-gray-700 text-sm font-semibold hover:bg-white hover:border-green-200 hover:text-green-700 hover:shadow-md transition-all flex items-center justify-center gap-2 group/btn">
                            View Details
                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </Link>

                    <a
                        href={pdfUrl}
                        download
                        className="p-2.5 rounded-xl bg-gray-900 text-white hover:bg-green-600 transition-all flex items-center justify-center shadow-lg hover:shadow-green-500/25"
                        title="Download PDF"
                    >
                        <Download size={20} />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default DownloadCard;
