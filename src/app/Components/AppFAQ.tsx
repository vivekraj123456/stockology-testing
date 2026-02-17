'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {

    question: ' What is Stockology?',
    answer:
      "Stockology is a cutting-edge stock market platform that provides real-time data, insights, and analysis to help investors make informed decisions. Our goal is to simplify trading and investing for everyone.",
  },
  // {
  //   question: 'How does Stockology provide stock market insights?',
  //   answer:
  //     "Stockology gathers data from multiple reliable sources, processes it using advanced algorithms, and presents it in an easy-to-understand format. We offer market trends, technical analysis, and expert opinions to help users make the best decisions.",
  // },
  {
    question: 'What documents do I need to sign up?',
    answer:
      "You may need a government-issued ID(passport, driver's license),Proof of address, and PAN Card number.",
  },
  // {
  //   question: 'What types of investments are available?',
  //   answer:
  //     "You can trade stocks, ETFs, mutual funds, options, futures, depending on the app's offerings",
  // },
  // {
  //   question: 'Are there any commision fees?',
  //   answer: "Many apps offer commission-free trading, but some advanced features or specific markets may have fees.Check the app's fee schedule",
  // },
  // {
  //   question: 'Is my money safe?',
  //   answer:
  //     "Yes, the app is regulated by financial authorities and uses encryption for security.Funds are secured up to a certain amount.",
  // },
  {
    question: 'Are there any withdrawal fees ? And how long do withdrawal take?',
    answer: 'Some apps charge a withdrawal fee, check the fee schedule for details. Withdrawals typically take 1-5 business days, depending on the methods used.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[url('/leftsideimg.jpg')] bg-cover bg-no-repeat bg-fixed  text-black py-12 px-4 sm:px-6 lg:px-8 w-full flex justify-center">
      <div className="max-w-3xl w-full">
        <header className="mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary">FAQs</h2>
          <p className="text-lg text-light mt-2">Answers to the most frequently asked questions.</p>
        </header>
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-900 pb-4">
              <button
                className="w-full flex text-green-600  justify-between items-center text-lg font-medium focus:outline-none "
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <ChevronDown
                  className={`w-6 h-6 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              {openIndex === index && (
                <p className="text-white text-base rounded-lg py-1 bg-green-700 leading-relaxed px-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
