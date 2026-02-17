import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface CardsProps {
  name: string;
  image: string;
}

const Cards: React.FC<CardsProps> = ({ name, image }) => {
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the card is in view
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, rotateX: 180 }}
      animate={{
        opacity: isInView ? 1 : 0, 
        rotateX: isInView ? 0 : 180,
      }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
      className='flex flex-col justify-center items-center hover:shadow-2xl md:h-[230px] md:w-[280px] h-[120px] w-[150px] rounded-b-full bg-gradient-to-t from-green-100 to-red-50'
    >
      <motion.img
        src={image}
        alt={`${name} image`}
        className='md:h-[160px] md:w-[210px] h-[80px] w-[120px] object-contain'
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
      <h1 className='text-center py-3 md:text-lg text-sm font-semibold text-primary'>{name}</h1>
    </motion.div>
  );
};
 
export default Cards;