"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaBuilding,  FaArrowLeft } from "react-icons/fa";

type DepartmentType = {
    [key: string]: {
      contact: string;
      phone: string;
    };
  };

const departments:DepartmentType = {
  "Compliance": { contact: "info@stockologysecurities.com", phone: "07314258021" },
  "RMS": { contact: "info@stockologysecurities.com", phone: "07314258021" },
  "Broking and Distribution": { contact: "info@stockologysecurities.com", phone: "07314258021" },
  "Partner Related": { contact: "info@stockologysecurities.com", phone: "07314258021" },
  
};

// const defaultContact = {
//   name: "Customer Support",
//   contact: "support@example.com",
//   phone: "+1 800 123 4567"
// };

const requestTypes = ["Feedback", "Enquiry", "Complaint", "Other"];

export default function DepartmentRequest() {
  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedRequest, setSelectedRequest] = useState("");

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-8 bg-white bg-opacity-20  rounded-3xl shadow-xl shadow-green-100 border border-green-200 "
    >
      <h2 className="text-3xl font-bold text-center text-primary mb-8">Get in Touch with a Department</h2>

      {/* Step Indicator */}
      <div className="flex justify-evenly items-center mb-6 space-x-4">
        <div className={`w-12 h-12 flex items-center text-2xl justify-center rounded-full text-white font-bold ${step >= 1 ? "bg-green-600" : "bg-gray-400"}`}>1</div>
        <div className={`w-20 md:w-[480PX] h-1 ${step >= 2 ? "bg-green-600" : "bg-gray-300"}`}></div>
        <div className={`w-12 h-12 flex items-center text-2xl justify-center rounded-full text-white font-bold ${step >= 2 ? "bg-green-600" : "bg-gray-400"}`}>2</div>
        <div className={`w-20 md:w-[480PX] h-1  ${step >= 3 ? "bg-green-600" : "bg-gray-300"}`}></div>
        <div className={`w-12 h-12 flex items-center justify-center text-2xl rounded-full text-white font-bold ${step >= 3 ? "bg-green-600" : "bg-gray-400"}`}>3</div>
      </div>

      {/* Step 1: Select Department */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold text-primary mb-4">Select a Department:</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(departments).map((dept) => (
              <button
                key={dept}
                className="p-3 bg-white text-primary border border-green-500 rounded-lg shadow-lg hover:bg-green-500 hover:text-white transition duration-300"
                onClick={() => {
                  setSelectedDept(dept);
                  setStep(2);
                }}
              >
                {dept}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 2: Select Request Type */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Request Type:</h3>
          <div className="grid grid-cols-2 gap-4">
            {requestTypes.map((req) => (
              <button
                key={req}
                className="p-3 bg-white text-green-900 border border-green-500 rounded-lg shadow-lg hover:bg-green-500 hover:text-white transition duration-300"
                onClick={() => {
                  setSelectedRequest(req);
                  setStep(3);
                }}
              >
                {req}
              </button>
            ))}
          </div>
          <button
            className="mt-6 text-gray-600 hover:text-gray-900 flex items-center"
            onClick={() => setStep(1)}
          >
            <FaArrowLeft className="mr-2 text-light" /> Back
          </button>
        </motion.div>
      )}

      {/* Step 3: Show Contact Details */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center p-6 bg-gray-100 rounded-lg shadow-lg"
        >
          <FaBuilding className="text-green-600 text-4xl mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-green-900">{selectedDept}</h3>
          <p className="text-lg font-semibold text-primary mt-2">Request Type: {selectedRequest}</p>
          <p className="flex items-center justify-center gap-2 text-lg text-light mt-2">
            <FaEnvelope className="text-green-600" /> {departments[selectedDept]?.contact}
          </p>
          <p className="flex items-center justify-center gap-2 text-lg text-light mt-1">
            <FaPhoneAlt className="text-green-600" /> {departments[selectedDept]?.phone}
          </p>
          <button
            className="mt-6 text-gray-600 hover:text-gray-900 flex items-center"
            onClick={() => setStep(2)}
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}