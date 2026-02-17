import { FaMobileAlt, FaFileSignature, FaUserCheck, FaDownload } from "react-icons/fa";
import { useState, useRef } from "react";

const steps = [
  { id: 1, title: "Download App", description: "Get the app or visit the website", icon: <FaDownload /> },
  { id: 2, title: "Verify Mobile", description: "Enter your number & OTP", icon: <FaMobileAlt /> },
  { id: 3, title: "Verify KYC", description: "Submit KYC & bank details", icon: <FaUserCheck /> },
  { id: 4, title: "eSign Docs", description: "Digitally sign your documents", icon: <FaFileSignature /> }
];

export default function Processbar() {
  const [currentStep, setCurrentStep] = useState(1);
  const progressWidth = `${(currentStep / steps.length) * 100}%`;
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Function to set refs persistently
  const setStepRef = (el: HTMLDivElement | null, index: number) => {
    if (el) stepRefs.current[index] = el;
  };

  return (
    <div className="flex flex-col justify-center items-center py-10 px-5 w-full max-w-7xl mx-auto">
      {/* Progress Bar */}
      <div className="w-full bg-gray-300 h-1 rounded-full mb-6 relative">
        <div className="bg-secondary h-2 rounded-full transition-all" style={{ width: progressWidth }}></div>
        <div className="absolute top-[-14px] left-0 w-full flex justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => setStepRef(el, index)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm shadow-md cursor-pointer ${
                step.id === currentStep ? "bg-secondary text-white" : "bg-gray-400 text-gray-200"
              }`}
              onClick={() => setCurrentStep(step.id)}
            >
              {step.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Steps Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-14 gap-6 w-full">
        {steps.map((step, index) => (
          <div
            key={step.id}
            ref={(el) => setStepRef(el, index)}
            className={`flex flex-col items-center text-center p-5 bg-white rounded-xl shadow-lg transition-transform cursor-pointer ${
              step.id <= currentStep ? "scale-105 border-green-500 border-2" : "hover:scale-105"
            }`}
            onClick={() => setCurrentStep(step.id)}
          >
            <div className="text-4xl text-secondary mb-3">{step.icon}</div>
            <h3 className="text-lg font-semibold text-primary">{step.title}</h3>
            <p className="text-sm text-light mt-1">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}