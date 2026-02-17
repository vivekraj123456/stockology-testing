import Mockup from "./Components/Mockup";
import { CardHoverEffectDemo } from "./Components/Cardhover";
import { Testimonials } from "./Components/Testimonals";
import Visionandmision from "./Components/Visionandmision";
import { Suspense } from "react";
// import CoreValues2 from "./Components/Corevalue2";
import Whychooseus from "./Components/Whychooseus";
import GlassButtonDemo from "./Components/GlassButtonDemo";
import { Metadata } from "next";
// import TeamCarousel from "./Components/Team";

export const metadata: Metadata = {
  title: "Home - Stock Market Trading & Investment Platform",
  description: "Stockology is India's leading stock broker offering zero brokerage trading, free demat account, mutual funds, IPO investments. Start investing with the best trading platform.",
  keywords: ["stock market India", "online trading", "zero brokerage", "demat account", "mutual funds", "IPO investment", "best stock broker"],
  openGraph: {
    title: "Stockology - Best Stock Broker in India | Zero Brokerage",
    description: "Trade smarter with Stockology. Zero brokerage charges, free demat account, expert market insights.",
    images: ["/stklogo.png"],
  },
};

import GatewaySection from "./Components/GatewaySection";
import StockologyCoreValues from "./Components/StockologyCoreValues";
import MobileOnline from "./Components/Mobile&Online";
import PopupModal from "./Components/PopupModal";
import StockDashboard from "./Components/StockDashboard";

export default function Home() {
  return (
    <>
      <PopupModal />
      <Mockup />

      {/* Live Stock Market Dashboard */}
      <section id="live-market-data" className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Live Market Data</h2>
          <p className="text-gray-600">Real-time stock prices, charts, and market insights</p>
        </div>
        <Suspense fallback={<div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">Loading market dashboard...</div>}>
          <StockDashboard />
        </Suspense>
      </section>

      <Whychooseus />

      <CardHoverEffectDemo />
      <GatewaySection />
      <Visionandmision />
      {/* <GlassButtonDemo /> */}

      {/* <StockologyCoreValues /> */}
      {/* <MobileOnline /> */}

      {/* <TeamCarousel /> */}
      {/* <Testimonials /> */}

    </>
  );
}
