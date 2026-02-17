'use client';

import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6';
import { IoLocationSharp } from "react-icons/io5";
import { FaUserClock } from "react-icons/fa";
import { PiPhoneCallFill } from "react-icons/pi";
import ContactForm from '../Components/Form';
import Contact from '../Components/Contact';
import SearchBar from '../Components/Search';
import DepartmentRequest from '../Components/Departments';
import AnimatedBackground from '../Components/AnimatedBackground';
import EscalationMatrix from '../Components/EscalationMatrix';
import KeyManagerial from '../Components/KeyManagerial';
import BrokerDetails from '../Components/BrokerDetails';

export default function ContactUs() {
  return (
    <div className="min-h-screen relative text-gray-900 bg-gray-50 selection:bg-green-500/30">
      <AnimatedBackground />

      {/* Hero Section */}
      <div className="relative z-10 pt-24 pb-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-green-200 bg-white/50 backdrop-blur-sm text-green-800 text-sm font-bold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            SUPPORT
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">Us</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Get in touch with us, enquire anything you want, we're here to help and guide you through your financial journey!
          </p>
        </motion.div>
      </div>

      {/* Info Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid md:grid-cols-4 gap-6">
          <div className='flex flex-col justify-center'>
            <h2 className="text-green-600 font-bold mb-2 tracking-wide uppercase text-sm">#GetInTouch</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Let's <br /> Connect
            </h3>
          </div>

          {[
            {
              icon: <IoLocationSharp />,
              title: "Office Location",
              text: "111, Krishna Business Centre, PU–4, Vijay Nagar, Indore – 452010 (M.P.)",
            },
            {
              icon: <FaUserClock />,
              title: "Working Hours",
              text: "9:00 AM to 6:00 PM <br/> Monday to Saturday",
            },
            {
              icon: <PiPhoneCallFill />,
              title: "Communication",
              text: "07314258021 <br/> support@stockologysecurities.com",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgb(22,163,74,0.1)] hover:border-green-500/20 transition-all group"
            >
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600 text-2xl mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: item.text }}></p>
            </motion.div>
          ))}
        </div>
      </div>



      {/* Department Request & Form */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="mb-16">
          <DepartmentRequest />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-2">
            <ContactForm />
          </div>

          <div className="pt-10">
            <span className="text-green-600 font-bold tracking-wide uppercase text-sm mb-2 block">Any Queries?</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">We're here to help</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              For any queries feel free to contact us regarding any stock trends, investments or market insights. We're here to support your financial journey.
            </p>

            <div className="mb-10">
              <p className="text-gray-900 font-semibold mb-6">Stay updated with our latest news:</p>
              <div className="flex gap-4">
                {[
                  { icon: <FaFacebook />, color: "hover:text-blue-600" },
                  { icon: <FaTwitter />, color: "hover:text-blue-400" },
                  { icon: <FaLinkedin />, color: "hover:text-blue-700" },
                  { icon: <FaInstagram />, color: "hover:text-pink-500" },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className={`w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center text-gray-400 text-xl transition-all ${item.color} hover:scale-110 hover:shadow-md`}
                    whileHover={{ rotate: 10 }}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mb-20">
        <motion.div
          className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 px-8 text-center shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready To Get Started?</h2>
            <p className="text-gray-400 text-lg mb-8">Contact us today and let's gain some profit together.</p>
            <button className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-green-900/20">
              Get Started Now
            </button>
          </div>
        </motion.div>
      </div>

      {/* Customer Support Component */}
      <div className="max-w-7xl mx-auto mb-16 px-4">
        <Contact />
      </div>

      <div className="max-w-7xl mx-auto pb-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            A Collaborative Network
          </h2>
          <p className="text-gray-500 text-xl">
            Branches and Partner Offices Working Together
          </p>
        </div>
        <SearchBar />
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto pb-16 px-4">
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.4525351225648!2d75.8946659753057!3d22.748581279366768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd017f4c10db%3A0x46eab79a78b02055!2sKrishna%20business%20centre!5e0!3m2!1sen!2sin!4v1738587680128!5m2!1sen!2sin"
            className="w-full h-[450px]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      {/* Escalation Matrix */}
      <div className="relative z-10 bg-white/50 backdrop-blur-sm py-10 border-y border-gray-100">
        <BrokerDetails />
        <EscalationMatrix />
        <KeyManagerial />
      </div>
    </div>
  );
}
