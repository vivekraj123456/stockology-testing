"use client";
 

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import { AiOutlineStock } from "react-icons/ai";
import { TbSteam } from "react-icons/tb";
import { GiHiveMind } from "react-icons/gi";
import { SiKnowledgebase } from "react-icons/si";
import { FaUserLock } from "react-icons/fa";


const testimonials = [
  {
    quote:
      "Delivering superior service with expert research, analysis, and insights for smarter stock trading.",
      icon: < AiOutlineStock className="text-green-500 text-5xl" />,
    title: 
    <span className="text-green-700 text-2xl">Superiror service</span>
  
  },
  {
    quote:
      " A comprehensive platform for financial learning, market analysis, and smart stock trading strategies.",
      icon: <TbSteam className="text-green-500 text-5xl" />,
    title:
    <span className="text-green-700 text-2xl">Financial learning</span>
 
  },
  {
    quote: "A comprehensive platform offering insights, strategies, and tools for smarter stock market trading.",
    icon: < GiHiveMind  className="text-green-500 text-5xl" />,
    title: 
    <span className="text-green-700 text-2xl">Professional advice</span>
 
  },
  {
    quote:
      "A research-driven platform providing in-depth analysis, insights, and strategies for stock market success.",
      icon: < FaUserLock className="text-green-500 text-5xl" />,
    title:
    <span className="text-green-700 text-2xl">Research & Analysis</span>
   
  },
  {
    quote:
      "A user-friendly platform offering seamless research, analysis, and insights for smart stock market trading.",
      icon: <SiKnowledgebase className="text-green-500 text-5xl" />,
    title: 
    <span className="text-green-700 text-2xl">Convenience</span>
  
  },
  
];

const Corevalue = () => {
  return (
    <div className="container mx-auto md:py-20 py-14 relative bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/bg-2.jpg')" }}>
     <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-white to-transparent"></div>

{/* Bottom Fade */}
<div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      <h1 className="text-center text-3xl md:text-5xl pb-5  font-bold text-primary">Endless Benefits at Low Charges</h1>
      <p className="md:text-xl text-center md:pb-20 pd-10 text-light">Who we are is reflected in what we practice. Our values are the guiding light for everything we do at STOCKOLOGY.</p>
       <div className=" rounded-md flex flex-col antialiased   items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
        className=" relative z-10  "

      />
    </div>
    </div>
  )
}

export default Corevalue