"use client";
import Pricingtable from "../Components/Pricingtable"
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import Accordion, { accordionClasses } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import Corevalue from "../Components/Corevalue"
import OTPForm from "../Components/OTPForm";
import Banner from "../Components/Bubbles";
import { JSXElementConstructor } from "react";
import { TransitionProps } from "@mui/material/transitions";

const accordionItems = [
  {
    id: "panel1",
    title: "Custom transition using Fade",
    transition: "fade",
    details: "This panel uses a custom Fade transition instead of Collapse.",
  },
  {
    id: "panel2",
    title: "Market Trends",
    details: "Stay updated with the latest stock market trends and insights.",
  },
  {
    id: "panel3",
    title: "Investment Strategies",
    details: "Explore different investment strategies to maximize returns.",
  },
  {
    id: "panel4",
    title: "Risk Management",
    details: "Learn about risk assessment and strategies to minimize losses.",
  },
  {
    id: "panel5",
    title: "Trading Tools",
    details: "Discover powerful tools to enhance your trading experience.",
  },
];

const Page = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleExpansion =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <div className="py-7 container mx-auto px-3">

      <div className="md:grid grid-cols-3 gap-5 max-w-7xl mx-auto  md:py-16 py-5 ">
        {/* left */}
        <div className="col-span-2">
          <h1 className="md:text-4xl text-primary text-2xl font-semibold">
            Looking for the <span className="text-secondary">Lowest</span>{" "}
            Brokerage Charges??
          </h1>
          <div className="flex my-10 justify-center items-center">
            <h1 className="md:text-7xl text-4xl font-bold mr-4 text-primary">ZE<span className="text-secondary">&#8377;</span>O</h1>
            <p className="text-light w-[400px] md:text-lg text-xs">
              Stockology makes investing in the stock market simple and accessible,
              offering you the best Demat account with the lowest brokerage.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-10">
            <Image src="/01.svg" alt="Icon 1" width={100} height={100} className="w-full h-auto" />
            <Image src="/02.svg" alt="Icon 2" width={100} height={100} className="w-full h-auto" />
            <Image src="/03.svg" alt="Icon 3" width={100} height={100} className="w-full h-auto" />
            <Image src="/04.svg" alt="Icon 4" width={100} height={100} className="w-full h-auto" />
          </div>
        </div>

        {/* right */}
        <div>
          <OTPForm />
        </div>
      </div>

      <Corevalue />
      <div className="text-center my-10">
        <h1 className="md:text-5xl text-3xl font-bold text-primary">
          Transparent Brokerage Charges
        </h1>
        <p className="text-light pt-5 md:text-xl">
          Here&apos;s a detailed breakdown of our low brokerage charges with no
          hidden costs.
        </p>
      </div>
      <div className="my-5"><Pricingtable /></div>
      {/* calculator */}
      <div
        className="relative bg-cover bg-center bg-no-repeat py-10  px-5 sm:px-10"
        style={{ backgroundImage: "url('/bg-3.jpg')" }}
      >
        <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-white to-transparent"></div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-white to-transparent"></div>
        {/* Heading Section */}
        <div className="text-center relative z-10 my-5 ">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary">
            Know Your Exact Costs
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-light pt-2 sm:pt-3 max-w-2xl mx-auto">
            Calculate your overall costs, including our lowest brokerage charges.
          </p>
        </div>

        {/* Glassmorphism Card */}
        <div className="max-w-5xl mx-auto relative z-10 rounded-2xl shadow-xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 border border-white/50 md:backdrop-blur-lg">

          {/* Left Section */}
          <div className="text-center md:text-left space-y-6 w-full md:w-1/2">
            {/* Brokerage Calculator */}
            <div className="bg-green-50 p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-primary">
                📊 Brokerage Calculator
              </h1>
              <p className="text-light pt-2 sm:pt-3 text-sm sm:text-base">
                Know how much you will pay in brokerage with every trade.
              </p>
              <Link
                href=""
                className="inline-block mt-4 px-5 sm:px-6 py-2 sm:py-3 bg-secondary text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105 hover:bg-green-600 text-sm sm:text-base"
              >
                Calculate Now 🚀
              </Link>
            </div>

            {/* Margin Calculator */}
            <div className="bg-green-50 p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-primary">
                📈 Margin Calculator
              </h1>
              <p className="text-light pt-2 sm:pt-3 text-sm sm:text-base">
                Check the margin required for F&O, Commodity, & Currency trade.
              </p>
              <Link
                href=""
                className="inline-block mt-4 px-5 sm:px-6 py-2 sm:py-3 bg-secondary text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105 hover:bg-green-600 text-sm sm:text-base"
              >
                Calculate Now 📈
              </Link>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="relative w-full md:w-1/2 flex justify-center">
            <div className="absolute -top-5 -left-5 w-12 sm:w-14 h-12 sm:h-14 bg-green-500 rounded-full blur-xl opacity-30"></div>
            <Image
              src="/Calculator.png"
              alt="Calculator"
              width={500}
              height={300}
              className="h-[200px] sm:h-[230px] md:h-[260px] w-auto object-contain drop-shadow-2xl transform transition-all hover:scale-105"
            />
            <div className="absolute -bottom-5 -right-5 w-12 sm:w-14 h-12 sm:h-14 bg-red-500 rounded-full blur-xl opacity-50"></div>
          </div>
        </div>
      </div>


      {/* bubbles */}
      <div className="my-10"> <Banner /></div>

      {/* Acccordion */}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-center md:text-5xl text-3xl font-bold my-10 text-primary">
          Frequently Asked Questions
        </h1>
        {accordionItems.map(({ id, title, transition, details }) => (
          <Accordion
            key={id}
            expanded={expanded === id}
            onChange={handleExpansion(id)}
            slots={transition === "fade" ? { transition: Fade as JSXElementConstructor<TransitionProps> } : undefined}
            slotProps={
              transition === "fade"
                ? { transition: { timeout: 400 } }
                : undefined
            }
            sx={
              transition === "fade"
                ? [
                  expanded === id
                    ? {
                      [`& .${accordionClasses.region}`]: { height: "auto" },
                      [`& .${accordionDetailsClasses.root}`]: {
                        display: "block",
                      },
                    }
                    : {
                      [`& .${accordionClasses.region}`]: { height: 0 },
                      [`& .${accordionDetailsClasses.root}`]: {
                        display: "none",
                      },
                    },
                ]
                : undefined
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${id}-content`}
              id={`${id}-header`}
              className="my-5"
            >
              <span className="font-semibold">{title}</span>
            </AccordionSummary>
            <AccordionDetails>
              <p>{details}</p>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Page;