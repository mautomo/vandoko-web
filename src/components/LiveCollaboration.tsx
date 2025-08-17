'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mike & Mike's FOMO Generator - Making dealers feel the heat of competition

export default function LiveCollaboration() {
  const [viewerCount, setViewerCount] = useState(7);
  const [isIncreasing, setIsIncreasing] = useState(true);
  const [pulseScale, setPulseScale] = useState(1);
  
  // Randomize viewer count between 1-13 with realistic fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => {
        // Organic movement - tends to hover around 5-9, occasionally spikes
        const change = Math.random() > 0.7 ? 2 : 1;
        const direction = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + (change * direction);
        
        // Keep within bounds but weight toward middle range
        if (newCount <= 1) {
          setIsIncreasing(true);
          return 2;
        }
        if (newCount >= 13) {
          setIsIncreasing(false);
          return 12;
        }
        
        // Bias toward staying in the 5-9 range (sweet spot of believability)
        if (newCount < 5 && Math.random() > 0.3) {
          return prev + 1;
        }
        if (newCount > 9 && Math.random() > 0.3) {
          return prev - 1;
        }
        
        setIsIncreasing(direction > 0);
        return newCount;
      });
      
      // Trigger pulse animation
      setPulseScale(1.1);
      setTimeout(() => setPulseScale(1), 200);
    }, 4000 + Math.random() * 3000); // Randomize interval between 4-7 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Random dealer locations for authenticity
  const locations = [
    "Chicago", "Dallas", "Phoenix", "Miami", "Denver", 
    "Seattle", "Atlanta", "Boston", "Detroit", "Vegas"
  ];
  
  const [currentLocation, setCurrentLocation] = useState(locations[0]);
  
  useEffect(() => {
    const locationInterval = setInterval(() => {
      setCurrentLocation(locations[Math.floor(Math.random() * locations.length)]);
    }, 8000);
    
    return () => clearInterval(locationInterval);
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="relative"
      >
        {/* Glowing backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF10F0]/20 via-[#00D4FF]/20 to-[#9D00FF]/20 
                        blur-xl animate-pulse" />
        
        {/* Main container */}
        <div className="relative bg-[#0A0A0F]/90 backdrop-blur-md border border-[#00D4FF]/30 
                        rounded-lg px-5 py-3 flex items-center gap-3">
          
          {/* Pulsing indicator */}
          <div className="relative">
            <motion.div 
              animate={{ scale: pulseScale }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <div className="w-3 h-3 bg-[#00FF88] rounded-full animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 bg-[#00FF88] rounded-full animate-ping" />
            </motion.div>
          </div>
          
          {/* Viewer count with animation */}
          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={viewerCount}
                initial={{ opacity: 0, y: isIncreasing ? -10 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: isIncreasing ? 10 : -10 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-transparent bg-clip-text 
                         bg-gradient-to-r from-[#FF10F0] to-[#00D4FF]"
              >
                {viewerCount}
              </motion.span>
            </AnimatePresence>
            
            <div className="text-sm">
              <div className="text-gray-300">
                dealers viewing now
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLocation}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-[#00FF88]/70 text-xs"
                >
                  Latest from {currentLocation}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Activity waves animation */}
          <div className="flex gap-1 items-end h-6">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-[#00D4FF] to-[#9D00FF]"
                animate={{
                  height: [8, 20, 8],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Hover tooltip */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute -top-8 left-0 text-xs text-gray-400 whitespace-nowrap"
        >
          Real dealers. Real time. Real competition.
        </motion.div>
      </motion.div>
    </div>
  );
}