import React from "react";
import type { Metadata } from "next";
import AnimatedBackground from "../Components/AnimatedBackground";

export const metadata: Metadata = {
    title: "Compliance Downloads | Stockology",
    description: "Access essential compliance documents including SEBI compliant processes, RMS policies, and Investor Charter.",
};

export default function DownloadsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-green-500/30">
            <AnimatedBackground />
            <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
}
