"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Define the Blog type with the expected properties
interface Blog {
  heading: string;
  description: string;
  image: string;
  date?: string; // Add other properties if required
}
const BlogCard = ({ blog }: { blog: Blog }) => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString([], { year: "numeric", month: "long", day: "numeric" });
    setCurrentDate(formattedDate);
  }, []);

  return (
    <motion.div 
      whileHover={{ scale: 1 }} 
      whileTap={{ scale: 0.98 }}
      className="max-w-sm w-full rounded-xl shadow-lg overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
    >
      {/* Image Section with Logo */}
      <div className="relative h-52 w-full bg-cover bg-center transition-transform duration-300 hover:scale-105 object-cover" style={{ backgroundImage: `url(${blog.image || "/placeholder.jpg"})` }}>
        
        {/* Logo (Top Left) */}
        <div className="absolute top-3 left-3">
          <Image 
            src="/stklogo.png"
            alt="Logo"
            width={60} 
            height={60} 
            className="opacity-90 rounded-md object-cover"
          />
        </div>

      </div>

      {/* Date */}
      <div className="text-sm w-fit py-1 px-2 rounded-lg text-gray-600 mt-3 pl-4 ">{currentDate}</div>

      {/* Content */}
      <div className="p-3 flex flex-col ">
        <h1 className="text-xl font-bold text-gray-900 ">{blog.heading}</h1>
        <p className="text-gray-700 text-sm mt-2 line-clamp-2 ">{blog.description}</p>

        {/* Animated Button */}
        <Link href="#">
          <motion.button
            whileHover={{ scale: 1, boxShadow: "0px 0px 10px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.9 }}
            className="text-white bg-black font-semibold text-sm mt-5 rounded-full py-2 px-3 mb-10 transition-all duration-300  hover:bg-gray-800"
          >
            Read More...
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

// Sample Blog Data
const blogData = [
  {
    image: "/admin.jpeg",
    heading: "The Future of Web Development",
    description: "Explore the latest trends and technologies shaping the future of web development in 2025."
  },
  // {
  //   image: "/admin.jpeg",
  //   heading: "AI in Everyday Life",
  //   description: "Discover how artificial intelligence is transforming our daily lives and industries worldwide."
  // },
  {
    image: "/startup.jpeg",
    heading: "Startup Growth Hacks",
    description: "Learn the key strategies and growth hacks that successful startups use to scale their businesses."
  }
];

const Blog = () => {
  return (
    <div className="p-6 flex flex-wrap justify-center gap-6">
      {blogData.map((blog, index) => (
        <BlogCard key={index} blog={blog} />
      ))}
    </div>
  );
};

export default Blog;
