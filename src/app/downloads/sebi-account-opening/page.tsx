"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, ChevronLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function SebiProcessPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <Link href="/downloads">
                <button className="flex items-center text-gray-500 hover:text-green-700 mb-8 transition-colors group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Downloads
                </button>
            </Link>

            <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl overflow-hidden shadow-xl">
                <div className="p-8 md:p-12 border-b border-gray-100 bg-gradient-to-b from-white to-gray-50">
                    <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 bg-green-100 text-green-600 rounded-lg">
                                    <ShieldCheck size={32} />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Account Opening Procedure
                                </h1>
                            </div>

                        </div>

                        <a
                            href="/Stockology_SEBI_Compliant_Account_Opening_Process.pdf"
                            download
                            className="flex-shrink-0"
                        >
                            <button className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-900/10 transition-all hover:scale-105">
                                <Download size={20} />
                                Download PDF
                            </button>
                        </a>
                    </div>
                </div>

                <div className="p-8 md:p-12">
                    <div className="max-w-4xl mx-auto space-y-12">

                        {/* Process Overview */}
                        <div className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Account Opening – Process Overview    </h2>
                            <p className="text-gray-600 text-lg leading-relaxed text-justify">
                                Stockology Securities Pvt. Ltd., a SEBI-registered stock broker, follows a fully digital and paperless
                                account opening process in accordance with SEBI circulars, KYC norms, and Anti-Money
                                Laundering (AML) guidelines. The process ensures secure client onboarding, identity verification,
                                and regulatory compliance through electronic verification mechanisms. The client initiates the
                                account opening journey by registering a mobile number and completing OTP-based authentication
                                for mobile and email verification. PAN is verified electronically with the Income Tax database. In
                                cases where PAN verification is unsuccessful, the client is required to upload PAN details along
                                with name and date of birth. Clients select their trading preferences and complete Aadhaar-based
                                e-KYC through DigiLocker. A live photograph is captured to establish identity. Basic personal
                                details are collected, followed by bank account verification through the penny drop mechanism.
                                Nominee details are captured as per SEBI guidelines or the client may opt out. The demat account
                                opening process is facilitated through Globe Capital, a SEBI-registered depository participant. All
                                client data is verified with CVL KRA. Upon successful verification, the client master is generated
                                and the process is completed through e-Sign.
                            </p>
                        </div>

                        {/* Account Opening Flow - Simple Text List */}
                        <div className="max-w-3xl mx-auto">
                            <h3 className="text-xl font-bold text-gray-900 mb-8 text-center uppercase tracking-wider">Account Opening Process Flow</h3>

                            <div className="space-y-6">
                                {/* Initial Steps */}
                                <div className="space-y-4">
                                    {[
                                        "Start",
                                        "Enter Mobile Number",
                                        "Mobile OTP Verification",
                                        "Email OTP Verification",
                                        "PAN Verification",
                                        "Upload PAN Details (If Required)",
                                        "Select Trading Preferences",
                                        "Aadhaar Verification via DigiLocker",
                                        "Capture Live Photograph",
                                        "Enter Personal Details",
                                        "Bank Verification (Penny Drop)",
                                        "Nominee Details / Opt-Out"
                                    ].map((step, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            className="flex items-center gap-4 text-gray-700 hover:text-green-700 transition-colors"
                                        >
                                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                                                {index === 0 ? "S" : index}
                                            </span>
                                            <span className="font-medium text-lg">{step}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Globe Capital Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-gray-50 rounded-xl p-6 border-l-4 border-green-500"
                                >
                                    <h4 className="text-green-800 font-bold mb-4">Demat Account Process – Globe Capital</h4>
                                    <ul className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            "OTP Verification",
                                            "PAN & DOB Entry",
                                            "DigiLocker Verification",
                                            "Personal & Bank Details",
                                            "Document Upload",
                                            "KRA Verification and esign process with Globe capital"
                                        ].map((sub, i) => (
                                            <li key={i} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-100 shadow-sm hover:border-green-300 transition-colors">
                                                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold text-xs">
                                                    {i + 1}
                                                </span>
                                                <span className="text-gray-700 font-medium text-sm">{sub}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {/* Final Steps */}
                                <div className="space-y-4">
                                    {[
                                        "Client Master Generation",
                                        "E-Sign Completion at Stockology",
                                        "Account Successfully Opened"
                                    ].map((step, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            className="flex items-center gap-4 text-gray-700 hover:text-green-700 transition-colors"
                                        >
                                            <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-semibold text-sm ${index === 2 ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'}`}>
                                                {12 + index}
                                            </span>
                                            <span className={`font-medium text-lg ${index === 2 ? 'text-green-700 font-bold' : ''}`}>{step}</span>
                                        </motion.div>
                                    ))}
                                </div>

                            </div>
                        </div>

                        <div className="bg-green-50 p-6 rounded-2xl border border-green-100 text-center">
                            <p className="text-green-800 font-medium">
                                For any assistance in the account opening process, please contact our Account Opening  team.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
