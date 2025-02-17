import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
  // Pixel blocks that make up the fox/crab
  const pixels = [
    // Cabeza
    { x: 45, y: 30, w: 10, h: 10 }, // Centro superior
    { x: 35, y: 35, w: 10, h: 20 }, // Lado izquierdo
    { x: 55, y: 35, w: 10, h: 20 }, // Lado derecho
    { x: 45, y: 40, w: 10, h: 15 }, // Centro
    
    // Orejas/Pinzas
    { x: 25, y: 25, w: 10, h: 10 }, // Izquierda
    { x: 65, y: 25, w: 10, h: 10 }, // Derecha
    
    // Ojos
    { x: 40, y: 45, w: 5, h: 5 }, // Izquierdo
    { x: 55, y: 45, w: 5, h: 5 }, // Derecho
    
    // Patas
    { x: 30, y: 60, w: 10, h: 10 }, // Delantera izquierda
    { x: 60, y: 60, w: 10, h: 10 }, // Delantera derecha
    { x: 35, y: 70, w: 10, h: 10 }, // Trasera izquierda
    { x: 55, y: 70, w: 10, h: 10 }, // Trasera derecha
  ];

  return (
    <motion.div
      className="relative flex items-center gap-2"
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Logo Symbol */}
      <motion.div 
        className="relative w-12 h-12"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.svg
          width="48"
          height="48"
          viewBox="0 0 100 100"
          className="absolute inset-0"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3B82F6' }} />
              <stop offset="100%" style={{ stopColor: '#06B6D4' }} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background Shape */}
          <motion.path
            d="M20 20L50 10L80 20L90 50L80 80L50 90L20 80L10 50L20 20Z"
            fill="url(#logoGradient)"
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 0.05, rotate: 0 }}
            whileHover={{ opacity: 0.1, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="dark:opacity-10"
          />

          {/* Pixel Blocks */}
          {pixels.map((pixel, i) => (
            <motion.rect
              key={i}
              x={pixel.x}
              y={pixel.y}
              width={pixel.w}
              height={pixel.h}
              fill="url(#logoGradient)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 0.8,
                scale: 1,
                transition: {
                  duration: 0.3,
                  delay: i * 0.1
                }
              }}
              whileHover={{
                opacity: 1,
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
              className="opacity-80"
            />
          ))}

          {/* Grid Lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <React.Fragment key={i}>
              <motion.line
                x1={20 + i * 7}
                y1="20"
                x2={20 + i * 7}
                y2="80"
                stroke="url(#logoGradient)"
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.1, 0],
                  transition: {
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity
                  }
                }}
              />
              <motion.line
                x1="20"
                y1={20 + i * 7}
                x2="80"
                y2={20 + i * 7}
                stroke="url(#logoGradient)"
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.1, 0],
                  transition: {
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity
                  }
                }}
              />
            </React.Fragment>
          ))}
        </motion.svg>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="flex flex-col"
      >
        <motion.span 
          className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Portfolio
        </motion.span>
        <motion.span 
          className="text-[10px] text-gray-500 dark:text-gray-400 tracking-[0.2em] uppercase"
          whileHover={{ letterSpacing: "0.3em" }}
          transition={{ duration: 0.3 }}
        >
          anfegu
        </motion.span>
      </motion.div>

      {/* Energy Dot */}
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        whileHover={{ 
          scale: [1, 1.5, 1],
          opacity: [0.8, 1, 0.8],
          transition: {
            duration: 1,
            repeat: Infinity
          }
        }}
      />
    </motion.div>
  );
};

export default Logo;
