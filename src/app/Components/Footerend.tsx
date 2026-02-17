"use client";
import React from "react";
import { motion } from "framer-motion";
import { LinkPreview } from "@/components/ui/link-preview";

const Footerend = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const, // Add 'as const' to fix the type issue
      },
    },
  };

  return (
    <div
      className="relative text-[#151e31] py-12 px-4 overflow-hidden"

    >
      {/* Overlay for better readability if needed */}
      <div className="absolute inset-0  pointer-events-none" />

      <motion.div
        className="relative container mx-auto max-w-7xl text-sm z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-8 ">
          <h2 className="font-bold text-xl mb-2 text-gray-900">STOCKOLOGY SECURITIES PRIVATE LIMITED — DISCLOSURES & INVESTOR INFORMATION</h2>
          <p className="font-semibold text-gray-800">
            Stockology Securities Private Limited is registered with SEBI as  a Stock Broker.
          </p>
          <div className="flex flex-wrap gap-4 mt-2 text-gray-700 font-medium">
            <span>SEBI Registration No.: INZ000326233</span>
            <span>|</span>
            <span>NSE Membership ID: 90434</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Registered Office & Corporate Office:</h3>
              <p>111, Krishna Business Centre, PU–4, Vijay Nagar, Indore – 452010 (M.P.)</p>
            </div>
            {/* <div>
              <h3 className="font-bold text-gray-900 mb-1">Corporate Office:</h3>
              <p>111, Krishna Business Centre, PU–4, Vijay Nagar, Indore – 452010</p>
            </div> */}
            <div className="pt-2">
              <p><span className="font-semibold">Stock Broking Services:</span> <a href="mailto:info@stockologysecurities.com" className="text-blue-600 hover:underline">info@stockologysecurities.com</a></p>
              <p><span className="font-semibold">Depository Participant (DP) Queries:</span> <a href="mailto:info@stockologysecurities.com" className="text-blue-600 hover:underline">info@stockologysecurities.com</a></p>
            </div>
          </motion.div>

          {/* General Disclaimer */}
          <motion.div variants={itemVariants} className="bg-gray-50/80 p-5 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">General Disclaimer</h3>
            <p className="mb-2">
              Stockology Securities Private Limited engages in client-based as well as proprietary trading activities across registered stock exchanges.
            </p>
            <p className="font-medium text-red-600">
              Investing in the securities market involves risks. Please read all scheme- and product-related documents carefully before investing.
            </p>
            <p className="text-xs mt-2 text-gray-500">
              Registration with SEBI or NISM certification should not be considered as an assurance of guaranteed returns or performance.
            </p>
          </motion.div>
        </div>

        {/* SEBI SCORES */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="font-bold text-lg text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">SEBI SCORES – Investor Complaint Redressal</h3>

          <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
            <p className="mb-3">Investors can lodge complaints on <LinkPreview url="https://scores.sebi.gov.in/" className="text-blue-600 font-semibold hover:underline break-all" openInNewTab={true}>SEBI SCORES</LinkPreview> by completing a simple registration.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Mandatory details:</h4>
                <ul className="list-disc list-inside text-gray-700 pl-2">
                  <li>Name, PAN, Address</li>
                  <li>Mobile Number, Email ID</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Benefits of SCORES:</h4>
                <ul className="list-disc list-inside text-gray-700 pl-2">
                  <li>Faster resolution</li>
                  <li>Seamless communication</li>
                  <li>Centralized tracking of complaints</li>
                </ul>
              </div>
            </div>
            <p className="mt-3 text-sm">
              Additionally, investors may use the <span className="font-semibold">Smart Online Dispute Resolution (ODR)</span> platform for online grievance handling.
            </p>
          </div>
        </motion.div>

        {/* Important Messages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div variants={itemVariants} className="bg-white/60 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-900 mb-2">KYC Information</h3>
            <p>KYC needs to be completed once with any SEBI-registered intermediary. After KYC is verified, it remains valid across brokers, DPs, and mutual funds.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/60 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-900 mb-2">Stock Broking Transaction Alerts</h3>
            <p>Keep your mobile number and email ID updated with your broker to receive alerts from the Exchanges for each trade you execute. Daily trade confirmations are directly sent by the Exchanges to your registered mobile/email.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/60 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-900 mb-2">Depository (Demat) Safety</h3>
            <p>To prevent unauthorized activity, ensure your registered mobile number is updated with the DP. CDSL/NSDL sends alerts for all debit and other crucial transactions on the same day.</p>
          </motion.div>
        </div>

        {/* Advisory Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="font-bold text-lg text-gray-900 mb-3 border-l-4 border-yellow-500 pl-3">General Advisory for Investors</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 bg-yellow-50/50 p-4 rounded-lg border border-yellow-100">
            <li>Beware of SMS, emails, or social media messages recommending unsolicited trades.</li>
            <li>Invest based on informed decisions and conduct adequate research.</li>
            <li>Do not rely on unverified tips, influencers, or unauthorized advisory channels.</li>
            <li>You may report any suspicious activity, fraud, or wrongdoing anonymously via investor platforms of BSE and NSE.</li>
          </ul>
        </motion.div>

        {/* Risk Disclosures */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="font-bold text-lg text-gray-900 mb-3 border-l-4 border-red-500 pl-3">Risk Disclosures — Derivatives Trading</h3>
          <div className="bg-red-50/50 p-4 rounded-lg border border-red-100">
            <p className="font-semibold mb-2">SEBI studies have indicated:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>9 out of 10 individuals trading in equity F&O incur net losses.</li>
              <li>Average net loss for loss-making traders is approximately ₹50,000.</li>
              <li>Loss-making traders additionally incur ~28% of their losses as transaction costs.</li>
              <li>Even profitable traders pay 15%–50% of their profits as transaction costs.</li>
            </ul>
          </div>
        </motion.div>

        {/* Detailed Advisory List */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="font-bold text-lg text-gray-900 mb-3">Advisory for All Investors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-gray-700 text-sm">
            <p>• Funds/securities should be credited to your account within one working day after payout.</p>
            <p>• Consider registering for Speed-e / Easiest facilities from depositories to authorize online transfer of securities instead of DDPI/POA.</p>
            <p>• Ensure you receive Contract Notes within 24 hours of your trades and Statements of Accounts once every quarter.</p>
            <p>• If you maintain a running account with the broker, ensure settlement happens every 90 days (or 30 days if opted).</p>
            <p>• Avoid keeping idle balances with your broker unnecessarily.</p>
            <p>• Regularly log in to verify holdings, balances, and transaction statements.</p>
            <p>• Monthly SMS/emails from the Exchange provide balances as reported by brokers—review carefully and raise concerns immediately if discrepancies appear.</p>
            <p>• Keep your contact details updated to receive timely regulatory alerts.</p>
            <p>• Report any mismatch or irregularity to the Stock Broker, and if unresolved, escalate to the Exchange or Depository.</p>
          </div>
        </motion.div>

        {/* Avoid Practices & Margin Guidelines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-gray-900 mb-3">Avoid the Following Practices While Trading Options</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 bg-gray-50 p-4 rounded-lg">
              <li>Sharing login credentials, passwords, or OTPs with anyone.</li>
              <li>Trading leveraged products like options without understanding associated risks.</li>
              <li>Writing/selling options or following complex strategies solely on tips or recommendations.</li>
              <li>Acting on unverified suggestions received through WhatsApp, Telegram, YouTube, SMS, calls, etc.</li>
              <li>Taking advice from influencers or unregistered entities.</li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-gray-900 mb-3">Guidelines on Margin Collection</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 bg-gray-50 p-4 rounded-lg">
              <li>Securities can be accepted as margin only if pledged in the depository system (effective from 01 September 2020).</li>
              <li>Ensure your email ID and mobile number are updated with the DP and broker to receive OTPs directly from the depository while creating pledges.</li>
              <li>Check your mutual funds, bonds, and securities regularly in the Consolidated Account Statement (CAS) issued monthly by NSDL/CDSL.</li>
            </ul>
          </motion.div>
        </div>

        {/* Investor Education Link */}
        <motion.div variants={itemVariants} className="text-center mb-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-2">Investor Education</h3>
          <p className="mb-2">To stay updated and improve investment awareness, investors are encouraged to explore educational content available on the BSE Investor Protection Fund website:</p>
          <LinkPreview url="https://www.bseipf.com/investors_education.html" className="text-blue-600 font-semibold hover:underline break-all" openInNewTab={true}>
            https://www.bseipf.com/investors_education.html
          </LinkPreview>
        </motion.div>

        {/* Copyright moved to bottom bar in Footer.tsx */}

      </motion.div>
    </div>
  );
};

export default Footerend;

