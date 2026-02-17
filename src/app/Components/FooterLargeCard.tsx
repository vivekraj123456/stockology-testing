import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaAngleRight, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { LuFacebook } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { IoIosMailUnread } from "react-icons/io";
import { footerData } from "../footerData";

export default function FooterLargeCard() {
  return (
    <div className="mt-8">
      <div className="bg-gradient-to-r from-white to-green-50 rounded-2xl shadow-2xl border border-gray-100 p-8 overflow-hidden">
        <div className="absolute -inset-0.5 bg-gradient-to-br from-green-100/20 to-transparent blur-sm rounded-2xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-1/4">
            <div className="flex items-center gap-4">
              <Image src="/stklogo.png" alt="Stockology" width={120} height={90} className="object-contain" />
              <div>
                <h3 className="text-2xl font-bold text-green-700">Stockology</h3>
                <p className="text-sm text-gray-600">Invest smart. Trade easy.</p>
              </div>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {footerData.services.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <FaAngleRight className="text-green-600" />
                    <Link href={s.path} className="hover:text-green-700">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {(footerData.company as { name: string; path: string }[]).map((c, idx) => (
                  <li key={idx}>
                    <Link href={c.path} className="hover:text-green-700">{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {footerData.quickLinks.map((q, i) => (
                  <li key={i}>
                    <Link href={q.path} className="hover:text-green-700">{q.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

            <div className="lg:w-1/4">
            <h4 className="font-semibold text-gray-800 mb-3">Address</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex items-start gap-2"><FaLocationDot className="text-green-700 mt-1" /> <div>{footerData.contact.address}</div></div>
              <div className="flex items-start gap-2">
                <MdAccessTimeFilled className="text-green-700 mt-1" />
                <div>
                  <div>{footerData.contact.workingHours.weekday}</div>
                  <div>{footerData.contact.workingHours.saturday}</div>
                </div>
              </div>
              <div className="flex items-center gap-2"><IoCall className="text-green-700" /><Link href={`tel:${footerData.contact.phone}`}>{footerData.contact.phone}</Link></div>
              <div className="flex items-center gap-2"><IoIosMailUnread className="text-green-700" /><Link href={`mailto:${footerData.contact.email}`}>{footerData.contact.email}</Link></div>

              <div className="flex items-center gap-3 mt-4">
                {footerData.socialLinks.map((s, i) => {
                  const Icon = s.icon === "FaInstagram" ? FaInstagram : s.icon === "LuFacebook" ? LuFacebook : FaXTwitter;
                  return (
                    <Link key={i} href={s.path} className="p-2 rounded-full bg-white shadow-sm hover:shadow-lg transition-all">
                      <div className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-white hover:bg-green-600 rounded-full transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
