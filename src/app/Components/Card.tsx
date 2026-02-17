// import React from 'react';

// // Define the type for the props
// interface CardProps {
//   title: string; // Title of the card (e.g., "850k")
//   description: string; // Description of the card (e.g., "Employee")
//   backgroundColor?: string; // Optional background color (default: 'bg-green-50')
//   hoverEffect?: boolean; // Optional hover effect (default: true)
//   icon?: React.ReactNode;
// }

// const Card: React.FC<CardProps> = ({
//   title,
//   description,
//   icon,
//   backgroundColor = 'bg-white',
//   hoverEffect = true,
// }) => {
//   return (
//     <div
//       className={`border rounded-xl shadow-md ${backgroundColor} px-10 py-6 md:px-20 w-fit transition-all duration-300 ${
//         hoverEffect ? 'hover:shadow-lg hover:scale-105' : ''
//       }`}
//     >
//        <div className="flex flex-col items-center space-y-1">
//         {icon && <div className="text-4xl">{icon}</div>} 
//         <h1 className={`md:text-4xl text-2xl font-semibold `}>{title}</h1>
//         <p className={`font-medium `}>{description}</p>
//       </div>
//     </div>
//   );
// };

// export default Card;


import React from 'react'
interface CardsProps {
  name: string;

}

const Cards:React.FC<CardsProps> = (props)=> {
  return (
    <div className="relative border border-gray-300 px-6 py-6 items-center flex justify-center text-center rounded-2xl shadow-lg hover:shadow-2xl bg-white/30 backdrop-blur-sm
    w-full h-full max-w-[90%] sm:max-w-[300px] sm:h-auto lg:h-[130px] mx-auto hover:scale-110 hover:border-green-400 transition-all duration-300 ease-in-out group">
  
  {/* Add a premium decorative element */}
  <div className="absolute -top-3.5 -right-3.5 w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-white rounded-full shadow-lg animate-pulse group-hover:scale-125 transition-transform"></div>
  
  <h1 className="text-lg md:text-lg lg:text-2xl font-bold text-gray-800 drop-shadow-sm group-hover:text-green-600 transition-colors">
    {props.name}
  </h1>
</div>
  )
}

export default Cards;