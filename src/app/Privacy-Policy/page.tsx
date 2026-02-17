import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-10 py-8 md:py-16 text-primary">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl shadow-md">
        <div className="px-6 md:px-10 py-10 md:py-14">
          <p className="text-green-200 text-sm font-semibold tracking-wide uppercase">
            Legal
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Privacy Policy
          </h1>
          <div className="mt-4 text-white/90 space-y-1">
            <p>
              <span className="font-semibold">Website:</span>{" "}
              www.stockologysecurities.com
            </p>
          </div>
        </div>
      </section>

      {/* Card */}
      <section className="mt-8 md:mt-12">
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          {/* Intro */}
          <div className="px-6 md:px-10 py-8 md:py-10">
            <p className="text-light md:text-lg leading-relaxed">
              At{" "}
              <span className="font-semibold text-primary">
                Stockology Securities Private Limited
              </span>
              {/* (&quot;Stockology&quot;, &quot;we&quot;, &quot;our&quot;,  */}{" "}

              or{" "}


              {/* &quot;us&quot;), */}
              your privacy is important to us. This Privacy
              Policy explains how we collect, use, and protect your personal
              information when you visit our website or interact with our
              services.
            </p>
          </div>

          {/* TOC */}
          <div className="px-6 md:px-10 py-6 bg-gray-50 border-t">
            <h2 className="text-xl md:text-2xl font-bold text-primary">
              Table of Contents
            </h2>
            <ol className="mt-4 grid md:grid-cols-2 gap-2 list-decimal list-inside text-light">
              <li>
                <a href="#collection" className="hover:text-secondary">
                  Collection of Personal Information
                </a>
              </li>
              <li>
                <a href="#use" className="hover:text-secondary">
                  Use of Personal Information
                </a>
              </li>
              <li>
                <a href="#cookies" className="hover:text-secondary">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#links" className="hover:text-secondary">
                  Links to Other Websites
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-secondary">
                  Security
                </a>
              </li>
              <li>
                <a href="#changes" className="hover:text-secondary">
                  Changes to This Privacy Policy
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-secondary">
                  Contact Us
                </a>
              </li>
            </ol>
          </div>

          {/* Sections */}
          <div className="px-6 md:px-10 py-8 md:py-10 space-y-10">
            {/* 1 */}
            <section id="collection" className="scroll-mt-28">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">
                1. Collection of Personal Information
              </h3>
              <p className="text-light mt-3 md:text-lg">
                We do not collect personal information unless you voluntarily
                provide it, such as when you:
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside text-light md:text-lg">
                <li>Fill out a contact form</li>
                <li>Subscribe to our newsletter</li>
                <li>Register for services, webinars, or events</li>
              </ul>
              <p className="text-light mt-4 md:text-lg">
                The types of personal information we may collect include your
                name, email address, phone number, and any other information you
                provide voluntarily.
              </p>
            </section>

            {/* 2 */}
            <section id="use" className="scroll-mt-28">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">
                2. Use of Personal Information
              </h3>
              <p className="text-light mt-3 md:text-lg">
                Any personal information you provide may be used by Stockology
                to:
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside text-light md:text-lg">
                <li>Respond to your inquiries or requests</li>
                <li>
                  Provide you with information about our services and updates
                </li>
                <li>Improve the content and functionality of our website</li>
              </ul>
              <p className="text-light mt-4 md:text-lg">
                We may share your personal information with other Stockology
                group companies that follow similar or better privacy practices.
              </p>
            </section>

            {/* 3 */}
            <section id="cookies" className="scroll-mt-28">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">
                3. Cookies
              </h3>
              <p className="text-light mt-3 md:text-lg">
                Our website may use cookies to improve your experience. Cookies
                are small pieces of data stored on your device that allow us to
                recognize you when you return to our site.
              </p>
              <p className="text-light mt-3 md:text-lg">
                You can set your browser to alert you when a cookie is received
                or to refuse cookies entirely. Please note that some features of
                the site may not function properly without cookies.
              </p>
            </section>

            {/* 4 */}
            <section id="links" className="scroll-mt-28">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">
                4. Links to Other Websites
              </h3>
              <p className="text-light mt-3 md:text-lg">
                Our website may contain links to external websites. Stockology
                is not responsible for the privacy practices or content of these
                external sites. We encourage you to review the privacy policies
                of any third-party websites you visit.
              </p>
            </section>

            {/* 5 */}
            <section id="security" className="scroll-mt-28">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">
                5. Security
              </h3>
              <p className="text-light mt-3 md:text-lg">
                We take reasonable steps to protect your personal information
                from unauthorized access, use, or disclosure. However, no
                website or transmission of information is completely secure, so
                we cannot guarantee absolute security.
              </p>
            </section>

            {/* 6 */}
            <section id="changes" className="scroll-mt-28">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">
                6. Changes to This Privacy Policy
              </h3>
              <p className="text-light mt-3 md:text-lg">
                We may update this Privacy Policy from time to time. Any changes
                will be reflected on this page with an updated effective date.
                We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            {/* 7 */}
            <section id="contact" className="scroll-mt-28">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">
                7. Contact Us
              </h3>
              <div className="mt-4 grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-5 border">
                  <p className="text-sm font-semibold text-secondary uppercase tracking-wide">
                    Company
                  </p>
                  <p className="text-primary font-bold mt-1">
                    Stockology Securities Private Limited
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-5 border">
                  <p className="text-sm font-semibold text-secondary uppercase tracking-wide">
                    Website
                  </p>
                  <p className="text-primary font-bold mt-1">
                    www.stockologysecurities.com
                  </p>
                </div>
              </div>
              {/* <div className="mt-4 grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-5 border">
                  <p className="text-sm font-semibold text-primary">Email</p>
                  <p className="text-light">[Insert Email]</p>
                </div>
                <div className="bg-white rounded-xl p-5 border">
                  <p className="text-sm font-semibold text-primary">Phone</p>
                  <p className="text-light">07314258021</p>
                </div>
              </div> */}
            </section>
          </div>

          {/* Footer note */}
          <div className="px-6 md:px-10 py-6 bg-gray-50 border-t">
            <p className="text-xs text-light">
              If any inconsistency arises between this Privacy Policy and any
              other document referenced on the site, this Privacy Policy will
              prevail for matters related to personal information.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
