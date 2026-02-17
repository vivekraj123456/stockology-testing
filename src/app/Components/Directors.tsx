"use client";

import { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Mr Aniket Shukla",
    role: "CEO & Founder",
    image: "/ANIKET.png",
    description: `Aniket is the vision behind Stockology.Aniket Shukla is the Founder and Director of Stockology, founded in 2021 with a clear vision to simplify stock market trading for everyone. He believes that trading should not be complicated or limited to experts only.

With a strong interest in financial markets and trader education, Aniket focuses on creating a simple, transparent, and user- friendly trading experience.His goal is to help traders make informed decisions through easy - to - understand tools and clear market insights.
Under his leadership, Stockology continues to grow as a platform that supports both beginner and experienced traders.`,
  },
  {
    id: 2,
    name: "Mr Manish Kumar",
    role: "Director",
    image: "/MANISH.png",
    description: `Manish Kumar is the Founder and Director of Stockology, established in 2021 to bridge the gap between complex market data and everyday traders.

He is passionate about building systems that provide accurate trading information, market awareness, and practical knowledge. Manish plays a key role in strategy, platform development, and ensuring that Stockology remains reliable and trader-focused.

His mission is to empower traders with the right information at the right time, making trading more accessible and confident for all.`,
  },
];

export default function MeetOurDirectors() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleContainerMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-24 px-6 bg-white dark:bg-slate-950 overflow-hidden"
      onMouseMove={handleContainerMouseMove}
    >
      <div className="container mx-auto relative z-10">

        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full border border-secondary/20 bg-secondary/5 backdrop-blur-sm mb-4"
          >
            <span className="text-secondary font-black tracking-widest text-[9px] uppercase italic">Leadership</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-primary dark:text-white uppercase tracking-tighter leading-none mb-6"
          >
            The Minds Behind <br className="hidden md:block" />
            <span className="text-secondary italic">Stockology</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-light dark:text-gray-400 font-medium italic max-w-xl mx-auto"
          >
            Guided by decades of cumulative market experience and a passion for ethical growth.
          </motion.p>
        </div>

        {/* Directors Space */}
        <div className="max-w-6xl mx-auto space-y-20 md:space-y-32">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 md:gap-16`}
            >
              {/* Profile Image Container */}
              <div className="relative group w-full md:w-1/2 max-w-[400px]">
                <div className={`absolute inset-0 bg-gradient-to-br from-secondary/15 to-transparent rounded-[2.5rem] blur-2xl opacity-40`} />

                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-slate-800 shadow-xl bg-gray-50 dark:bg-slate-900 group">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 z-20 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                    <span className="text-white font-black text-sm">0{member.id}</span>
                  </div>
                </div>
              </div>

              {/* Bio Content */}
              <div className={`w-full md:w-1/2 space-y-6`}>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-1 bg-secondary rounded-full" />
                    <span className="text-secondary font-black text-[10px] uppercase tracking-widest">{member.role}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-primary dark:text-white uppercase tracking-tighter">
                    {member.name}
                  </h3>
                </div>

                <div className="relative">
                  <span className="absolute -left-12 -top-8 text-[6rem] text-secondary/5 font-serif pointer-events-none italic select-none">“</span>
                  <p className="text-base md:text-lg text-light dark:text-gray-400 leading-relaxed font-serif italic relative z-10">
                    {member.description}
                  </p>
                </div>


              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dynamic Grid Background Overlay */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(#4caf7d_1px,transparent_1px)] [background-size:20px:20px] opacity-[0.05] pointer-events-none" />
    </section>
  );
}
