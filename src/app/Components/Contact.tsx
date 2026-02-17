import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="relative overflow-hidden py-10 px-6 md:px-14 text-black text-center w-full">
      {/* Left Background Image
<div
        className="absolute inset-0 left-0 w-full bg-cover bg-center h-full"
        style={{ backgroundImage: "url('/leftsideimg.jpg')" }}
      ></div>

      Right Background Image
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/rightisdeimg.jpg')" }}
      ></div> */}


      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto flex justify-between items-center"
      >
        {/* Left side - Heading and description */}
        <div className="realtive w-full md:w-1/2 text-left z-10">
          <h2 className="md:text-5xl  text-3xl font-bold mb-4 text-primary">Customer Support</h2>
          <h3 className="font-semibold py-1  text-secondary md:text-xl lg:text-2xl text-lg">Your Trading Companion - Anytime, Anywhere!</h3>
          <p className="md:text-lg lg:text-xl  text-sm mb-6 md:pr-0 pr-6 text-light">
            At Stockology, we understand that financial markets never sleep, and neither do your questions. Whether you need assistance with account setup, technical support, or investment guidance, our dedicated support team is here for you.
          </p>
          <h3 className=" md:text-xl lg:text-2xl font-semibold py-1 text-primary">How We Help You:</h3>
          <p className="text-sm md:text-lg md:pr-0 pr-6 text-light">✅ Instant Assistance - Get real-time support for your queries.<br />
            ✅ Technical Support - Facing issues with our platform? We&apos;ve got you covered.<br />
            ✅ Investment Guidance - Need help understanding stocks? Our experts can assist.<br />
            ✅ Account Management - Assistance with KYC, deposits, withdrawals, and more.</p>
        </div>

        {/* Right side - Hexagonal contact options */}
        <div className=" md:w-1/2 flex flex-col items-center gap-8">
          {/* Call, Email, and Demat in Hexagonal Shape */}
          <div className="relative w-20 h-20 md:w-32 md:h-32 flex justify-center items-center md:right-28">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-400 transform rotate-45 rounded-xl shadow-lg shadow-green-200">
              <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl flex justify-center items-center border border-white/20">
                <motion.a
                  href="tel:07314258021"
                  className="flex items-center justify-center gap-3 text-white font-semibold px-6 py-3 hover:scale-105 transition"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaPhoneAlt size={20} /> Call Us
                </motion.a>
              </div>
            </div>
          </div>

          <div className="relative md:w-32 md:h-32 w-20 h-20 flex justify-center items-center mt-10 md:bottom-10">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-400 transform rotate-45 rounded-xl shadow-lg shadow-green-200">
              <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl flex justify-center items-center border border-white/20">
                <motion.a
                  href="mailto:support@stockologysecurities.com"
                  className="flex items-center justify-center gap-3 text-white font-semibold px-6 py-3 hover:scale-105 transition"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaEnvelope size={20} /> Email Us
                </motion.a>
              </div>
            </div>
          </div>

          <div className="relative md:w-32 md:h-32 w-20 h-20 flex justify-center items-center mt-10 md:bottom-12 md:right-20">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-400 transform rotate-45 rounded-xl shadow-lg shadow-green-200">
              <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl flex justify-center items-center border border-white/20">
                <motion.a
                  href="#"
                  className="flex flex-col items-center justify-center gap-1 text-white font-semibold px-2 text-center text-sm hover:scale-105 transition"
                  whileHover={{ scale: 1.1 }}
                >
                  Open Demat <br /> Account
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
