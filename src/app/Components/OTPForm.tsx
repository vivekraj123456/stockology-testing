"use client";

import { useState } from "react";

export default function OTPForm() {
  const [mobile, setMobile] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = () => {
    if (!mobile.match(/^\d{10}$/)) {
      setMessage("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!agreed) {
      setMessage("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);
    setMessage("");

    // Simulate OTP sending process
    setTimeout(() => {
      setIsLoading(false);
      setMessage("OTP sent successfully!");
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-red-50 p-8 py-16 rounded-2xl shadow-2xl max-w-md mx-auto mt-10 transform transition-all hover:scale-105">
      <h2 className="text-4xl font-bold text-center mb-8 text-primary">
        Open Account Now
      </h2>
      <label className="block text-light font-medium mb-3">
        Mobile Number
      </label>
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-secondary transition-all duration-300">
        <span className="bg-gray-100 px-4 py-3 text-light font-medium">+91</span>
        <input
          type="tel"
          className="w-full px-4 py-3 focus:outline-none bg-transparent"
          placeholder="Enter mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="terms"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
          className="w-5 h-5 text-secondary rounded focus:ring-secondary"
        />
        <label htmlFor="terms" className="ml-3 text-light text-sm">
          I agree & accept{" "}
          <a href="#" className="text-green-500 font-semibold hover:underline">
            T&C
          </a>
        </label>
      </div>
      <button
        className="w-full mt-6 bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
        onClick={handleSendOTP}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            <span className="ml-2">Sending OTP...</span>
          </div>
        ) : (
          "Send OTP"
        )}
      </button>
      {message && (
        <p className="mt-4 text-center text-sm font-medium text-red-500 animate-fade-in">
          {message}
        </p>
      )}
    </div>
  );
}