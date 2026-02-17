"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BrokerDetails() {
    const details = {
        name: "Stockology Securities Private Limited",
        regNum: "SEBI-INZ000326233",
        regAddress: "111, Krishna Business Centre, PU–4, Vijay Nagar, Indore –452010 (M.P.)",
        branchAddress: "NA",
        contact: "07314258021",
        email: "info@stockologysecurities.com"
    };

    return (
        <div className="w-full max-w-7xl mx-auto my-10 px-4">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">Basic Details of Stock Broker</h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-xl bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-green-50/50 border-b border-gray-100">
                                <th className="p-5 font-semibold text-green-800 text-sm tracking-wide uppercase">Stock Broker Name</th>
                                <th className="p-5 font-semibold text-green-800 text-sm tracking-wide uppercase">Registration Number</th>
                                <th className="p-5 font-semibold text-green-800 text-sm tracking-wide uppercase w-1/4">Registered Address</th>
                                <th className="p-5 font-semibold text-green-800 text-sm tracking-wide uppercase">Branch Address</th>
                                <th className="p-5 font-semibold text-green-800 text-sm tracking-wide uppercase">Contact Number</th>
                                <th className="p-5 font-semibold text-green-800 text-sm tracking-wide uppercase">Email Id</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <motion.tr
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="hover:bg-green-50/30 transition-colors group"
                            >
                                <td className="p-5 font-bold text-gray-900">{details.name}</td>
                                <td className="p-5 text-gray-600 font-mono text-sm">{details.regNum}</td>
                                <td className="p-5 text-gray-500 text-sm leading-relaxed">{details.regAddress}</td>
                                <td className="p-5 text-gray-500">{details.branchAddress}</td>
                                <td className="p-5 text-gray-500 font-mono text-sm">{details.contact}</td>
                                <td className="p-5 text-gray-500 text-sm">
                                    <a href={`mailto:${details.email}`} className="text-green-600 hover:underline">{details.email}</a>
                                </td>
                            </motion.tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
