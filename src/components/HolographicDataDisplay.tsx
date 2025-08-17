'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Line, Float, MeshDistortMaterial, Plane } from '@react-three/drei';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import * as THREE from 'three';

// ==========================================
// TOPOGRAPHICAL MAP COMPONENT
// ==========================================

const TopographicalMap = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [opacity, setOpacity] = useState(0);
  
  useFrame(({ clock }) => {
    const progress = scrollProgress.get();
    setOpacity(Math.min(progress * 2, 0.3)); // Very subtle visibility
    
    if (meshRef.current) {
      // Gentle rotation and movement
      meshRef.current.rotation.z = progress * 0.1 + Math.sin(clock.elapsedTime * 0.1) * 0.05;
      meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.2) * 0.2;
    }
  });

  // Create a grid of lines to simulate topographical contours
  const lines = [];
  for (let i = 0; i < 10; i++) {
    const points = [];
    for (let j = 0; j < 20; j++) {
      const x = (j - 10) * 0.5;
      const y = Math.sin(j * 0.5 + i * 0.3) * 0.3 + (i - 5) * 0.3;
      const z = Math.cos(j * 0.3) * 0.2;
      points.push(new THREE.Vector3(x, y, z));
    }
    lines.push(
      <Line
        key={i}
        points={points}
        color="#4996df"
        lineWidth={1}
        transparent
        opacity={opacity}
      />
    );
  }

  return (
    <group ref={meshRef} position={[0, 0, -5]}>
      {lines}
      {/* City grid overlay */}
      <gridHelper args={[10, 20, '#1d63a5', '#154979']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  );
};

// ==========================================
// ANIMATED BUTTON COMPONENT
// ==========================================

const AnimatedButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="relative px-12 py-5 text-lg font-semibold text-white border border-[#4996df]/30 rounded-full overflow-hidden transition-all duration-300 hover:border-[#4996df]/60"
      style={{
        background: 'transparent',
      }}
    >
      {/* Animated fill that follows cursor */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 150px at ${mousePosition.x}% ${mousePosition.y}%, rgba(73, 150, 223, 0.3), transparent)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      
      {/* Text with relative positioning */}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

// ==========================================
// HERO TEXT SPLIT ANIMATION
// ==========================================

const SplitHeroText = () => {
  const { scrollYProgress } = useScroll();
  
  // Split animation for hero text - this will affect YOUR existing hero
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 100]);
  const heroRotate = useTransform(scrollYProgress, [0, 0.15], [0, 5]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  
  // Apply these transforms to your existing hero via CSS/style injection
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      // Find and animate your existing hero elements
      const heroSection = document.querySelector('.hero-section');
      const heroTitle = document.querySelector('.hero-title');
      const heroSubtitle = document.querySelector('.hero-subtitle');
      
      if (heroSection) {
        const opacity = 1 - (latest * 10); // Fade out in first 10% of scroll
        const translateY = latest * 500; // Fall down
        const rotate = latest * 10; // Slight rotation
        
        heroSection.style.opacity = Math.max(0, opacity).toString();
        heroSection.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
        heroSection.style.transition = 'none'; // Disable CSS transitions for smooth scroll-linked animation
      }
    });
    
    return unsubscribe;
  }, [scrollYProgress]);
  
  return null; // This component just handles the animation logic
};

// ==========================================
// MAIN HOLOGRAPHIC DISPLAY COMPONENT
// ==========================================

export default function HolographicDataDisplay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth scroll transforms
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 0.5, 0]);
  
  // Clean text animations - white with blue accents only
  const titleOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.75, 0.85], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.15, 0.25, 0.75, 0.85], [50, 0, -100, -150]);
  
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [30, 0, -50, -100]);

  // Story progression
  const [currentChapter, setCurrentChapter] = useState(0);
  
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const chapter = Math.floor(latest * 6);
      setCurrentChapter(Math.min(chapter, 5));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Refined narrative
  const narrative = [
    {
      chapter: 'AWAKENING',
      title: 'You Feel It, Don\'t You?',
      subtitle: 'That Hunger for More',
      body: 'Every morning, checking yesterday\'s numbers. Every evening, wondering what competitors are planning.',
      insight: 'There\'s a better way.'
    },
    {
      chapter: 'REALIZATION',
      title: 'The Game Has Changed',
      subtitle: 'While You Weren\'t Looking',
      body: 'Top dealers aren\'t smarter. They\'re not working harder. They see what you can\'t.',
      insight: 'Until now.'
    },
    {
      chapter: 'REVELATION',
      title: 'Every Competitor\'s Move',
      subtitle: 'Becomes Your Advantage',
      body: 'Real-time intelligence that transforms market pressure into market dominance.',
      insight: '3.2x faster response.'
    },
    {
      chapter: 'TRANSFORMATION',
      title: 'From Survivor to Predator',
      subtitle: 'In 30 Days or Less',
      body: 'Watch competitors scramble while you execute with surgical precision.',
      insight: '$2.4M average increase.'
    },
    {
      chapter: 'ASCENSION',
      title: 'Welcome to the Elite',
      subtitle: 'Where Legends Are Made',
      body: 'Top performers aren\'t born. They\'re armed with intelligence others can\'t access.',
      insight: 'Your time is now.'
    },
    {
      chapter: 'DECISION',
      title: 'One Choice Changes Everything',
      subtitle: 'What Will You Choose?',
      body: 'Continue struggling in the dark, or step into the light of total market awareness.',
      insight: 'Choose wisely.'
    }
  ];

  const currentStory = narrative[currentChapter];

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ height: '800vh' }}
    >
      {/* Hero text that splits and falls */}
      <SplitHeroText />
      
      {/* Seamless purple gradient transition */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        style={{ 
          opacity: gradientOpacity,
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(157, 0, 255, 0.3) 0%, transparent 50%)',
            transform: 'scale(1.5)',
          }}
        />
      </motion.div>

      {/* 3D Topographical Map Background */}
      <div className="fixed inset-0" style={{ opacity: 0.2 }}>
        <Canvas
          camera={{ position: [0, 5, 10], fov: 45 }}
          style={{ background: 'transparent' }}
        >
          <fog attach="fog" args={['#080c16', 10, 50]} />
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={0.3} color="#4996df" />
          <TopographicalMap scrollProgress={scrollYProgress} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            enableRotate={false}
            autoRotate
            autoRotateSpeed={0.1}
          />
        </Canvas>
      </div>

      {/* Main Content Layer */}
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-8 text-center">
          
          {/* Chapter Indicator */}
          <motion.div
            style={{ opacity: contentOpacity }}
            className="mb-12"
          >
            <span className="text-xs font-mono tracking-[0.3em] text-[#4996df]/60 uppercase">
              {currentStory.chapter}
            </span>
          </motion.div>

          {/* Main Title - Clean White */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white"
            style={{ 
              opacity: titleOpacity,
              y: titleY,
            }}
          >
            {currentStory.title}
          </motion.h1>

          {/* Subtitle - Blue Accent */}
          <motion.h2
            className="text-2xl md:text-4xl lg:text-5xl font-light mb-8 text-[#4996df]"
            style={{ 
              opacity: contentOpacity,
              y: contentY
            }}
          >
            {currentStory.subtitle}
          </motion.h2>

          {/* Body Text */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-6 leading-relaxed max-w-3xl mx-auto"
            style={{ 
              opacity: useTransform(scrollYProgress, [0.25, 0.35, 0.65, 0.75], [0, 1, 1, 0])
            }}
          >
            {currentStory.body}
          </motion.p>

          {/* Insight */}
          <motion.div
            className="mt-12"
            style={{ 
              opacity: useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0])
            }}
          >
            <p className="text-3xl md:text-4xl font-bold text-white">
              {currentStory.insight}
            </p>
          </motion.div>

          {/* CTA with Animated Fill */}
          {currentChapter === 5 && (
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <AnimatedButton>
                Begin Your Transformation
              </AnimatedButton>
            </motion.div>
          )}
        </div>
      </div>

      {/* Refined Ambient Particles - Tiny and White */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
            }}
            animate={{
              y: [-5, 5],
              x: [-2, 2],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Minimal Progress Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-32">
        <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#4996df]"
            style={{ scaleX: scrollYProgress }}
            transformOrigin="0%"
          />
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        className="fixed bottom-20 left-1/2 -translate-x-1/2"
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0])
        }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-white/40 text-sm tracking-widest"
        >
          SCROLL TO BEGIN
        </motion.div>
      </motion.div>
    </div>
  );
}