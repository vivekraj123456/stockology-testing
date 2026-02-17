"use client";
import { useState } from "react";
import { FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";

const locations = [
  { name: "Indore", address: "111, Krishna Business Centre, PU–4, Vijay Nagar, Indore – 452010 (M.P.)", tag: "Indore" },
  // { name: "Bhopal", address: "3RD FLOOR, Jyoti Complex, Zone-I, Maharana Pratap Nagar, Madhya Pradesh 462023 Bhopal", tag: "Bhopal" },
];

export default function SearchBar() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <div className="md:flex items-start md:gap-20 gap-8 p-8 flex-col md:flex-row bg-gradient-to-br from-white to-green-50 shadow-xl rounded-xl">
      {/* Search Input */}
      <div className="w-full md:w-1/2 relative">
        <label className="block text-primary font-semibold mb-3 text-lg">Select Location</label>
        <div className="relative">
          <select
            className="w-full p-4 pl-12 pr-10 border border-gray-300 rounded-lg focus:ring-4 focus:ring-secondary transition-all duration-300 ease-in-out hover:border-green-600 bg-white text-light font-medium shadow-sm cursor-pointer appearance-none"
            value={selectedLocation.name}
            onChange={(e) =>
              setSelectedLocation(locations.find((loc) => loc.name === e.target.value)!)
            }
          >
            {locations.map((loc) => (
              <option key={loc.name} value={loc.name} className="py-3">
                {loc.name}
              </option>
            ))}
          </select>
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 text-xl pointer-events-none">
            <FaMapMarkerAlt />
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg pointer-events-none">
            <FaChevronDown />
          </div>
        </div>
      </div>

      {/* Address Display */}
      <div className="w-full md:w-1/2 p-8 bg-white rounded-xl shadow-lg border-l-4 sm:mt-0 mt-5 border-green-500 hover:shadow-2xl transform transition-all duration-500 hover:scale-105 relative">
        <div className="flex items-center mb-4">
          <FaMapMarkerAlt className="text-green-600 text-3xl mr-3 animate-bounce" />
          <h2 className="text-2xl font-bold text-primary">Address:</h2>
        </div>
        <p className="text-light text-lg leading-relaxed font-medium">{selectedLocation.address}</p>

        {/* Decorative Elements */}
        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-semibold shadow-md  ${selectedLocation.tag === "Popular" ? "bg-secondary text-white" : "bg-secondary text-white"}`}>
          {selectedLocation.tag}
        </div>
      </div>
    </div>
  );
}