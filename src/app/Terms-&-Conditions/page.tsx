import React from 'react'

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-10 py-8 md:py-16 text-primary">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl shadow-md">
        <div className="px-6 md:px-10 py-10 md:py-14">
          <p className="text-green-200 text-sm font-semibold tracking-wide uppercase">Legal</p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Terms & Conditions
          </h1>
          <div className="mt-4 text-white/90 space-y-1">
            <p><span className="font-semibold">Website:</span> www.stockologysecurities.com</p>
          </div>
        </div>
      </section>

      {/* Card */}
      <section className="mt-8 md:mt-12">
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          {/* Intro */}
          <div className="px-6 md:px-10 py-8 md:py-10">
            <p className="text-light md:text-lg leading-relaxed">
              These Terms & Conditions govern your use of <span className="font-semibold text-primary">Stockology Securities Private Limited</span> services, trading platform, and website. By accessing our services, you agree to be bound by these terms.
            </p>
          </div>

          {/* TOC */}
          <div className="px-6 md:px-10 py-6 bg-gray-50 border-t">
            <h2 className="text-xl md:text-2xl font-bold text-primary">Table of Contents</h2>
            <ol className="mt-4 grid md:grid-cols-2 gap-2 list-decimal list-inside text-light">
              <li><a href="#client-responsibility" className="hover:text-secondary">Client Responsibility & Communication</a></li>
              <li><a href="#security-protection" className="hover:text-secondary">Security & Protection</a></li>
              <li><a href="#system-security" className="hover:text-secondary">System Security & Intrusion Detection</a></li>
              <li><a href="#identity-protection" className="hover:text-secondary">Identity Protection</a></li>
              <li><a href="#surveillance-risk" className="hover:text-secondary">Surveillance & Risk Management</a></li>
              <li><a href="#agreement-terms" className="hover:text-secondary">Agreement to Terms</a></li>
            </ol>
          </div>

          {/* Sections */}
          <div className="px-6 md:px-10 py-8 md:py-10 space-y-10">
            {/* 1 */}
            <section id="client-responsibility" className="scroll-mt-28">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">1. Client Responsibility & Communication</h3>
              <p className="text-light mt-3 md:text-lg">The Client must immediately notify Stockology in writing (via email or registered post) if they become aware of:</p>
              <ul className="mt-4 space-y-2 list-disc list-inside text-light md:text-lg">
                <li>Any loss, theft, or unauthorized use of their login credentials, security codes, or account number.</li>
                <li>Any failure to receive trade confirmations, contract notes, or execution reports for orders placed.</li>
                <li>Any confirmation or contract note received for trades not placed by the Client.</li>
                <li>Any discrepancies in their account balance, holdings, or transaction history.</li>
              </ul>
              <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <p className="text-light md:text-lg">
                  <span className="font-semibold text-primary">Important:</span> Upon receiving such a notification, Stockology will take prompt action to suspend or restrict the Client&apos;s account to prevent further unauthorized activity. However, the Client will remain responsible for all transactions executed prior to such notification.
                </p>
              </div>
              <p className="text-light mt-4 md:text-lg">
                Neither Stockology, nor its officers, directors, employees, agents, or affiliates shall be liable for any loss or damage resulting from unauthorized access or transactions conducted using valid client credentials prior to such notification.
              </p>
            </section>

            {/* 2 */}
            <section id="security-protection" className="scroll-mt-28">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">2. Security & Protection</h3>
              <p className="text-light mt-3 md:text-lg">For the safety of your trading account, Stockology provides each Client with a unique User ID and two levels of password protection.</p>
              <ul className="mt-4 space-y-2 list-disc list-inside text-light md:text-lg">
                <li>The transaction password is required each time you place an order and acts as an authentication measure from our secured system.</li>
                <li>For added safety, the transaction password automatically expires every 30 days, prompting you to update it regularly.</li>
                <li>You may change your passwords online at any time.</li>
                <li>We recommend using the &quot;Log Out&quot; button after each session to securely exit your account.</li>
              </ul>
            </section>

            {/* 3 */}
            <section id="system-security" className="scroll-mt-28">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">3. System Security & Intrusion Detection</h3>
              <p className="text-light mt-3 md:text-lg">Our trading infrastructure is safeguarded by advanced internet scanners and intrusion detection systems that constantly monitor traffic for potential security threats.</p>
              <ul className="mt-4 space-y-2 list-disc list-inside text-light md:text-lg">
                <li>All incoming data is scanned against an updated database of attack signatures to detect and block malicious activity.</li>
                <li>In the event of a suspected intrusion attempt, the system automatically terminates the session, records the details, and alerts our security administrators for immediate action.</li>
              </ul>
            </section>

            {/* 4 */}
            <section id="identity-protection" className="scroll-mt-28">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">4. Identity Protection</h3>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg mt-3">
                <p className="text-light md:text-lg font-semibold text-red-800">Security Alert:</p>
                <p className="text-light md:text-lg">Stockology will never ask you to share confidential details like passwords, OTPs, or account numbers through email, SMS, or phone calls.</p>
              </div>
              <ul className="mt-4 space-y-2 list-disc list-inside text-light md:text-lg">
                <li>Do not respond to any communication that claims to be from Stockology but asks for personal or financial information.</li>
                <li>Always verify that the website you access is the official Stockology website, and check that the URL shown in your browser matches our official domain.</li>
                <li>Avoid sending personal or financial information via email or on unverified websites.</li>
              </ul>
            </section>

            {/* 5 */}
            <section id="surveillance-risk" className="scroll-mt-28">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">5. Surveillance & Risk Management</h3>
              <p className="text-light mt-3 md:text-lg">Stockology operates with a robust risk management and surveillance system designed to ensure fair, compliant, and secure trading practices.</p>
              <p className="text-light mt-3 md:text-lg">Our dedicated monitoring team closely observes:</p>
              <ul className="mt-4 space-y-2 list-disc list-inside text-light md:text-lg">
                <li>Terminal activity and order patterns during trading hours.</li>
                <li>Exposure limits, margins, and mark-to-market obligations.</li>
                <li>Timely settlement of funds and securities by clients and branches.</li>
                <li>Turnover and compliance across all partner branches and franchises.</li>
              </ul>
              <p className="text-light mt-4 md:text-lg">
                This system ensures transparent operations and protection of client interests at all times.
              </p>
            </section>

            {/* 6 */}
            <section id="agreement-terms" className="scroll-mt-28">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">6. Agreement to Terms</h3>
              <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                <p className="text-light md:text-lg">
                  By accessing and using our website or trading platform, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
                </p>
                <p className="text-light md:text-lg mt-2">
                  If you do not agree with any part of this agreement, please exit the website immediately.
                </p>
              </div>
            </section>
          </div>

          {/* Footer note */}
          <div className="px-6 md:px-10 py-6 bg-gray-50 border-t">
            <p className="text-xs text-light">These terms are subject to change without notice. Continued use of our services constitutes acceptance of any modifications.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TermsAndConditions