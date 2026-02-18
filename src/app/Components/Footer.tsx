import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaGooglePlay,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { MdAccessTimeFilled, MdOutlineMailOutline } from "react-icons/md";
import { footerData } from "../footerData";
import Footerend from "./Footerend";

const socialIconMap = {
  facebook: FaFacebookF,
  twitter: FaXTwitter,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  youtube: FaYoutube,
};

type SocialKey = keyof typeof socialIconMap;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerColumns = footerData.columns.filter(
    (section) => section.links && section.links.length > 0
  );

  return (
    <>
      <footer className="border-t border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50/40 text-slate-700">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-10 xl:grid-cols-[1.1fr_2fr] xl:gap-12">
            <div className="space-y-6">
              <div>
                <Link href="/" className="inline-flex items-center gap-3">
                  <Image
                    src="/stklogo.png"
                    alt="Stockology logo"
                    width={84}
                    height={56}
                    className="h-12 w-auto object-contain"
                  />
                  <div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900">
                      {footerData.brand.name}
                    </h2>
                  </div>
                </Link>
              </div>

              <div className="space-y-4 text-base leading-7 text-slate-600">
                <div className="flex items-start gap-4">
                  <FaLocationDot
                    className="mt-1 text-xl text-slate-900"
                    aria-hidden="true"
                  />
                  <p>{footerData.contact.address}</p>
                </div>

                <div className="flex items-start gap-4">
                  <MdAccessTimeFilled
                    className="mt-1 text-xl text-slate-900"
                    aria-hidden="true"
                  />
                  <p>
                    {footerData.contact.workingHours.weekday}
                    <br />
                    {footerData.contact.workingHours.saturday}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <IoCallOutline
                    className="text-xl text-slate-900"
                    aria-hidden="true"
                  />
                  <Link
                    href={`tel:${footerData.contact.phoneHref}`}
                    className="transition hover:text-slate-900"
                  >
                    {footerData.contact.phone}
                  </Link>
                </div>

                <div className="flex items-center gap-4">
                  <MdOutlineMailOutline
                    className="text-xl text-slate-900"
                    aria-hidden="true"
                  />
                  <Link
                    href={`mailto:${footerData.contact.email}`}
                    className="transition hover:text-slate-900"
                  >
                    {footerData.contact.email}
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold uppercase tracking-wide text-slate-900">
                  Download App
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  {footerData.appLinks.map((app) => (
                    <Link
                      key={app.name}
                      href={app.path}
                      target={app.path.startsWith("http") ? "_blank" : undefined}
                      rel={app.path.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex w-[168px] items-center gap-2 rounded-lg border border-white/80 bg-[#060910] px-3 py-2 text-white shadow-[0_4px_10px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-black"
                    >
                      <FaGooglePlay className="text-lg text-emerald-400" aria-hidden="true" />
                      <span className="text-lg font-semibold leading-none">{app.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8 xl:pl-2">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {footerColumns.map((section, index) => (
                  <div key={section.title}>
                    <h3 className="mb-4 text-lg font-semibold uppercase tracking-wide text-slate-900">
                      {section.title}
                    </h3>
                    <ul className="space-y-2.5 text-base text-slate-600">
                      {section.links.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.path}
                            className="inline-flex transition-all duration-200 hover:translate-x-0.5 hover:text-emerald-600 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.35)]"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {index === 0 && (
                      <div className="mt-4">
                        <p className="mb-4 text-lg font-semibold uppercase tracking-wide text-slate-900">
                            Social Media
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          {footerData.socialLinks.map((item) => {
                            const Icon = socialIconMap[item.icon as SocialKey];

                            if (!Icon) {
                              return null;
                            }

                            return (
                              <Link
                                key={item.label}
                                href={item.path}
                                aria-label={item.label}
                                className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-sm text-white transition hover:-translate-y-0.5 hover:bg-slate-700"
                              >
                                <Icon />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </footer>

      <section className="border-t border-slate-300 bg-white">
        <Footerend />
      </section>

      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-slate-600">
          <p>(c) {currentYear} Stockology Securities Private Limited. All Rights Reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
