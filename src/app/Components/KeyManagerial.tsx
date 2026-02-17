"use client";

import React from "react";
import { motion } from "framer-motion";

export default function KeyManagerial() {
    const rows = [
        {
            srNo: "1",
            name: "Aniket Shukla",
            designation: "Director",
            mobile: "7777879051",
            email: "Aniket.s@stockologysecurities.com"
        },
        {
            srNo: "2",
            name: "Manish Kumar",
            designation: "Director",
            mobile: "7777879050",
            email: "Manish.k@stockologysecurities.com"
        },
        {
            srNo: "3",
            name: "Arti Soni",
            designation: "Compliance Officer",
            mobile: "9826969206",
            email: "compliance.officer@stockologysecurities.com"
        },
        {
            srNo: "4",
            name: "Aditya Singh",
            designation: "Principle Officer ",
            mobile: "7000419779",
            email: "compliance.officer@stockologysecurities.com"
        }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto my-10 px-4">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">Key Managerial Personnel</h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-xl bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-green-50/50 border-b border-gray-100">
                                <th className="p-5 font-semibold text-green-800 text-sm tracking-wide uppercase text-center w-20">Sr. No</th>
                                <th className="p-5 font-semibold text-green-800 text-sm tracking-wide uppercase">Name of the Individual</th>
                                <th className="p-5 font-semibold text-green-800 text-sm tracking-wide uppercase">Designation</th>
                                <th className="p-5 font-semibold text-green-800 text-sm tracking-wide uppercase">Mobile Number</th>
                                <th className="p-5 font-semibold text-green-800 text-sm tracking-wide uppercase">Email Id</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {rows.map((row, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="hover:bg-green-50/30 transition-colors group"
                                >
                                    <td className="p-5 font-medium text-gray-500 text-center">{row.srNo}</td>
                                    <td className="p-5 text-gray-900 font-bold group-hover:text-green-700 transition-colors">{row.name}</td>
                                    <td className="p-5 text-gray-600 font-medium">{row.designation}</td>
                                    <td className="p-5 text-gray-500 text-sm font-mono">{row.mobile}</td>
                                    <td className="p-5 text-gray-500 text-sm">
                                        <a href={`mailto:${row.email}`} className="text-green-600 hover:underline">{row.email}</a>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
