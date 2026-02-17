"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  LineChart,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

type Offering = {
  title: string;
  description: string;
  icon: LucideIcon;
  label: string;
};

export function CardHoverEffectDemo() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-24 pt-20 md:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-emerald-50/50 p-6 md:p-10 lg:p-12">
        <div className="pointer-events-none absolute -left-12 -top-16 h-52 w-52 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-60 w-60 rounded-full bg-blue-200/35 blur-3xl" />

        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-700">
            What We Offer
          </p>
          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              High-conviction products for every trading style
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
              Built with speed, clarity, and deep market context so you can make confident
              decisions at the right time.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, idx) => (
              <ServiceCard key={project.title} {...project} delay={idx * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type ServiceCardProps = Offering & {
  delay: number;
};

const ServiceCard = ({ title, description, icon: Icon, label, delay }: ServiceCardProps) => {
  return (
    <motion.article
      className="group relative flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-[0_18px_40px_-26px_rgba(15,23,42,0.55)] backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-[0_30px_60px_-34px_rgba(5,150,105,0.45)]"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay }}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30">
          <Icon className="h-6 w-6 text-white" strokeWidth={2.4} />
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          {label}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-semibold leading-tight text-slate-900">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 md:text-[15px]">
        {description}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-medium text-slate-700">
        <span>Explore offering</span>
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </motion.article>
  );
};

export const projects: Offering[] = [
  {
    title: "Equity & Stock SIP",
    description:
      "Invest in high-quality stocks with curated watchlists, real-time signals, and disciplined SIP execution for long-term wealth building.",
    icon: LineChart,
    label: "Core",
  },
  {
    title: "Initial Public Offerings (IPO)",
    description:
      "Track upcoming issues, evaluate fundamentals quickly, and apply with a smooth workflow designed for fast subscription windows.",
    icon: TrendingUp,
    label: "Primary",
  },
  {
    title: "Futures & Options (F&O)",
    description:
      "Use derivatives for hedging and tactical opportunities with structured analytics that make premium, strike, and risk decisions clearer.",
    icon: BarChart3,
    label: "Advanced",
  },
];
