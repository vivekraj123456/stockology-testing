"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, ArrowRight, Banknote, Clock, Shield } from 'lucide-react';

export default function FundTransfer() {
  const [clientCode, setClientCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleGenerate = () => {
    if (clientCode.trim()) {
      setShowModal(true);
    }
  };

  const bankAccounts = [
    {
      bank: 'HDFC Bank Ltd',
      accountNo: `STKL14${clientCode}`,
      beneficiary: 'Stockology Securities Pvt Ltd USCNB A/C',
      ifsc: 'HDFC0005384',
      MICRCode: '452240046',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  const copyToClipboard = (text: string, accountNo: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(accountNo);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>


      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Payment Methods Grid - Side by Side */}
        <div className="container mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">

            {/* NEFT/RTGS/IMPS Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                    <Banknote className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">NEFT/RTGS/IMPS</h2>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">Transfer to STOCKOLOGY SECURITIES PRIVATE LIMITED</p>
                  </div>
                </div>

                <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
                  Transfer money to your account through NEFT, RTGS or IMPS. Generate your personalized bank account number below.
                </p>

                {/* How to Transfer */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3">How to transfer?</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0 mt-0.5">1</span>
                      <p className="text-gray-700 text-sm">Generate your personalized bank account number</p>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0 mt-0.5">2</span>
                      <p className="text-gray-700 text-sm">Add Stockology Securities Private Limited as beneficiary</p>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0 mt-0.5">3</span>
                      <p className="text-gray-700 text-sm">Transfer funds like normal NEFT/RTGS/IMPS</p>
                    </div>
                  </div>
                </div>

                {/* Client Code Generator */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border-2 border-dashed border-gray-300">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Generate Account Number</h3>
                  <p className="text-gray-600 text-sm mb-4">Enter your Trading/Client code</p>

                  <div className="space-y-3">
                    <input
                      id="clientCode"
                      type="text"
                      value={clientCode}
                      onChange={(e) => setClientCode(e.target.value)}
                      placeholder="e.g., 3214"
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-gray-900 font-medium text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                    <motion.button
                      onClick={handleGenerate}
                      disabled={!clientCode.trim()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-2.5 rounded-lg font-bold text-white shadow-lg transition-all flex items-center justify-center space-x-2 text-sm ${clientCode.trim()
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl'
                        : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                      <span>Generate Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                {/* Important Notes */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="max-w-4xl mx-auto mt-8"
                >
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="text-3xl mr-3">⚠️</span>
                      Important Notes
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <span className="text-yellow-600 text-xl mr-3">•</span>
                        <p className="text-gray-700">Transfer only from the bank account registered with Stockology Securities</p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-yellow-600 text-xl mr-3">•</span>
                        <p className="text-gray-700">Funds will be reflected within 2 hours on working days to your trading account</p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-yellow-600 text-xl mr-3">•</span>
                        <p className="text-gray-700">Keep your client code confidential and do not share it with unauthorized persons</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

            </motion.div>

            {/* UPI Payment Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">UPI Payment</h2>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">Pay to Stockology Securities Private Limited</p>
                  </div>
                </div>

                <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
                  Transfer funds instantly via UPI from the Stockology Securities Private Limited app under my accounts tab.
                </p>

                {/* UPI Info */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-500 text-white px-3 py-1.5 rounded-lg font-bold text-xs flex items-center">
                      <Clock className="w-3 h-3 mr-1.5" />
                      Instant
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0 mt-0.5">⏱</div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Time taken:</p>
                        <p className="text-gray-700 text-xs">Instant (Ledger posting by end of day)</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0 mt-0.5">₹</div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Charges:</p>
                        <p className="text-green-600 font-bold text-sm">Free</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 border-2 border-dashed border-gray-300">
                  <div className="bg-white rounded-lg p-4 shadow-lg">
                    <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mb-3">
                      <div className="text-center">
                        <svg className="w-24 h-24 mx-auto text-green-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm-2 8h8v8H3v-8zm2 2v4h4v-4H5zm8-12v8h8V3h-8zm2 2h4v4h-4V5zm4 8h-2v2h2v-2zm-2 2h-2v2h2v-2zm2 0h2v2h-2v-2zm0 4h2v2h-2v-2zm-4-4h2v4h-2v-4zm4-4h2v2h-2v-2z" />
                        </svg>
                        <p className="text-gray-500 font-medium text-xs mt-1">QR Code</p>
                      </div>
                    </div>
                    <p className="text-center text-xs text-gray-600 font-semibold">
                      STOCKOLOGY SECURITIES PRIVATE LIMITED
                    </p>
                    <p className="text-center text-xs text-gray-500 mt-1">
                      Scan to pay via UPI
                    </p>
                  </div>
                </div>

                {/* <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2.5 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Open UPI App</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button> */}
              </div>
            </motion.div>
          </div>
        </div>


      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-t-2xl relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Your Bank Account Details</h2>
                <p className="text-green-50">You can fund your equity trading account by transferring money to any of the following bank accounts:</p>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {bankAccounts.map((account, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200 hover:border-green-300 transition-all"
                  >
                    <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${account.color} text-white font-bold mb-4`}>
                      {account.bank}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Bank Account No.:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-900 font-bold text-lg">{account.accountNo}</span>
                          <button
                            onClick={() => copyToClipboard(account.accountNo, account.accountNo)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-all"
                            title="Copy account number"
                          >
                            {copiedAccount === account.accountNo ? (
                              <Check className="w-5 h-5 text-green-600" />
                            ) : (
                              <Copy className="w-5 h-5 text-gray-600" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Beneficiary Name:</span>
                        <div className="flex items-center space-x-2">

                          <span className="text-gray-900 font-semibold">{account.beneficiary}</span>
                          <button
                            onClick={() => copyToClipboard(account.beneficiary, `${account.beneficiary}-beneficiary`)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-all"
                            title="Copy Beneficiary Name"
                          >
                            {copiedAccount === `${account.beneficiary}-beneficiary` ? (
                              <Check className="w-5 h-5 text-green-600" />
                            ) : (
                              <Copy className="w-5 h-5 text-gray-600" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">IFSC Code:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-900 font-bold">{account.ifsc}</span>
                          <button
                            onClick={() => copyToClipboard(account.ifsc, `${account.accountNo}-ifsc`)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-all"
                            title="Copy IFSC code"
                          >
                            {copiedAccount === `${account.accountNo}-ifsc` ? (
                              <Check className="w-5 h-5 text-green-600" />
                            ) : (
                              <Copy className="w-5 h-5 text-gray-600" />
                            )}
                          </button>


                        </div>

                      </div>
                      <p className="text-gray-900 font-bold text-right">( fifth character is Zero )</p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">MICR Code:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-900 font-bold">{account.MICRCode}</span>
                          <button
                            onClick={() => copyToClipboard(account.MICRCode, `${account.accountNo}-micr`)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-all"
                            title="Copy MICR Code"
                          >
                            {copiedAccount === `${account.accountNo}-micr` ? (
                              <Check className="w-5 h-5 text-green-600" />
                            ) : (
                              <Copy className="w-5 h-5 text-gray-600" />
                            )}
                          </button>


                        </div>

                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3">How to transfer?</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0 mt-0.5">1</span>
                      <p className="text-gray-700 text-sm"> Login to your net banking account Add Stockology Securities Pvt Ltd USCNB A/C as a beneficiary </p>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0 mt-0.5">2</span>
                      <p className="text-gray-700 text-sm">After adding the beneficiary, you can transfer funds anytime using NEFT/RTGS/IMPS just like a normal bank transfer. </p>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0 mt-0.5">3</span>
                      <p className="text-gray-700 text-sm">Transfer funds like normal NEFT/RTGS/IMPS</p>
                    </div>
                  </div>
                </div>
                {/* Modal Footer */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Please ensure you transfer funds only from your registered bank account with your demat account. Transfers from unregistered accounts not accepted.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
