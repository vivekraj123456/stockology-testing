"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { LucideIcon } from "lucide-react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string | React.ReactNode;
    description: string;
    link: string;
    icon?: LucideIcon;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link || "#"}
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-br from-green-100 via-emerald-50 to-green-100 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-green-900/20 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            {item.icon && <CardIcon icon={item.icon} />}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      className={cn(
        "rounded-3xl h-full w-full p-6 overflow-hidden bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 group-hover:border-green-400 dark:group-hover:border-green-500 relative z-20 transition-all duration-300 shadow-lg group-hover:shadow-2xl",
        className
      )}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative z-50">
        <div className="space-y-4">{children}</div>
      </div>
    </motion.div>
  );
};

export const CardIcon = ({ icon: Icon }: { icon: LucideIcon }) => {
  return (
    <motion.div
      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
      whileHover={{ rotate: 5, scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
    </motion.div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-gray-900 dark:text-white text-xl md:text-2xl font-bold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "text-gray-600 dark:text-gray-400 tracking-wide leading-relaxed text-sm md:text-base",
        className
      )}
    >
      {children}
    </p>
  );
};
