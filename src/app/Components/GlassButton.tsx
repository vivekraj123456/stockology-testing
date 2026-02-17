"use client";
import React from "react";
import { motion } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface GlassButtonProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
    variant?: "green" | "blue" | "purple" | "red";
}

const GlassButton: React.FC<GlassButtonProps> = ({
    children,
    icon,
    onClick,
    href,
    className = "",
    variant = "green",
}) => {
    const variantStyles = {
        green: "from-[#22c55e]/90 via-[#10b981]/85 to-[#059669]/90",
        blue: "from-blue-400/90 via-blue-500/85 to-blue-600/90",
        purple: "from-purple-400/90 via-purple-500/85 to-purple-600/90",
        red: "from-red-400/90 via-red-500/85 to-red-600/90",
    };

    const ButtonContent = (
        <motion.div
            whileTap={{ scale: 0.95 }}
            className={`
        relative group
        px-10 py-5 rounded-full
        transition-all duration-300
        cursor-pointer
        ${className}
      `}
            style={{
                // 3D Raised/Embossed Look
                boxShadow: `
          -6px -6px 14px rgba(255, 255, 255, 0.7),
          6px 6px 10px rgba(0, 0, 0, 0.15),
          inset 2px 2px 4px rgba(255, 255, 255, 0.5),
          inset -2px -2px 4px rgba(0, 0, 0, 0.05)
        `,
            }}
        >
            {/* Glowing Effect Component */}
            <div className="absolute inset-0 rounded-full overflow-hidden z-0">
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                />
            </div>

            {/* Main Gradient Background */}
            <div
                className={`absolute inset-[3px] rounded-full bg-gradient-to-br ${variantStyles[variant]} z-10`}
                style={{
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                }}
            />

            {/* Raised Border Effect (The "Uthi hui" look) */}
            <div
                className="absolute inset-0 rounded-full z-20 pointer-events-none"
                style={{
                    border: '3px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '9999px',
                    boxShadow: `
            inset 3px 3px 6px rgba(255, 255, 255, 0.9),
            inset -3px -3px 6px rgba(0, 0, 0, 0.2),
            0px 0px 0px 1px rgba(255,255,255,0.1)
          `,
                }}
            />

            {/* Content */}
            <div className="relative z-30 flex items-center justify-center gap-3">
                <span className="text-white font-bold text-xl tracking-wide drop-shadow-md">
                    {children}
                </span>
                {icon && (
                    <span className="text-white/90 text-xl drop-shadow-md">
                        {icon}
                    </span>
                )}
            </div>
        </motion.div>
    );

    if (href) {
        return (
            <a href={href} onClick={onClick} className="inline-block">
                {ButtonContent}
            </a>
        );
    }

    return (
        <div onClick={onClick} className="inline-block">
            {ButtonContent}
        </div>
    );
};

export default GlassButton;
