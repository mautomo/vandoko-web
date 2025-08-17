'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function GradientRevealBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [debugMode, setDebugMode] = useState(false); // Toggle with 'D' key

  useEffect(() => {
    // Set actual window dimensions after mount
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'd' || e.key === 'D') {
        setDebugMode(prev => !prev);
      }
    };

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('keypress', handleKeyPress);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('keypress', handleKeyPress);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate if mouse is near each metric
  const isNearTopLeft = Math.abs(mousePosition.x - 150) < 150 && Math.abs(mousePosition.y - 150) < 100;
  const isNearTopRight = mousePosition.x > dimensions.width - 300 && Math.abs(mousePosition.y - 150) < 100;
  const isNearCenter = Math.abs(mousePosition.x - dimensions.width/2) < 200 && Math.abs(mousePosition.y - dimensions.height/2) < 150;
  const isNearBottomLeft = Math.abs(mousePosition.x - 150) < 150 && mousePosition.y > dimensions.height - 250;

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950" />
      
      {/* Moving gradient orb that follows cursor */}
      <motion.div
        className="absolute w-[600px] h-[600px] pointer-events-none"
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 150 }}
      >
        <div className="w-full h-full bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* Debug info */}
      {debugMode && (
        <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-4 rounded-lg text-xs font-mono">
          <div>Mouse: {mousePosition.x}, {mousePosition.y}</div>
          <div>Hovering: {isHovering ? 'Yes' : 'No'}</div>
          <div>Window: {dimensions.width} x {dimensions.height}</div>
          <div>Near Top Left: {isNearTopLeft ? 'Yes' : 'No'}</div>
          <div>Near Center: {isNearCenter ? 'Yes' : 'No'}</div>
        </div>
      )}

      {/* Hidden metrics that reveal on hover */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left metric */}
        <motion.div
          className="absolute top-24 left-8 p-6 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md max-w-xs"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: isHovering && isNearTopLeft ? 1 : 0,
            scale: isHovering && isNearTopLeft ? 1 : 0.95
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-xs text-blue-400 uppercase tracking-wider mb-1">Market Temperature</div>
          <div className="text-3xl font-bold text-white">87.3°</div>
          <div className="text-sm text-green-400 mt-1">↑ 12% Hot</div>
        </motion.div>

        {/* Top right metric */}
        <motion.div
          className="absolute top-24 right-8 p-6 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md max-w-xs"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: isHovering && isNearTopRight ? 1 : 0,
            scale: isHovering && isNearTopRight ? 1 : 0.95
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-xs text-purple-400 uppercase tracking-wider mb-1">Competitor Pressure</div>
          <div className="text-3xl font-bold text-white">High</div>
          <div className="text-sm text-orange-400 mt-1">3 moves detected</div>
        </motion.div>

        {/* Center metric - THE BIG ONE */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: isHovering && isNearCenter ? 1 : 0,
            scale: isHovering && isNearCenter ? 1 : 0.9
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="text-xs text-green-400 uppercase tracking-wider mb-2">Opportunity Score</div>
          <div className="text-5xl font-bold text-white">9,847</div>
          <div className="text-sm text-gray-400 mt-2">Peak performance window</div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="text-xs text-blue-400">Vandoko Intelligence Active</div>
          </div>
        </motion.div>

        {/* Bottom left metric */}
        <motion.div
          className="absolute bottom-24 left-8 p-6 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md max-w-xs"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: isHovering && isNearBottomLeft ? 1 : 0,
            scale: isHovering && isNearBottomLeft ? 1 : 0.95
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-xs text-pink-400 uppercase tracking-wider mb-1">Active Deals</div>
          <div className="text-3xl font-bold text-white">142</div>
          <div className="text-sm text-blue-400 mt-1">↑ 23 today</div>
        </motion.div>

        {/* Hint text when not hovering anything */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovering && !isNearTopLeft && !isNearTopRight && !isNearCenter && !isNearBottomLeft ? 0.5 : 0
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-gray-500 text-sm">Move cursor to explore metrics...</div>
        </motion.div>

        {/* Grid overlay for depth */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
}