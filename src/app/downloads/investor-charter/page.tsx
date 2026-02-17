"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, ChevronLeft, FileJson } from "lucide-react";
import Link from "next/link";

export default function InvestorCharterPage() {
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
                                    <FileJson size={32} />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Investor Charter
                                </h1>
                            </div>

                        </div>

                        <a
                            href="/Investor%20Charter.pdf"
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
                    <div className="max-w-4xl mx-auto space-y-12 text-gray-700 leading-relaxed">

                        {/* Header Info */}
                        <div className="text-center border-b border-gray-100 pb-8">
                            <h2 className="text-xl font-semibold text-gray-900 uppercase tracking-wide">Annexure A</h2>
                            <div className="mt-4 inline-block px-6 py-2 bg-green-50 text-green-700 font-bold rounded-full text-base">
                                Investor Charter – Stock Brokers
                            </div>
                        </div>

                        {/* Vision & Mission */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl border border-green-100 shadow-sm">
                                <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                                    <span className="text-2xl">👁️</span> 1. VISION
                                </h3>
                                <p className="text-gray-700 text-sm">
                                    To follow highest standards of ethics and compliances while facilitating the trading by clients in securities in a fair and transparent manner, so as to contribute in creation of wealth for investors.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100 shadow-sm">
                                <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                                    <span className="text-2xl">🎯</span> 2. MISSION
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-700 list-disc pl-4 marker:text-blue-500">
                                    <li>To provide high quality and dependable service through innovation, capacity enhancement and use of technology.</li>
                                    <li>To establish and maintain a relationship of trust and ethics with the investors.</li>
                                    <li>To observe highest standard of compliances and transparency.</li>
                                    <li>To always keep ‘protection of investors’ interest’ as goal while providing service.</li>
                                    <li>To ensure confidentiality of information shared by investors unless required for legal obligations or with specific consent.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Services Provided */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">3. Services Provided to Investors</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    "Execution of trades on behalf of investors.",
                                    "Issuance of Contract Notes.",
                                    "Issuance of intimations regarding margin due payments.",
                                    "Facilitate execution of early pay-in obligation instructions.",
                                    "Periodic Settlement of client’s funds.",
                                    "Issuance of retention statement of funds at the time of settlement.",
                                    "Risk management systems to mitigate operational and market risk.",
                                    "Facilitate client profile changes in the system as instructed by the client.",
                                    "Information sharing with the client w.r.t. relevant MII circulars.",
                                    "Provide a copy of Rights & Obligations document to the client.",
                                    "Communicating Most Important terms and Conditions (MITC) to the client.",
                                    "Redressal of Investor’s grievances."
                                ].map((service, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="w-1.5 h-1.5 mt-2 rounded-full bg-green-500 shrink-0" />
                                        <span className="text-sm text-gray-700">{service}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Rights of Investors */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">4. Rights of Investors</h3>
                            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                                <div className="p-6 bg-gray-50 border-b border-gray-200">
                                    <p className="font-semibold text-gray-700">Investors have the right to:</p>
                                </div>
                                <ul className="divide-y divide-gray-100">
                                    {[
                                        "Ask for and receive information from a firm about the work history and background of the person handling your account, as well as information about the firm itself.",
                                        "Receive complete information about the risks, obligations, and costs of any investment before investing.",
                                        "Receive a copy of all completed account forms and rights & obligation document.",
                                        "Receive a copy of ‘Most Important Terms & Conditions’ (MITC).",
                                        "Receive account statements that are accurate and understandable.",
                                        "Understand the terms and conditions of transactions you undertake.",
                                        "Access your funds in a prescribed manner and receive information about any restrictions or limitations on access.",
                                        "Receive complete information about maintenance or service charges, transaction or redemption fees, and penalties in form of tariff sheet.",
                                        "Discuss your grievances with compliance officer / compliance team / dedicated grievance redressal team of the firm and receive prompt attention and fair consideration.",
                                        "Close your zero balance accounts online with minimal documentation.",
                                        "Get the copies of all policies (including MITC) of the broker.",
                                        "Not be discriminated against in terms of services offered to equivalent clients.",
                                        "Get only those advertisement materials from the broker which adhere to Code of Advertisement norms.",
                                        "In case of broker defaults, be compensated from the Exchange Investor Protection Fund as per norms.",
                                        "Trade in derivatives after submission of relevant financial documents subject to due diligence.",
                                        "Get warnings on the trading systems while placing orders in securities where surveillance measures are in place.",
                                        "Get access to products and services in a suitable manner even if differently abled.",
                                        "Get access to educational materials of the MIIs and brokers.",
                                        "Get access to all the exchanges of a particular segment you wish to deal with unless opted out.",
                                        "Deal with one or more stockbrokers of your choice without compulsion of minimum business.",
                                        "Have access to the escalation matrix for communication with the broker.",
                                        "Not be bound by any clause prescribed by the Brokers which are contravening the Regulatory provisions."
                                    ].map((right, i) => (
                                        <li key={i} className="p-4 hover:bg-gray-50 transition-colors flex items-start gap-4">
                                            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-gray-100 text-gray-500 rounded text-xs font-bold">{i + 1}</span>
                                            <span className="text-sm text-gray-700">{right}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Activities Timelines - Table */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">5. Activities with Timelines</h3>
                            <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4 font-bold">Activity</th>
                                            <th className="px-6 py-4 font-bold">Expected Timeline</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {[
                                            { act: "KYC entered into KRA System and CKYCR", time: "3 working days of account opening" },
                                            { act: "Client Onboarding", time: "Immediate, but not later than one week" },
                                            { act: "Order execution", time: "Immediate on receipt of order, but not later than the same day" },
                                            { act: "Allocation of Unique Client Code", time: "Before trading" },
                                            { act: "Copy of duly completed Client Registration Documents to clients", time: "7 days from the date of upload of UCC to the Exchange" },
                                            { act: "Issuance of contract notes", time: "24 hours of execution of trades" },
                                            { act: "Collection of upfront margin from client", time: "Before initiation of trade" },
                                            { act: "Issuance of intimations regarding other margin due payments", time: "At the end of the T day" },
                                            { act: "Settlement of client funds", time: "First Friday/Saturday of the month / quarter as per Exchange schedule" },
                                            { act: "‘Statement of Accounts’ for Funds, Securities and Commodities", time: "Monthly basis" },
                                            { act: "Issuance of retention statement of funds/commodities", time: "5 days from the date of settlement" },
                                            { act: "Issuance of Annual Global Statement", time: "30 days from the end of the financial year" },
                                            { act: "Investor grievances redressal", time: "21 calendar days from the receipt of the complaint" },
                                        ].map((row, i) => (
                                            <tr key={i} className="bg-white hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900">{row.act}</td>
                                                <td className="px-6 py-4 text-gray-600">{row.time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* DOs and DON'Ts */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">6. DOs and DON'Ts for Investors</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* DOs */}
                                <div className="bg-green-50/50 border border-green-200 rounded-xl overflow-hidden">
                                    <div className="bg-green-100 px-6 py-4 border-b border-green-200">
                                        <h4 className="font-bold text-green-800 flex items-center gap-2">✅ DOs</h4>
                                    </div>
                                    <ul className="p-6 space-y-3">
                                        {[
                                            "Read all documents and conditions being agreed before signing the account opening form.",
                                            "Receive a copy of KYC, copy of account opening documents and Unique Client Code.",
                                            "Read the product / operational framework / timelines related to various Trading and Clearing & Settlement processes.",
                                            "Receive all information about brokerage, fees and other charges levied.",
                                            "Register your mobile number and email ID in your trading, demat and bank accounts to get regular alerts.",
                                            "If executed, receive a copy of Demat Debit and Pledge Instruction (DDPI). Carefully examine scope before granting.",
                                            "Receive contract notes for trades executed within 24 hours.",
                                            "Receive funds and securities/commodities on time.",
                                            "Verify details of trades, contract notes and statement of account and approach relevant authority for discrepancies.",
                                            "Receive statement of accounts periodically.",
                                            "In case of grievances, approach stock broker or Stock Exchange or SEBI.",
                                            "Retain documents for trading activity as it helps in resolving disputes."
                                        ].map((item, i) => (
                                            <li key={i} className="text-sm text-gray-700 flex gap-2">
                                                <span className="text-green-600 font-bold">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* DON'Ts */}
                                <div className="bg-red-50/50 border border-red-200 rounded-xl overflow-hidden">
                                    <div className="bg-red-100 px-6 py-4 border-b border-red-200">
                                        <h4 className="font-bold text-red-800 flex items-center gap-2">❌ DON'Ts</h4>
                                    </div>
                                    <ul className="p-6 space-y-3">
                                        {[
                                            "Do not deal with unregistered stock broker.",
                                            "Do not forget to strike off blanks in your account opening and KYC.",
                                            "Do not submit an incomplete account opening and KYC form.",
                                            "Do not forget to inform any change in information linked to trading account.",
                                            "Do not transfer funds for trading to anyone other than a stock broker (no employee payments).",
                                            "Do not ignore any emails / SMSs received with regards to trades done.",
                                            "Do not opt for digital contracts if not familiar with computers.",
                                            "Do not share trading password.",
                                            "Do not fall prey to fixed / guaranteed returns schemes.",
                                            "Do not fall prey to fraudsters sending emails/SMSs promising huge profits.",
                                            "Do not follow herd mentality. Seek expert and professional advice."
                                        ].map((item, i) => (
                                            <li key={i} className="text-sm text-gray-700 flex gap-2">
                                                <span className="text-red-500 font-bold">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <p className="mt-4 text-center text-sm text-gray-500 italic">
                                Additionally, Investors may refer to Dos and Don’ts issued by MIIs on their respective websites from time to time.
                            </p>
                        </section>

                        {/* Grievance Redressal */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">7. Grievance Redressal Mechanism</h3>
                            <div className="space-y-6">

                                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                    <h4 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Level 1: With Stock Broker</h4>
                                    <p className="text-sm text-gray-700 mb-3">
                                        Investor can lodge complaint/grievance at the designated Investor Grievance e-mail ID of the stock broker.
                                    </p>
                                    <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium inline-block">
                                        Resolution Timeline: Immediately, but not later than 21 days.
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                    <h4 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Level 2: With Stock Exchanges</h4>
                                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                                        <div>
                                            <strong>i. SCORES 2.0:</strong> (https://scores.sebi.gov.in)
                                            <ul className="list-disc pl-5 mt-1 text-gray-600">
                                                <li>First review by Designated body/Exchange</li>
                                                <li>Second review by SEBI</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <strong>ii. Emails:</strong> To designated email IDs of Exchange
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                    <h4 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Level 3: Online Dispute Resolution (ODR)</h4>
                                    <p className="text-sm text-gray-700 mb-4">
                                        If unsatisfied with Market Participant resolution, file complaint on <strong>SMARTODR</strong> platform for Conciliation and Arbitration.
                                    </p>

                                    <div className="space-y-3">
                                        {[
                                            "Approach Market Participant first.",
                                            "If unsatisfied, escalate to SEBI SCORES or SMARTODR portal.",
                                            "SMARTODR: MII reviews and endeavors to resolve within 21 days.",
                                            "If unresolved, matter referred for Conciliation (21 days + 10 days extension).",
                                            "If conciliation fails, matter referred for Arbitration.",
                                            "Arbitration concluded within 30 days (+30 days extension)."
                                        ].map((step, i) => (
                                            <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-xs">{i + 1}</span>
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Broker Default */}
                        <section className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                            <h3 className="text-xl font-bold text-red-900 mb-4">8. In Case of Default of Trading Member (TM/CM)</h3>
                            <div className="space-y-4 text-sm text-red-800">
                                <div>
                                    <p className="font-semibold mb-1">Steps by Stock Exchange:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Circular issued declaring Stock Broker as Defaulter.</li>
                                        <li>Information disseminated on Exchange website.</li>
                                        <li>Public Notice issued inviting claims.</li>
                                        <li>Intimation to clients via emails and SMS for lodging claims.</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold mb-1">Information available on Exchange Website:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Norms for eligibility of claims from IPF.</li>
                                        <li>Claim form and FAQs.</li>
                                        <li>Online status check of claim.</li>
                                        <li>SOP for handling claims.</li>
                                        <li>List of Defaulter/Expelled members.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}
