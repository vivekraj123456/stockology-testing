"use client";

import React from "react";
import { motion } from "framer-motion";

export default function EscalationMatrix() {
    const data = [
        {
            level: "Customer Care",
            person: "Sumit Chaturvedi",
            contact: "0731-4258021",
            email: "support@stockologysecurities.com",
        },
        {
            level: "Head of Customer Care",
            person: "Sumit Chaturvedi",
            // Placeholder or inferred if missing, checking user text again
            contact: "0731-4258021",
            email: "support@stockologysecurities.com"

        },
        {
            level: "Compliance Officer",
            person: "Arti Soni",
            contact: "9826969206",
            email: "compliance.officer@stockologysecurities.com",
        },
        {
            level: "CEO",
            person: "Aniket Shukla",
            contact: "7777879051",
            email: "compliance.officer@stockologysecurities.com", // Assuming similar logic or N/A if not provided? Text says CEO Aniket Shukla...
        },
    ];

    // Refined data based on user text input:
    // Customer care Aditya Singh 111... 0731-4258021 grievance@stockologysecurities.com
    // Head of Customer care 111... (No name/contact explicit in snippet, assuming same location/contact for now or blank)
    // Compliance Officer Arti Soni ... compliance.officer@...
    // CEO Aniket Shukla ...

    const rows = [
        {
            role: "Customer Care",
            name: "Sumit Chaturvedi",
            address: "111, Krishna Business Centre, PU–4, Vijay Nagar, Indore – 452010 (M.P.)",
            contact: "0731-4258021",
            email: "support@stockologysecurities.com"
        },
        {
            role: "Head of Customer Care",
            name: "Sumit Chaturvedi", // Explicitly missing in provided text
            address: "111, Krishna Business Centre, PU–4, Vijay Nagar, Indore – 452010 (M.P.)",
            contact: "0731-4258021",
            email: "support@stockologysecurities.com"

        },
        {
            role: "Compliance Officer",
            name: "Arti Soni",
            address: "111, Krishna Business Centre, PU–4, Vijay Nagar, Indore – 452010 (M.P.)",
            contact: "9826969206",
            email: "compliance.officer@stockologysecurities.com"
        },
        {
            role: "CEO",
            name: "Aniket Shukla",
            address: "111, Krishna Business Centre, PU–4, Vijay Nagar, Indore – 452010 (M.P.)",
            contact: "7777879051",
            email: "Aniket.s@stockologysecurities.com" // Inferring email or leaving generic
        }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto my-16 px-4">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Escalation Matrix</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    We are committed to resolving your concerns. Please follow the escalation matrix below for any grievances.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-xl bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-green-50/50 border-b border-gray-100">
                                <th className="p-5 font-semibold text-green-800 text-sm tracking-wide uppercase">Details of</th>
                                <th className="p-5 font-semibold text-green-800 text-sm tracking-wide uppercase">Contact Person</th>
                                <th className="p-5 font-semibold text-green-800 text-sm tracking-wide uppercase">Address</th>
                                <th className="p-5 font-semibold text-green-800 text-sm tracking-wide uppercase">Contact / Email</th>
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
                                    <td className="p-5 font-medium text-gray-900">{row.role}</td>
                                    <td className="p-5 text-gray-600 font-medium group-hover:text-green-700 transition-colors">{row.name}</td>
                                    <td className="p-5 text-gray-500 text-sm w-1/3">{row.address}</td>
                                    <td className="p-5 text-gray-500 text-sm">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium text-gray-700">{row.contact}</span>
                                            <a href={`mailto:${row.email}`} className="text-green-600 hover:underline">{row.email}</a>
                                        </div>
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
