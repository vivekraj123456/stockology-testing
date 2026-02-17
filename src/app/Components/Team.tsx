// "use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// const teamMembers = [
//   {
//     id: 1,
//     name: "John Doe",
//     role: "CEO & Founder",
//     image: "/admin.jpeg",
//     description:
//       "Visionary leader with 10+ years of experience in tech innovation.",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     role: "CTO",
//     image: "/admin.jpeg",
//     description:
//       "Expert in AI and machine learning, driving technological advancements.",
//   },
//   {
//     id: 3,
//     name: "Alice Johnson",
//     role: "Lead Designer",
//     image: "https://via.placeholder.com/150",
//     description:
//       "Creative mind behind our stunning user interfaces and experiences.",
//   },
//   {
//     id: 3,
//     name: "Alice Johnson",
//     role: "Lead Designer",
//     image: "https://via.placeholder.com/150",
//     description:
//       "Creative mind behind our stunning user interfaces and experiences.",
//   },
//   {
//     id: 3,
//     name: "Alice Johnson",
//     role: "Lead Designer",
//     image: "https://via.placeholder.com/150",
//     description:
//       "Creative mind behind our stunning user interfaces and experiences.",
//   },
//   {
//     id: 3,
//     name: "Alice Johnson",
//     role: "Lead Designer",
//     image: "https://via.placeholder.com/150",
//     description:
//       "Creative mind behind our stunning user interfaces and experiences.",
//   },
// ];

// export default function MeetOurTeam() {
//   return (
//     <div className="py-14 px-6 md:px-12 lg:px-20 xl:px-36 container mx-auto">
//       <h1 className="md:text-4xl text-2xl font-bold text-black text-center mb-10">
//         Meet Our Team
//       </h1>

//       <Swiper
//         modules={[Autoplay, Pagination, Navigation]}
//         spaceBetween={40}
//         slidesPerView={1}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         pagination={{ clickable: true }}
//         navigation
//         className="mySwiper w-full" 
//            breakpoints={{
//           430: { slidesPerView: 1 },
//           768: { slidesPerView: 2 }, 
//           1024: { slidesPerView: 3 }, 
//         }}
//       >
//         {teamMembers.map((member) => (
//           <SwiperSlide key={member.id}>
//             <div className=" relative bg-white rounded-3xl shadow-lg overflow-hidden transition-transform  border-2 border-black/30 group w-full">
//               <img
//                 src={member.image}
//                 alt={member.name}
//                 className="w-full h-64 object-cover"
//               />
//               {/* Overlay Effect */}
//               <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-end p-6">
//                 <h2 className=" text-lg font-bold  text-white">{member.name}</h2>
//                 <p className="text-sm text-gray-300">{member.role}</p>
//                 <div className='absolute  bottom-0 p-4 bg-black/35 bg-opacity-30 opacity-0 bg-cover group-hover:opacity-100 transition-opacity duration-300 inset-x-0'>
//                 <p className="text-sm text-gray-200 mt-3 text-center">{member.description}</p>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }


"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import Image from "next/image";

const teamMembers = [
  { name: "Alice Johnson", role: "CEO", image: "/team1.jpg" },
  { name: "Mark Smith", role: "CTO", image: "/team2.jpg" },
  { name: "Emily Davis", role: "Designer", image: "/team3.jpg" },
  { name: "John Doe", role: "Developer", image: "/team4.jpg" },
];

export default function TeamCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [isPlaying, setIsPlaying] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !isPlaying) return;
    const autoplay = setInterval(() => emblaApi.scrollNext(), 3000); // Auto-scroll every 3 seconds
    return () => clearInterval(autoplay);
  }, [emblaApi, isPlaying]);

  return (
    <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
        <p className="text-gray-600 text-xl">The people behind our success.</p>
      </div>

      <div
        className="overflow-hidden"
        ref={emblaRef}
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        <div className="flex gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="min-w-[300px] bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center">
                <Image src={member.image} alt={member.name} width={128} height={128} className="w-32 h-32 rounded-full mb-6 object-cover" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button onClick={scrollPrev} className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
          ◀
        </button>
        <button onClick={scrollNext} className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
          ▶
        </button>
      </div>
    </div>
  );
}