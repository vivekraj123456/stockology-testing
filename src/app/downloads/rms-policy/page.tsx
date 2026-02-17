"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, ChevronLeft, Scale } from "lucide-react";
import Link from "next/link";

export default function RmsPolicyPage() {
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
                                    <Scale size={32} />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    RMS Policy
                                </h1>
                            </div>

                        </div>

                        <a
                            href="/Rms%20Policy%20Of%20stockology%20Securities%20Pvt%20ltd.pdf"
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

                        {/* Policy Header Info */}
                        <div className="text-center border-b border-gray-100 pb-8">
                            <h2 className="text-xl font-semibold text-gray-900 uppercase tracking-wide">Stockology Securities Private Limited</h2>
                            <p className="text-gray-500 mt-2">111, Krishna Business Centre, PU–4, Vijay Nagar, Indore – 452010 (M.P.)</p>
                            <div className="mt-6 inline-block px-4 py-1.5 bg-green-50 text-green-700 font-bold rounded-full text-sm">
                                RMS POLICY FOR EQUITIES, FUTURE & OPTION
                            </div>
                        </div>

                        {/* Introduction */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h3>
                            <p className="mb-4">
                                Stockology Securities is a SEBI registered Stock Broker. The Company has an Integrated Risk Management Policy that provides an integrated framework for managing risks within the Company. The Company has also from time to time adopted Operational Risk Management Strategies for its Stock Broking activities.
                            </p>
                            <p>
                                In the course of conducting its broking business Stockology Securities is exposed to various risks including market, credit, liquidity, operational and other risks that are material and require comprehensive controls and on-going oversight. Trading in stock market is always subject to market risks which cannot be predicted. Different kind of market risks are communicated to client at the time of account opening with us as risk disclosure document. We seek to minimize the risk of loss through a dynamic risk management policy which is an essential feature of our operations. It is important to note that our Risk Management Policy is not an insurance against losses but these are measures and precautions that are adopted by us to minimize the risk. Our Policy is based on market scenarios and our risk perceptions of the market and SEBI/Exchange regulations for the time being in force. This can be change from time-to-time based market conditions and decisions basis of internal policies and practices.
                            </p>
                        </section>

                        {/* Objective */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Objective</h3>
                            <p className="mb-4">
                                The main objective of this Policy is to ensure sustainable business growth with stability and to promote a proactive approach in reporting, evaluating and resolving risks associated with the Company’s business. In order to achieve the key objective, this Policy establishes a structured and disciplined approach to Risk Management.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-green-500">
                                <li>To ensure that all the current and future material risk exposures of the Company are identified, assessed, quantified, appropriately mitigated, minimized and managed i.e. to ensure adequate systems for risk management.</li>
                                <li>To establish a framework for identification of internal and external risks specifically faced by the Company, in particular including financial, operational, sectoral, sustainability (particularly, trading related risks), information, Cyber security risks or any other risk as may be determined by the Risk Management Committee (“the Committee”) for the company’s risk management process and to ensure its implementation.</li>
                                <li>To measure risk mitigation including systems and processes for Internal Control of identified risks.</li>
                                <li>To enable compliance with appropriate regulations, wherever applicable, through the adoption of best practices.</li>
                                <li>To assure business growth with financial stability.</li>
                            </ul>
                        </section>

                        {/* Setting up Limits */}
                        <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                                Setting up Client’s Margin Limits
                            </h3>
                            <ul className="list-disc pl-5 space-y-3 marker:text-green-500">
                                <li><strong>Multiple and Haircut:</strong> The value of the “multiple” and the “haircut” shall be decided by Stockology Securities based on market volatility and quality of collaterals.</li>
                                <li><strong>Margin Limit for F&O:</strong> Stockology Securities provides margin limit in F&O based on availability of initial and exposure margin upfront available into the client account in the form Ledger, cash collateral and non-cash collateral (i.e. approved pledged securities in favor of Stockology Securities) after appropriate haircut.</li>
                                <li><strong>Client-wise Differential Limits:</strong> Stockology Securities shall have the prerogative to allow differential limits in Cash, F&O from client to client, depending upon credit worthiness and past conduct of each client or any other criteria which Stockology Securities may find suitable.</li>
                            </ul>
                        </section>

                        {/* Stockology Securities Discretions */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Stockology Securities Discretions on Limits</h3>
                            <ol className="list-decimal pl-5 space-y-3 marker:text-gray-500 marker:font-semibold">
                                <li>Stockology Securities has discretion to change the limits/ratios on the basis of risk perception and other factors considered relevant (such as broker level/exchange level limits in specific securities or Income declaration or volume Specific exposures based on surveillance measures or Availability of cash/ cash equivalent margin etc.)</li>
                                <li>Stockology Securities shall not be able to inform the client of such variation, reduction or imposition in advance.</li>
                                <li>Stockology Securities shall not be responsible for client’s inability to execute any order on account of any such variation, reduction or imposition of limits.</li>
                                <li>Collateral can be provided in Cash or Non Cash component, and client should maintain Cash and Non Cash Ratio of 50:50 for trading. However, we will not restrict client to trade even if client fails to maintain Cash and Non Cash Ratio of 50:50, Stockology Securities on behalf of its client will maintain this ratio at Clearing Corporation level and will charge interest for this under head Delay / Late payment charges.</li>
                                <li><strong>Penny/ illiquid Stocks:</strong> Stockology Securities shall have absolute discretion to accept, refuse or partially accept any buy or sell order for execution from a client in respect of penny stocks, illiquid stocks, stocks / contracts having low liquidity, illiquid “options”, far month “options”, writing of “options”, and any other contracts which as per the perception of Stockology Securities are extremely volatile or subject to Market manipulation.</li>
                                <li>In addition to existing Surveillance action being imposed from time to time, it may be noted that securities which are under graded surveillance measures will attract additional surveillance measures.</li>
                            </ol>
                        </section>

                        {/* Rights to Sell/Close Positions */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Right to Sell Client Securities or Close Positions</h3>
                            <p className="mb-4 italic text-gray-600">Stockology Securities shall have the right to sell client’s securities or close out open positions without notice in case of delay/failure to pay obligations or bring additional margins.</p>

                            <div className="space-y-6">
                                <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50/50 rounded-r-lg">
                                    <h4 className="font-bold text-green-900 mb-2">A. Unpaid Securities in Capital Market & Unpaid MTM Obligation (Derivatives)</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800 marker:text-green-600">
                                        <li>In case of unpaid obligation (Capital Market) on T+1, Stockology Securities may sell the unpaid/partially paid securities or collaterals/paid securities.</li>
                                        <li>In case of unpaid MTM obligation of derivative segments on T+1, Stockology Securities may close the position or/and sell client’s securities.</li>
                                        <li>Right to Invoke Pledge Securities/ Mutual Funds Units with/without prior intimation.</li>
                                        <li>May follow Company Policy for liquidation, but not binding in all cases.</li>
                                    </ul>
                                </div>

                                <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50/50 rounded-r-lg">
                                    <h4 className="font-bold text-green-900 mb-2">B. Margin Shortfall in Derivative Segment</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800 marker:text-green-600">
                                        <li>Positions may be closed out to the extent of margin shortfall on T+1 basis / Real time monitoring basis.</li>
                                        <li>Value of unapproved securities shall not be considered for margin shortfall.</li>
                                        <li>Stockology Securities may insist for prescribed cash/collateral ratio and close position if deviated.</li>
                                    </ul>
                                </div>

                                <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50/50 rounded-r-lg">
                                    <h4 className="font-bold text-green-900 mb-2">C. Intra-day Positions</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800 marker:text-green-600">
                                        <li>Right to close out any intra-day positions after a defined ‘Cutoff’ time (Presently 15 minutes before close of market).</li>
                                        <li>Internal price band applied (flat 2% lower than exchange-defined band). Breach may lead to close-out at sole discretion.</li>
                                        <li><strong>75% MTM Loss:</strong> Positions will be liquidated if loss reaches 75% MTM Loss. If collateral ratio falls to 15% or below, positions may be closed on real-time basis.</li>
                                    </ul>
                                </div>

                                <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50/50 rounded-r-lg">
                                    <h4 className="font-bold text-green-900 mb-2">D. Stock Derivative Contracts (Physical Delivery)</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800 marker:text-green-600">
                                        <li>Positions in Stock Option/Future expiring in next 5 trading days may be closed if insufficient margin coverage.</li>
                                        <li>Higher margin required if delivery value exceeds predefined value; else position closed.</li>
                                        <li>Short positions (Call Short/Future Short/Put Long) may be squared-off on expiry day if delivery stock not in Demat (POA).</li>
                                        <li>OTM contracts up to 2% from Underlying LTP considered possible ITM and may be squared-off.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* General Provisions */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">General Provisions</h3>
                            <ul className="list-decimal pl-5 space-y-2 marker:font-bold marker:text-gray-400">
                                <li>Stockology Securities may take into account sales made or positions closed til cut-off time.</li>
                                <li>Unrealized cheques not considered until clear proceeds received via instant modes (UPI/RTGS/NEFT). Demand Draft / Pay order not considered for this purpose.</li>
                                <li>Right to sell/close is not an obligation.</li>
                                <li>Right to sell in case of Ageing of debit and margin shortfall.</li>
                                <li>Not responsible for losses/penalties from exchange caused by such square off.</li>
                                <li>No obligation to compensate for or provide reasons for delay/omission to sell/close.</li>
                            </ul>
                        </section>

                        {/* Restrictions on Creation/Square-off */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Restrictions on Position Creation/Square-off</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-2">A. All Markets</h4>
                                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                        <li>Inadequate margins as per Risk Policy.</li>
                                        <li>Failure to meet pay-in obligations in cash.</li>
                                        <li>Uncleared cheque proceeds.</li>
                                        <li>Trading in "illiquid" scrips exceeding internal limits.</li>
                                        <li>Exposure exceeding "house level" limits.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-2">B. Derivative Segment</h4>
                                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                        <li>Unpaid MTM loss in Ledger.</li>
                                        <li>Positions exceeding/close to market wide limits.</li>
                                        <li>Restrictions on contracts expiring in next 5 days (Physical Delivery risk).</li>
                                        <li>Inability to square-off if it increases margin requirement beyond available.</li>
                                        <li><strong>F&O Ban:</strong> Clients cannot increase delta-adjusted exposure during ban period.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Intra-day Positions (Specifics) */}
                        <section>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Intra-Day Specifics</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Cut-off time: 15 minutes prior to market close.</li>
                                <li>Price Band breaches (Upper/Lower) may lead to order cancellation/rejection.</li>
                                <li>Validation logic for Sell orders near Upper Circuit and Buy orders near Lower Circuit (5% buffer).</li>
                                <li>Risk perception based on corporate/market events may lead to suspension of trading in specific scrips.</li>
                            </ul>
                        </section>

                        {/* Account Suspension/Freezing */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Suspension & Voluntary Freezing of Account</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-2">Suspension Reasons</h4>
                                    <p className="text-sm text-gray-600">
                                        Inactive for &gt;24 months, regulatory investigation, excessive speculation, undelivered contract notes, bounced emails (&gt;3 instances), expired client, or written request.
                                    </p>
                                </div>

                                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                                    <h4 className="font-bold text-green-900 mb-3">Voluntary Freezing (SEBI Circular Jan 2024)</h4>
                                    <p className="mb-4 text-sm text-green-800">Effective 1st July 2024, clients can freeze trading access voluntarily.</p>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h5 className="font-semibold text-green-800 mb-2">Modes</h5>
                                            <ul className="list-disc pl-5 text-sm text-green-700">
                                                <li><strong>Call:</strong> Dedicated phone number (Verified via registered mobile or 2FA).</li>
                                                <li><strong>Trade Mobi App:</strong> Support &gt; Update Profile &gt; Freeze Account.</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-semibold text-green-800 mb-2">Timelines</h5>
                                            <ul className="list-disc pl-5 text-sm text-green-700">
                                                <li><strong>During/15m before Market:</strong> Within 15 minutes.</li>
                                                <li><strong>After Market:</strong> Before start of next session.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-xs text-green-600 italic">
                                        Note: Freezing blocks online access but does not restrict Risk Management activities. To Unfreeze, raise request via Call/App (processed within 15 mins).
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Margin Collection */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Margin Collection in Derivative Segments</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {['Equity Derivative', 'Currency Derivative', 'Commodity Derivative', 'Cash Segment'].map((seg, i) => (
                                    <div key={i} className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                                        <h4 className="font-bold text-gray-800 mb-2">{seg}</h4>
                                        <p className="text-sm text-gray-600">Total Margin on Upfront basis. MTM Loss/Other margins to be paid by T+1 working day (strictly for penalty strictness).</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Important Notes */}
                        <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
                            <h3 className="text-xl font-bold text-yellow-900 mb-4">Important Notes</h3>
                            <ul className="list-disc pl-5 space-y-2 text-sm text-yellow-800">
                                <li>CNC selling benefit available up to 80% of sell value on T Day.</li>
                                <li>Peak Margin obligation applies for intraday trading, or sell-buy back transactions.</li>
                                <li>Short/Non-collection penalty passed to client (e.g., dishonored cheque, hedge break margin increase).</li>
                                <li>Payout short risks: Selling shares not yet received may lead to auction/penalties.</li>
                                <li>Hedge Break scenarios (expiry, square-off) may increase margin obligation significantly.</li>
                            </ul>
                        </section>

                        {/* Fund Policy */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Fund Policy</h3>
                            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 marker:font-bold">
                                <li>Limit available: Unused Block Amount reduced by ledger debit.</li>
                                <li>Limit up to 97% of above.</li>
                                <li>Limit on Collateral pledged (approved/unapproved) not available.</li>
                                <li>Buying in Cash segment: 100% Margin.</li>
                                <li>No limit on Credit for sale (on Stock sold).</li>
                                <li>Fund Block shown in Pay-in; Unused block in Cash Margin.</li>
                                <li>Unblock updated in Cash Margin/Notional Column at request time; processed at EOD.</li>
                                <li>Payout can be marked up to normal ledger credit reduced by provisional charges.</li>
                                <li>Ageing square-off not done for ASBA clients.</li>
                                <li>Clients blocked for fresh trading if Ageing T+5 day or more.</li>
                            </ol>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}
