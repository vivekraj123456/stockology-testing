"use client";
import React from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import {
  Smartphone,
  ShieldCheck,
  Zap,
  BarChart2,
  Globe,
  Download
} from "lucide-react";
import Link from "next/link";

const MobileOnline = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-neutral-900">

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-green-500/10 blur-[100px]" />
        <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-green-600 font-semibold tracking-wide uppercase text-sm">
                Mobile & Online Platform
              </h2>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
                Trade Smarter, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                  Anytime, Anywhere.
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
                Experience the future of trading with our lightning-fast mobile app. Real-time data, advanced charting, and secure execution at your fingertips.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Zap, title: "Lightning Fast", desc: "Instant order execution" },
                { icon: ShieldCheck, title: "Secure & Safe", desc: "Biometric authentication" },
                { icon: BarChart2, title: "Advanced Charts", desc: "Technical indicators" },
                { icon: Globe, title: "Global Access", desc: "Trade from anywhere" },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-4 p-4 rounded-xl bg-white/50 dark:bg-neutral-800/50 border border-gray-100 dark:border-neutral-700 hover:border-green-500/30 transition-colors duration-300">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="#">
                <button className="flex items-center space-x-3 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <Smartphone className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </button>
              </Link>
              <Link href="https://play.google.com/store/search?q=stockology&c=apps&hl=en_IN ">
                <button className="flex items-center space-x-3 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <Download className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Content - 3D Phone Mockup */}
          <div className="relative flex justify-center items-center">
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  Stockology  App
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  The most powerful trading tool in your pocket.
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src="/servicemobile11.png"
                    height="1000"
                    width="1000"
                    className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="App Screenshot"
                  />
                </CardItem>
                {/* <div className="flex justify-between items-center mt-20">
                  <CardItem
                    translateZ={20}
                    as={Link}
                    href="#"
                    target="__blank"
                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                  >
                    View Features →
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                  >
                    Download Now
                  </CardItem>
                </div> */}
              </CardBody>
            </CardContainer>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MobileOnline;
