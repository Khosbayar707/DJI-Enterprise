import React from "react";
import { motion } from "framer-motion";

interface IndustryCardProps {
  title: string;
  img: string;
  desc: string;
}

const Card: React.FC<IndustryCardProps> = ({ title, img, desc }) => {
  return (
    <motion.div
      className="relative rounded-none overflow-hidden shadow-lg h-[345px]"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img src={img} alt={title} className="w-full h-64 object-cover" />
      <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-90 p-4 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-700 text-sm mb-4">{desc}</p>
        <motion.a
          href="#"
          className="text-blue-500 underline"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Learn More
        </motion.a>
      </div>
    </motion.div>
  );
};

export default Card;
