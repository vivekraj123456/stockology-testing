'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';



const trendingIPOs = [
  { name: 'ABC Tech Ltd.', price: '₹850', status: 'Upcoming', date: '15th Feb 2025', image: '/ipo1.jpg' },
  { name: 'XYZ Pharma', price: '₹1,200', status: 'Open', date: '10th Feb 2025', image: '/ipo2.jpg' },
  { name: 'FinCorp Bank', price: '₹620', status: 'Closed', date: '5th Feb 2025', image: '/ipo3.jpg' },
  { name: 'ABC Tech Ltd.', price: '₹850', status: 'Upcoming', date: '15th Feb 2025', image: '/ipo1.jpg' },
  { name: 'XYZ Pharma', price: '₹1,200', status: 'Open', date: '10th Feb 2025', image: '/ipo2.jpg' },
  { name: 'ABC Tech Ltd.', price: '₹850', status: 'Upcoming', date: '15th Feb 2025', image: '/ipo1.jpg' },
  { name: 'XYZ Pharma', price: '₹1,200', status: 'Open', date: '10th Feb 2025', image: '/ipo2.jpg' },
  { name: 'ABC Tech Ltd.', price: '₹850', status: 'Upcoming', date: '15th Feb 2025', image: '/ipo1.jpg' },
  { name: 'XYZ Pharma', price: '₹1,200', status: 'Open', date: '10th Feb 2025', image: '/ipo2.jpg' },
];

const faqs = [
  {  question: 'What is an IPO?', answer: 'An Initial Public Offering (IPO) is when a private company offers its shares to the public for the first time.' },
  {  question: 'How can I invest in an IPO?', answer: 'You can apply for an IPO through your trading account or banking portal linked with your Demat account.' },
  {  question: 'What are the risks of investing in an IPO?', answer: 'IPO investments carry market risks, including price volatility and potential loss of capital.' },
];

const IPOInvestments = () => {
  return (
    <div className=' container mx-auto '>
      {/* Hero Section */}
      <div className='relative w-full md:h-[500px] sm:h-[300px] md:flex items-center justify-between bg-green-500 text-white  p-8'>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className='md:max-w-xl  md:px-6'
        >
          <h1 className='md:text-4xl lg:text-6xl text-2xl font-bold '>Invest in the Next Big IPO!</h1>
          <p className='mt-4  lg:text-xl text-sm md:text-lg'>Get early access to the most promising IPOs with expert insights and a seamless investment process.</p>
          <button className='mt-6 px-5 py-2 bg-yellow-400 text-green-900 font-semibold rounded-lg hover:bg-yellow-500 '>Explore IPOs</button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Image src='/IPOBanner.png' width={800} height={600} alt='IPO Banner' className='rounded-xl md:pt-4 md:max-w-full lg:max-w-4xl w-lg' />
        </motion.div>
      </div>
      
      {/* Trending IPOs */}
<div className='p-10'>
  <h2 className='text-3xl font-bold text-center'>Trending IPOs</h2>
  <div className='overflow-x-auto mt-6'>
    <table className='min-w-full table-auto border-collapse'>
      <thead>
        <tr className='bg-gray-100'>
          <th className='py-3 px-4 text-left text-gray-800'>IPO Name</th>
          <th className='py-3 px-4 text-left text-gray-800'>Price</th>
          <th className='py-3 px-4 text-left text-gray-800'>Status</th>
          <th className='py-3 px-4 text-left text-gray-800'>Open Date</th>
          <th className='py-3 px-4 text-left text-gray-800'>Action</th>
        </tr>
      </thead>
      <tbody>
        {trendingIPOs.map((ipo, index) => (
          <tr key={index} className='border-b'>
            <td className='py-3 px-4'>
              <div className='flex items-center'>
                <Image src={ipo.image} width={50} height={50} alt={ipo.name} className='mr-4 rounded' />
                {ipo.name}
              </div>
            </td>
            <td className='py-3 px-4'>{ipo.price}</td>
            <td className='py-3 px-4'>{ipo.status}</td>
            <td className='py-3 px-4'>{ipo.date}</td>
            <td className='py-3 px-4'>
              <button className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>
                Apply Now
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      
     {/* About IPO */}
<div className='relative w-full h-full p-10 bg-[url(/banner1.jpg)] bg-cover bg-center bg-no-repeat text-white'>
  <div className='absolute inset-0 bg-black bg-opacity-70'></div> 
  <div className='relative max-w-3xl mx-auto text-center'>
    <h2 className='text-4xl font-extrabold mb-4 text-white'>What is an IPO?</h2>
    <p className='text-lg text-gray-200 leading-relaxed'>
      An <span className='text-green-400 font-semibold'>Initial Public Offering (IPO)</span> is when a private company sells its shares to the public for the first time. It allows investors to be a part of the company&apos;s growth journey and earn potential returns.
    </p>

    {/* Benefits Section */}
    <div className='mt-8 grid md:grid-cols-2 gap-6 text-left'>
      <div className='flex items-center space-x-3'>
        <span className='text-green-400 text-3xl'>✔</span>
        <p className='text-gray-200'>Opportunity to invest in emerging companies early.</p>
      </div>
      <div className='flex items-center space-x-3'>
        <span className='text-green-400 text-3xl'>✔</span>
        <p className='text-gray-200'>Potential for long-term capital appreciation.</p>
      </div>
      <div className='flex items-center space-x-3'>
        <span className='text-green-400 text-3xl'>✔</span>
        <p className='text-gray-200'>Increased liquidity for early investors.</p>
      </div>
      <div className='flex items-center space-x-3'>
        <span className='text-green-400 text-3xl'>✔</span>
        <p className='text-gray-200'>Ownership in top-performing companies.</p>
      </div>
    </div>
  </div>
</div>

      
      {/* FAQ Section */}
<div className="p-10 bg-gradient-to-b from-gray-100 to-gray-300">
  <h2 className="text-4xl font-extrabold text-center text-gray-900">💡 Frequently Asked Questions</h2>
  <p className="text-center text-lg text-gray-700 mt-2">Find answers to the most common queries below.</p>

  <div className="max-w-3xl mx-auto mt-8 space-y-6">
    {faqs.map((faq, index) => (
      <div 
        key={index} 
        className="group bg-white p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">{faq.question}</h3>
          <span className="text-2xl text-green-500">❓</span>
        </div>
        <p className="text-gray-700 mt-2 leading-relaxed">{faq.answer}</p>
      </div>
    ))}
  </div>
</div>


    </div>
  );
};

export default IPOInvestments;
