'use client';

import { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';

const IDLE_REOPEN_MS = 20000;
const MOBILE_NUMBER_LENGTH = 10;

export default function PopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    email: '',
    city: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formAlert, setFormAlert] = useState<string | null>(null);

  useEffect(() => {
    // Restore form data if user started filling previously in this browser.
    try {
      const saved = localStorage.getItem('popup_form');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {}

    // Show popup immediately on first load (including browser refresh).
    setIsOpen(true);
    setHasOpenedOnce(true);

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasOpenedOnce || isOpen || isSubmitted) {
      return;
    }

    const scheduleIdleReopen = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(() => {
        setIsOpen(true);
        setHasOpenedOnce(true);
      }, IDLE_REOPEN_MS);
    };

    const interactionEvents: Array<keyof WindowEventMap> = [
      'scroll',
      'wheel',
      'touchmove',
      'touchstart',
      'keydown',
      'mousedown',
      'pointerdown',
      'mousemove',
    ];

    const handleActivity = () => {
      scheduleIdleReopen();
    };

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, handleActivity);
    });

    // Start countdown immediately after popup closes.
    scheduleIdleReopen();

    return () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, handleActivity);
      });
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [hasOpenedOnce, isOpen, isSubmitted]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleClose = () => {
    setFormAlert(null);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const normalizedValue =
      name === 'mobileNo'
        ? value.replace(/\D/g, '').slice(0, MOBILE_NUMBER_LENGTH)
        : value;
    if (formAlert) {
      setFormAlert(null);
    }
    setFormData((prev) => {
      const next = { ...prev, [name]: normalizedValue };
      try {
        localStorage.setItem('popup_form', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.city || !formData.mobileNo) {
      setFormAlert('Please fill in all fields');
      return;
    }
    if (!/^\d{10}$/.test(formData.mobileNo)) {
      setFormAlert('The number should be 10 digits');
      return;
    }

    setFormAlert(null);
    setIsLoading(true);
    try {
      const crmApiEndpoint = process.env.NEXT_PUBLIC_CRM_API_ENDPOINT || '/api/crm/lead';

      const response = await fetch(crmApiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          mobileNo: formData.mobileNo,
          email: formData.email,
          city: formData.city,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setIsSubmitted(true);
        console.log('Data sent to CRM successfully');
        try {
          localStorage.removeItem('popup_form');
        } catch {}
        // Reset form after 2 seconds and close
        setTimeout(() => {
          setFormData({ name: '', mobileNo: '', email: '', city: '' });
          setShowSuccess(false);
          setIsOpen(false);
        }, 2000);
      } else {
        setFormAlert('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormAlert('Unable to submit right now. Please try again in a moment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-3 backdrop-blur-sm sm:items-center sm:p-6">
          <div
            className="relative mx-auto w-full max-w-5xl max-h-[calc(100dvh-1.5rem)] sm:max-h-[90vh]"
            style={{ perspective: '1200px' }}
          >
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl transition-transform duration-300 sm:rounded-3xl" style={{ transformStyle: 'preserve-3d' }}>
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute right-3 top-3 z-50 rounded-full bg-white p-1.5 text-gray-600 shadow-lg transition-all hover:bg-gray-100 hover:text-gray-800 sm:right-6 sm:top-6 sm:p-2"
              >
                <X size={22} />
              </button>
              <div className="grid h-full grid-cols-1 gap-0 lg:grid-cols-5">
                {/* Right side - Image (takes 2 cols, integrated with form) */}
                <div className="hidden lg:flex lg:col-span-2 items-end justify-center bg-gradient-to-br from-white via-blue-50 to-white p-0 relative order-2">
                  <div className="relative z-10 w-full" style={{ filter: 'drop-shadow(-10px 10px 25px rgba(0,0,0,0.06))' }}>
                    <Image
                      src="/female-professional.png"
                      alt="Professional"
                      width={300}
                      height={420}
                      className="object-contain w-full h-auto"
                    />
                  </div>
                </div>

                {/* Left side - Form (takes 3 cols) */}
                <div className="order-1 relative z-20 bg-white p-4 sm:p-6 lg:col-span-3 lg:p-10">

            {showSuccess && (
              <div className="py-6 text-center sm:py-8">
                <CheckCircle size={64} className="mx-auto text-green-600 mb-4" />
                <h3 className="text-2xl font-bold text-green-600 mb-2">Success!</h3>
                <p className="text-gray-600">Your information has been submitted successfully.</p>
              </div>
            )}

	            {!showSuccess && (
	              <>
	                {/* Header */}
	                <div className="mb-5 text-center sm:mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-2">OPEN</p>
                  <h2 className="mb-2 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">DEMAT ACCOUNT</h2>
                  <p className="text-sm font-semibold text-gray-800">AND START YOUR</p>
                  <p className="text-2xl font-bold text-green-600 sm:text-3xl">INVESTMENT</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">JOURNEY WITH US</p>
                </div>

	                {/* Form */}
	                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
	                  {formAlert && (
	                    <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
	                      <AlertCircle size={16} className="mt-0.5 shrink-0" />
	                      <span className="flex-1 leading-5">{formAlert}</span>
	                      <button
	                        type="button"
	                        onClick={() => setFormAlert(null)}
	                        className="rounded p-0.5 text-red-500 transition-colors hover:bg-red-100 hover:text-red-700"
	                        aria-label="Dismiss alert"
	                      >
	                        <X size={14} />
	                      </button>
	                    </div>
	                  )}
	                  <input
	                    type="text"
	                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 shadow-sm transition-all hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 sm:py-3"
                  />

                  <div className="flex gap-2">
                    <input
                      type="tel"
                      name="mobileNo"
                      placeholder="Mobile No"
                      value={formData.mobileNo}
                      onChange={handleInputChange}
                      onInvalid={(event) => {
                        event.currentTarget.setCustomValidity('The number should be 10 digits');
                      }}
                      onInput={(event) => {
                        event.currentTarget.setCustomValidity('');
                      }}
                      maxLength={MOBILE_NUMBER_LENGTH}
                      minLength={MOBILE_NUMBER_LENGTH}
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 shadow-sm transition-all hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-3"
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 shadow-sm transition-all hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-3"
                  />

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 shadow-sm transition-all hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-3"
                  />

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 font-bold text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-blue-300"
                    >
                      {isLoading ? 'Submitting...' : 'SUBMIT'}
                    </button>

                    <a
                      href="https://backoffice.stockologysecurities.com/EKYC/EKYCAccountOpening/Get?RefID=704AF1A76EA24DCEBA655434A385F26E"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-4 py-3 text-center font-bold text-white shadow-lg transition-all hover:from-green-700 hover:to-green-800 hover:shadow-xl"
                    >
                      OPEN AN ACCOUNT
                    </a>
                  </div>
                </form>

                {/* Disclaimer */}
                <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                  I hereby give my consent to Stockology Securities Private Limited that data given herewith is to open my Demat and Trading account. I hereby give my consent to Stockology Securities to fetch my data from KRA, Digilocker, OTP or Bio Metric based e-KYC.
                </p>
                <p className="mt-3 text-center text-xs">
                  <a
                    href="/Terms-&-Conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 underline hover:text-red-700"
                  >
                    Terms & Conditions
                  </a>
                  {' | '}
                  <a
                    href="/Privacy-Policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 underline hover:text-red-700"
                  >
                    Privacy Policy
                  </a>
                </p>
              </>
            )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
