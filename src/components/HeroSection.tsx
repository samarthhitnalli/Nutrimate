'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Background with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/bghai.png')`,
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70 z-0"></div>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 flex flex-col items-center justify-center min-h-screen">
        
        
        
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
        >
          <span className="block bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
            Master the Art of
          </span>
          <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Culinary Excellence
          </span>
        </motion.h1>
        
        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 max-w-2xl mx-auto text-center text-lg md:text-xl text-white/80 font-light"
        >
          Welcome to <span className="font-semibold">NutriMate</span>, your destination for discovering culinary treasures from around the world. Find your perfect dish without the hassle, with step-by-step guidance and expert tips.
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/form">
            <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 transform hover:-translate-y-1">
              Explore Recipes
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;