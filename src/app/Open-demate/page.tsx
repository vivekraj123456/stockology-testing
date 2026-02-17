"use client";
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import Accordion, { accordionClasses } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";

import { JSXElementConstructor, useState } from "react";
import Cards from "../Components/Cards";
import Processbar from "../Components/Progressbar";
import { TiLockClosed } from "react-icons/ti";
import { TransitionProps } from '@mui/material/transitions';
import Image from 'next/image';


const accordionItems = [
  {
    id: "panel1",
    title: "What is a Demat Account?",
    transition: "fade",
    details: (
      <p>
        <strong>Demat Account (Dematerialized Account)</strong> is used to hold shares and securities electronically.
        It eliminates the need for physical share certificates, making trading more efficient and secure.
      </p>
    ),
  },
  {
    id: "panel2",
    title: "Why do I need a Demat Account?",
    details: (
      <div>
        <p>A Demat account is essential for trading in the stock market. It allows you to:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Hold shares and securities electronically</li>
          <li>Trade in stocks, bonds, ETFs, mutual funds, and government securities</li>
          <li>Reduce paperwork and eliminate the risk of loss or damage of physical certificates</li>
        </ul>
      </div>
    ),
  },
  {
    id: "panel3",
    title: "How can I open a Demat Account?",
    details: (
      <div>
        <p>You can open a Demat Account by following these steps:</p>
        <ol className="list-decimal pl-5 mt-2">
          <li>Choose a <strong>Depository Participant (DP)</strong> (banks, brokers, or financial institutions).</li>
          <li>Fill out the account opening form and provide KYC documents (PAN card, Aadhaar, bank details).</li>
          <li>Complete <strong>in-person verification (IPV)</strong> as required.</li>
          <li>Receive <strong>login credentials</strong> once the account is activated.</li>
        </ol>
      </div>
    ),
  },
  {
    id: "panel4",
    title: "What are the charges for a Demat Account?",
    details: (
      <div>
        <p>Charges may vary among providers and typically include:</p>
        <ul className="list-disc pl-5 mt-2">
          <li><strong>Account Opening Charges</strong> (some brokers offer free accounts)</li>
          <li><strong>Annual Maintenance Charges (AMC)</strong></li>
          <li><strong>Transaction Fees</strong> (for buying/selling shares)</li>
          <li><strong>Dematerialization Charges</strong> (for converting physical shares to electronic form)</li>
        </ul>
      </div>
    ),
  },
  {
    id: "panel5",
    title: "What is the difference between a Trading Account and a Demat Account?",
    details: (
      <ul className="list-disc pl-5 mt-2">
        <li>A <strong>Demat Account</strong> holds your securities electronically.</li>
        <li>A <strong>Trading Account</strong> is used to buy and sell shares in the stock market.</li>
        <li>Both accounts are linked to facilitate seamless trading.</li>
      </ul>
    ),
  },
  {
    id: "panel6",
    title: "Can I have multiple Demat Accounts?",
    details: (
      <p>
        Yes, you can open multiple Demat accounts with different Depository Participants (DPs),
        but they must be linked to the same PAN card.
      </p>
    ),
  },
  {
    id: "panel7",
    title: "What documents are required to open a Demat Account?",
    details: (
      <ul className="list-disc pl-5 mt-2">
        <li><strong>PAN Card</strong> (mandatory)</li>
        <li><strong>Aadhaar Card or Address Proof</strong></li>
        <li><strong>Bank Statement/Cancelled Cheque</strong></li>
        <li><strong>Passport-size Photograph</strong></li>
        <li><strong>Income Proof</strong> (for derivatives trading)</li>
      </ul>
    ),
  },
  {
    id: "panel8",
    title: "How do I transfer shares from one Demat Account to another?",
    details: (
      <div>
        <p>You can transfer shares using:</p>
        <ul className="list-disc pl-5 mt-2">
          <li><strong>Online method</strong> (via CDSL’s Easiest or NSDL’s Speed-e)</li>
          <li><strong>Offline method</strong> (by submitting a DIS – Delivery Instruction Slip to your DP)</li>
        </ul>
      </div>
    ),
  },
  {
    id: "panel9",
    title: "Is it possible to close a Demat Account?",
    details: (
      <div>
        <p>Yes, you can close your Demat account by submitting a <strong>closure request form</strong> to your DP after ensuring that:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>There are no holdings in the account</li>
          <li>There are no pending dues</li>
        </ul>
      </div>
    ),
  },
  {
    id: "panel10",
    title: "What happens if I don't use my Demat Account?",
    details: (
      <p>
        If your Demat Account remains inactive for a long period, it may be classified as <strong>dormant</strong>.
        However, annual maintenance charges may still apply.
      </p>
    ),
  },
  {
    id: "panel11",
    title: "What is a BSDA (Basic Services Demat Account)?",
    details: (
      <p>
        A <strong>BSDA</strong> is a type of Demat Account for small investors with holdings up to ₹2 lakh.
        It offers <strong>reduced annual maintenance charges</strong>.
      </p>
    ),
  },
  {
    id: "panel12",
    title: "Can I open a joint Demat Account?",
    details: (
      <p>
        Yes, a Demat Account can be opened jointly with up to <strong>three holders</strong>
        (one primary holder and two joint holders).
      </p>
    ),
  },
];


const Page = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleExpansion =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: unknown) => {
    console.log("Submitted Data:", data);
    setSubmitted(true);
  };
  return (
    <div className='container mx-auto md:py-28 py-10 px-3'>

      <div className='md:grid grid-cols-2 max-w-7xl mx-auto'>
        {/* left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='md:text-6xl leading-snug text-3xl font-bold text-primary'>
            Open a  <span className="text-secondary">Free Demat Account </span> Quickly
          </h1>
          <p className='font-sans md:text-xl py-3 text-light'>
            Secure Your Future, Invest Today
          </p>
          <div className='md:grid grid-cols-2 gap-3'>
            {/* Card 1 */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="flex my-5 justify-center border p-3 rounded-xl shadow-lg bg-green-50 items-center"
            >
              <h1 className="md:text-5xl text-secondary text-xl font-bold mr-2">&#8377;0</h1>
              <p className="text-light w-[400px] md:text-lg text-xs">
                AMC* & charges* on Mutual Funds and IPO
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="flex my-5 justify-center border p-3 rounded-xl shadow-lg  bg-green-50 items-center"
            >
              <h1 className="md:text-5xl text-secondary text-xl font-bold mr-2">&#8377;20</h1>
              <p className="text-light w-[400px] md:text-lg text-xs">
                Per order on Equity, F&O, Commodity and Currency
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-center space-x-5">
              <div className="flex items-center border border-gray-500 rounded-full px-3 py-2 w-[350px] shadow-sm focus-within:border-green-500">
                <span className="font-semibold text-light mr-2">+91</span>
                <input
                  type="text"
                  placeholder="Enter your mobile number"
                  {...register("mobile", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit number",
                    },
                  })}
                  className="outline-none w-full text-light bg-transparent"
                />
              </div>
              <button
                type="submit"
                className={`bg-secondary text-white font-semibold px-5 py-2 rounded-full whitespace-nowrap ${submitted ? " cursor-pointer" : "hover:bg-green-600"
                  }`}
                disabled={submitted}
              >
                {submitted ? "Submitted ✅" : "Open FREE Demat Account"}
              </button>
              {errors.mobile && <p className="text-red-500 text-sm absolute mt-14">{errors.mobile.message as string}</p>}
            </form>
            <p className="text-sm mt-5 text-light">
              <span className='text-red-500'>* </span>By continuing, I accept Stockology
              <a href="/Terms-&-Conditions" className="text-secondary underline">T&C and Privacy policy</a>
            </p>
          </motion.div>
        </motion.div>

        {/* right */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <Image src="/mb.png" alt="" width={500} height={500} className="w-full h-auto" />
        </motion.div>
      </div>

      {/* scrollbaar */}

      <div className='max-w-7xl mx-auto md:pt-20 pt-8 pb-10'>
        <h1 className='md:text-5xl text-3xl font-bold md:mb-10 mb-5 text-primary'>Process for Opening a Demat Account</h1>
        <Processbar />
        <div className='flex gap-2 items-center'>
          <p className='text-2xl'><TiLockClosed /></p>
          <p className='text-light'>We safeguard your data with encryption, adhering to all regulatory requirements.</p>
        </div>
      </div>


      <div className='text-center  mt-8  md:mt-20 mb-8'>
        <h1 className=' md:text-5xl text-3xl font-semibold text-primary '>Consider Different Financial Investment Strategies</h1>
        <p className="md:text-lg text-light my-3">Take Advantage of Diverse Trading Options with Stockology Demat</p>
      </div>

      {/* cards */}
      <div className='flex flex-wrap justify-center gap-10'>
        <Cards name={" Mutual Funds"} image={"/in4.png"} />
        <Cards name={" Stocks"} image={"in1.png"} />
        <Cards name={" Futures/Options"} image={"in3.png"} />
        <Cards name={" IPO"} image={"/ipo.png"} />
        <Cards name={" Commodities"} image={"/in2.png"} />
        <Cards name={" Currencies"} image={"/ru2.png"} />
        <Cards name={"  Gold"} image={"/gold.png"} />
        <Cards name={" Fixed Income"} image={"/bank.png"} />
      </div>

      {/* zero */}

      <div className="flex mt-14 bg-green-50 justify-center items-center">
        <div className="md:grid   grid-cols-2 max-w-7xl mx-auto py-10 px-4">
          <div className="flex justify-center">
            <Image src="/zero4.svg" alt="Affordable Brokerage" width={400} height={350} className="h-[350px] max-h-[350px] w-full object-contain" />
          </div>
          <div className="flex flex-col justify-center md:pl-6 text-center md:text-left">
            <h1 className="md:text-5xl text-2xl font-bold text-primary">
              <span className="text-secondary">Affordable Brokerage</span>, Because Your Growth Matters
            </h1>
            <p className="text-lg text-light my-5">
              Invest Smartly with Reduced DP and Brokerage Costs
            </p>
          </div>
        </div>
      </div>

      {/* Acccordion */}

      <div className="max-w-7xl mx-auto pt-10">
        <h1 className="text-center md:text-5xl text-3xl text-primary font-bold my-10">
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
              className="my-5 "
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
  )
}

export default Page