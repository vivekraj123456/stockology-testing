"use client";
import React from "react";
import GlassButton from "./GlassButton";

/**
 * Demo component showing GlassButton with icons
 */
const GlassButtonDemo = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-12">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Title */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        3D Glassmorphism Buttons
                    </h1>
                    <p className="text-gray-600">
                        Pure CSS & React - No Images Required!
                    </p>
                </div>

                {/* Buttons with Icons */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Glassmorphism Buttons with Icons</h2>
                        <div className="flex flex-wrap gap-6">
                            <GlassButton
                                variant="green"
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                }
                            >
                                Strategy
                            </GlassButton>

                            <GlassButton
                                variant="blue"
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                }
                            >
                                Innovation
                            </GlassButton>

                            <GlassButton
                                variant="purple"
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                }
                            >
                                Growth
                            </GlassButton>

                            <GlassButton
                                variant="red"
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                }
                            >
                                Performance
                            </GlassButton>
                        </div>
                    </div>

                    {/* More Examples with Icons */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">More Icon Examples</h2>
                        <div className="flex flex-wrap gap-6">
                            <GlassButton
                                variant="green"
                                href="/services"
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                }
                            >
                                Our Services
                            </GlassButton>

                            <GlassButton
                                variant="blue"
                                onClick={() => alert('Clicked!')}
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                    </svg>
                                }
                            >
                                Click Me
                            </GlassButton>

                            <GlassButton
                                variant="purple"
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                }
                            >
                                Pricing
                            </GlassButton>
                        </div>
                    </div>
                </div>

                {/* Usage Example */}
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Usage Example:</h3>
                    <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                        {`import GlassButton from "./Components/GlassButton";

// With icon
<GlassButton 
  variant="green" 
  icon={<YourIcon />}
>
  Strategy
</GlassButton>

// As link with icon
<GlassButton 
  variant="purple" 
  href="/page"
  icon={<YourIcon />}
>
  Go to Page
</GlassButton>

// With click handler and icon
<GlassButton 
  variant="red" 
  onClick={() => handleClick()}
  icon={<YourIcon />}
>
  Click Me
</GlassButton>`}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default GlassButtonDemo;
