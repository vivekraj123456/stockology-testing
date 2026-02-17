"use client";

import React from "react";
import Link from "next/link";
import { Download, ChevronLeft, MessageCircleQuestion } from "lucide-react";
import { motion } from "framer-motion";

export default function InvestorGrievancePage() {
    return (
        <div className="max-w-4xl mx-auto">
            <Link href="/downloads" className="inline-block mb-8">
                <div className="flex items-center text-gray-500 hover:text-green-700 transition-colors group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Downloads
                </div>
            </Link>

            <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl overflow-hidden shadow-xl">
                <div className="p-8 md:p-12 border-b border-gray-100 bg-gradient-to-b from-white to-gray-50">
                    <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 bg-green-100 text-green-600 rounded-lg">
                                    <MessageCircleQuestion size={32} />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Investor Grievance Policy
                                </h1>
                            </div>

                        </div>

                        <a
                            href="/Investor%20Grievance%20Policy.pdf"
                            download
                            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-900/10 transition-all hover:scale-105"
                        >
                            <Download size={20} />
                            Download PDF
                        </a>
                    </div>
                </div>

                <div className="p-8 md:p-12">
                    <div className="max-w-4xl mx-auto space-y-12 text-gray-700 leading-relaxed">

                        {/* Header Info */}
                        <div className="text-center border-b border-gray-100 pb-8">
                            <h2 className="text-xl font-semibold text-gray-900 uppercase tracking-wide">STOCKOLOGY SECURITIES PRIVATE LIMITED</h2>
                            <p className="text-gray-500 mt-2">Policy regarding handling of Investor Grievances</p>
                            <div className="flex items-center justify-center gap-4 mt-6">
                                <span className="px-4 py-1.5 bg-gray-100 text-gray-600 font-medium rounded-full text-sm">Date: 15-01-2026</span>
                                <span className="px-4 py-1.5 bg-green-50 text-green-700 font-bold rounded-full text-sm">Version 1.0</span>
                            </div>
                        </div>

                        {/* Introduction */}
                        <section className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                            <p className="text-gray-800 text-lg text-center font-medium">
                                "In case you have any grievances with us, you can reach out to us to register a complaint through the means mentioned below. We will respond to your complaints within <span className="text-blue-600 font-bold">15 days</span> from the time of registration of your complaint."
                            </p>
                        </section>

                        {/* Contact Us Section */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                                Contact Us
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">📞 Phone</h4>
                                    <p className="text-sm text-gray-600 mb-3">
                                        You can call our dedicated Client Helpdesk Team as per the details displayed in Investor Escalation Matrix.
                                    </p>
                                    <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-500 font-medium">
                                        <div>Mon-Fri: 09 AM to 06 PM</div>
                                        <div>Sat: 11 AM to 06 PM</div>
                                        <div>(Except public holidays)</div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">✉️ Email</h4>
                                    <p className="text-sm text-gray-600 mb-3">
                                        For any grievances, please write to us at:
                                    </p>
                                    <a href="mailto:grievance@stockologysecurities.com" className="text-green-600 font-bold hover:underline break-all">
                                        grievance@stockologysecurities.com
                                    </a>
                                    <p className="text-xs text-gray-500 mt-2">
                                        *Generating a ticket leads to fast track redressal.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow md:col-span-2">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">🏢 Visit our Registered Office</h4>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Address your complaint letter to the <strong>Grievance Redressal Officer</strong>. Ensure to take an acknowledgement of receipt.
                                    </p>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-1 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <h5 className="font-semibold text-gray-900 mb-2">Address</h5>
                                            <p className="text-sm text-gray-600">
                                                Stockology Securities Pvt. Ltd.<br />
                                                111, Krishna Business Centre, Pu-4,<br />
                                                Vijay Nagar, Indore, 452010 (M.P.)
                                            </p>
                                        </div>
                                        <div className="flex-1 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <h5 className="font-semibold text-gray-900 mb-2">Office Hours</h5>
                                            <div className="text-sm text-gray-600 space-y-1">
                                                <div className="flex justify-between"><span>Mon-Fri:</span> <span>09 AM - 06 PM</span></div>
                                                <div className="flex justify-between"><span>Saturday:</span> <span>11 AM - 06 PM</span></div>
                                                <div className="text-xs text-gray-400 mt-1">*Except public holidays</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Escalation Matrix */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                                Escalation Matrix
                            </h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Please quote the complaint reference number provided to you in your earlier interactions to help us understand your concerns better.
                            </p>

                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-green-500 before:via-gray-200 before:to-gray-50 overflow-hidden pl-2">

                                {/* Primary Level */}
                                <div className="relative pl-12">
                                    <div className="absolute left-2 top-2 w-8 h-8 bg-green-100 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-green-600 font-bold z-10">1</div>
                                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">Primary Level</h4>
                                        <p className="text-sm text-gray-600">
                                            If you do not receive a response within <strong>7 days</strong> of receipt of the complaint, or if you are dissatisfied with the response, escalate to the next level.
                                        </p>
                                    </div>
                                </div>

                                {/* Secondary Level */}
                                <div className="relative pl-12">
                                    <div className="absolute left-2 top-2 w-8 h-8 bg-blue-100 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-blue-600 font-bold z-10">2</div>
                                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                        <h4 className="text-lg font-bold text-gray-900 mb-4">Secondary Level</h4>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Head of Client Servicing</div>
                                                <div className="font-semibold text-gray-900">Mr. Sumit Chaturvedi</div>
                                                <div className="mt-2 text-sm text-gray-600 space-y-1">
                                                    <div className="flex items-center gap-2">📞 0731-4258021</div>
                                                    <div className="flex items-center gap-2 break-all">✉️ support@stockologysecurities.com</div>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Compliance Officer</div>
                                                <div className="font-semibold text-gray-900">Arti Soni</div>
                                                <div className="mt-2 text-sm text-gray-600 space-y-1">
                                                    <div className="flex items-center gap-2">📞 9826969206</div>
                                                    <div className="flex items-center gap-2 break-all">✉️ compliance.officer@stockologysecurities.com</div>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 md:col-span-2">
                                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">CEO</div>
                                                <div className="font-semibold text-gray-900">Mr. Aniket Shukla</div>
                                                <div className="mt-2 text-sm text-gray-600 space-y-1">
                                                    <div className="flex items-center gap-2">📞 7777879051</div>
                                                    <div className="flex items-center gap-2 break-all">✉️ Aniket.s@stockologysecurities.com</div>
                                                    {/* <div className="flex items-center gap-2 break-all font-medium text-green-700">✉️ grievance@stockologysecurities.com</div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Third Level */}
                                <div className="relative pl-12">
                                    <div className="absolute left-2 top-2 w-8 h-8 bg-purple-100 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-purple-600 font-bold z-10">3</div>
                                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">Third Level</h4>
                                        <p className="text-sm text-gray-600 mb-4">
                                            If you do not receive a response within <strong>15 days</strong>, or if you are dissatisfied with the response hitherto, you may escalate the complaint to:
                                        </p>
                                        <div className="grid sm:grid-cols-3 gap-4">
                                            <a href="https://scores.sebi.gov.in/" target="_blank" rel="noopener noreferrer" className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors group text-center">
                                                <div className="font-bold text-gray-900 group-hover:text-green-700">SEBI SCORES 2.0</div>
                                                <div className="text-xs text-gray-400 mt-1">scores.sebi.gov.in</div>
                                            </a>
                                            <a href="https://smartodr.in/login" target="_blank" rel="noopener noreferrer" className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group text-center">
                                                <div className="font-bold text-gray-900 group-hover:text-blue-700">SEBI ODR</div>
                                                <div className="text-xs text-gray-400 mt-1">smartodr.in</div>
                                            </a>
                                            <a href="https://investorhelpline.nseindia.com/NICEPLUS/" target="_blank" rel="noopener noreferrer" className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors group text-center">
                                                <div className="font-bold text-gray-900 group-hover:text-purple-700">NSE Helpline</div>
                                                <div className="text-xs text-gray-400 mt-1">investorhelpline.nseindia.com</div>
                                            </a>
                                        </div>
                                        <p className="mt-4 text-xs text-gray-500 italic text-center">
                                            Please quote your Service Ticket/Complaint Ref No. while raising your complaint at SEBI SCORES 2.0 portal/Exchange portal.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}
