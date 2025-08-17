'use client';

import { useEffect, useRef, useState } from 'react';

// Static hints - ONLY visible when x-ray passes over
const STATIC_HINTS = [
  { text: "SHOW", subtext: "market data", position: { top: "15%", left: "10%" } },
  { text: "ME", subtext: "the metrics", position: { top: "25%", right: "15%" } },
  { text: "THE", subtext: "intelligence", position: { bottom: "30%", left: "12%" } },
  { text: "MONEY", subtext: "flow patterns", position: { top: "45%", right: "10%" } },
  { text: "SHOW ME", subtext: "opportunities", position: { bottom: "20%", right: "20%" } },
  { text: "THE MONEY", subtext: "movement", position: { top: "60%", left: "8%" } },
];

export default function HulyInspiredBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -500, y: -500 });
  const lastMouseRef = useRef({ x: -500, y: -500 });
  const velocityRef = useRef({ x: 0, y: 0 }); // Track directional velocity
  const intensityRef = useRef(0);
  const fadeTimeoutRef = useRef<NodeJS.Timeout>();
  const trailRef = useRef<Array<{x: number, y: number, life: number}>>([]);
  const totalDistanceRef = useRef(0);
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTimeRef.current;
      
      // Calculate distance and directional velocity
      const deltaX = newX - lastMouseRef.current.x;
      const deltaY = newY - lastMouseRef.current.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Calculate velocity with direction (pixels per millisecond)
      if (deltaTime > 0 && distance > 0) {
        velocityRef.current = {
          x: deltaX / deltaTime,
          y: deltaY / deltaTime
        };
      }
      
      // Add to total distance
      totalDistanceRef.current += distance;
      
      // Calculate intensity based on velocity and total distance
      if (totalDistanceRef.current > 69) { // Beyond safe zone
        const speed = Math.sqrt(velocityRef.current.x ** 2 + velocityRef.current.y ** 2);
        const speedIntensity = Math.min(speed / 2, 1);
        const distanceFactor = Math.min((totalDistanceRef.current - 69) / 231, 1);
        const targetIntensity = (speedIntensity * 0.7 + distanceFactor * 0.3);
        
        // Smooth intensity changes
        intensityRef.current += (targetIntensity - intensityRef.current) * 0.15;
      }
      
      // Clear fade timeout when moving
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
      
      // Update positions and time
      lastMouseRef.current = { x: newX, y: newY };
      lastTimeRef.current = currentTime;
      setMousePosition({ x: newX, y: newY });
    };

          // Start 3-second fade when movement stops
    const handleMouseStop = () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
      
      // Start 2-second fade
      let fadeStart = intensityRef.current;
      let fadeStartTime = Date.now();
      
      const fade = () => {
        const elapsed = Date.now() - fadeStartTime;
        const fadeDuration = 3000; // Increased to 3 seconds for longer fade
        
        if (elapsed < fadeDuration) {
          // Smoother exponential fade
          intensityRef.current = fadeStart * Math.pow(1 - elapsed / fadeDuration, 2);
          fadeTimeoutRef.current = setTimeout(fade, 16); // 60fps
        } else {
          // Fully faded - reset everything
          intensityRef.current = 0;
          totalDistanceRef.current = 0;
          velocityRef.current = { x: 0, y: 0 };
          trailRef.current = [];
        }
      };
      
      fadeTimeoutRef.current = setTimeout(fade, 100); // Start fade after 100ms of no movement
    };

    const handleMouseMoveWithStop = (e: MouseEvent) => {
      handleMouseMove(e);
      handleMouseStop();
    };

    window.addEventListener('mousemove', handleMouseMoveWithStop);
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveWithStop);
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  // Create directional cone-shaped x-ray effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;

    const render = () => {
      // Clear and fill with dark overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.98)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Only show x-ray if intensity > 0
      if (intensityRef.current > 0.01) {
        // Calculate minor offset based on movement direction
        const speed = Math.sqrt(velocityRef.current.x ** 2 + velocityRef.current.y ** 2);
        const normalizedVx = speed > 0 ? -velocityRef.current.x / speed : 0;
        const normalizedVy = speed > 0 ? -velocityRef.current.y / speed : 0;
        
        // Minor directional offset (10-20px max)
        const offsetMagnitude = 10 + Math.min(speed * 10, 10);
        const offsetX = normalizedVx * offsetMagnitude;
        const offsetY = normalizedVy * offsetMagnitude;
        
        // Add current position to trail with directional offset
        trailRef.current.push({
          x: mousePosition.x + offsetX,
          y: mousePosition.y + offsetY,
          life: intensityRef.current
        });

        // Longer trail for better effect
        const maxTrailLength = 12; // Increased from 6
        if (trailRef.current.length > maxTrailLength) {
          trailRef.current.shift();
        }

        // Slower decay for longer tail
        trailRef.current = trailRef.current.map((point, index) => ({
          ...point,
          life: point.life * (0.95 - index * 0.01) // Gradual decay along trail
        })).filter(point => point.life > 0.005);

        // Create cone-shaped x-ray effect
        ctx.globalCompositeOperation = 'destination-out';

        // Draw trail points with directional orientation
        trailRef.current.forEach((point, index) => {
          const trailPosition = index / Math.max(trailRef.current.length - 1, 1);
          const pointIntensity = point.life * (0.3 + trailPosition * 0.7); // Stronger gradient
          
          // Dynamic size based on intensity - DOUBLED SIZE
          const baseRadius = 72 * (0.5 + intensityRef.current * 0.5); // 2x size (was 36)
          const coneWidth = baseRadius * (0.7 + trailPosition * 0.5); // Narrower at back
          
          ctx.save();
          ctx.translate(point.x, point.y);
          
          // Rotate cone based on movement direction
          if (speed > 0) {
            const angle = Math.atan2(velocityRef.current.y, velocityRef.current.x);
            ctx.rotate(angle);
          }
          
          // Create gradient with dynamic intensity
          const gradient = ctx.createRadialGradient(
            0, 0, 0,
            0, 0, coneWidth
          );

          // Adjusted opacity for longer fade
          gradient.addColorStop(0, `rgba(255, 255, 255, ${pointIntensity * 0.9})`);
          gradient.addColorStop(0.2, `rgba(255, 255, 255, ${pointIntensity * 0.7})`);
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${pointIntensity * 0.4})`);
          gradient.addColorStop(0.8, `rgba(255, 255, 255, ${pointIntensity * 0.15})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          // Elliptical cone shape that stretches with movement
          const stretch = 1 + Math.min(speed * 0.5, 0.8); // Dynamic stretching
          ctx.scale(stretch, 0.7);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, coneWidth, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();
        });

        ctx.globalCompositeOperation = 'source-over';
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [mousePosition]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      
      {/* HIDDEN LAYER: Grid - completely invisible until x-ray reveals it */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            {/* Major streets */}
            <pattern id="majorGrid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="none" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2"/>
            </pattern>
            
            {/* Minor streets */}
            <pattern id="minorGrid" width="25" height="25" patternUnits="userSpaceOnUse">
              <rect width="25" height="25" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5"/>
            </pattern>

            {/* Diagonal avenues */}
            <pattern id="diagonalGrid" width="200" height="200" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="200" y2="200" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1" strokeDasharray="10,5"/>
            </pattern>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#minorGrid)"/>
          <rect width="100%" height="100%" fill="url(#majorGrid)"/>
          <rect width="100%" height="100%" fill="url(#diagonalGrid)"/>
          
          {/* Market zones - also hidden */}
          <rect x="15%" y="20%" width="20%" height="25%" 
                fill="rgba(34, 197, 94, 0.05)" stroke="rgba(34, 197, 94, 0.4)" strokeWidth="2" strokeDasharray="5,5"/>
          <rect x="55%" y="45%" width="25%" height="20%" 
                fill="rgba(236, 72, 153, 0.05)" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="2" strokeDasharray="5,5"/>
          <rect x="30%" y="60%" width="30%" height="20%" 
                fill="rgba(251, 191, 36, 0.05)" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="2" strokeDasharray="5,5"/>
        </svg>

        {/* Data nodes - hidden until revealed */}
        <div className="absolute top-[25%] left-[30%] w-8 h-8 bg-blue-500/40 rounded-full blur-md" />
        <div className="absolute top-[45%] right-[35%] w-6 h-6 bg-purple-500/40 rounded-full blur-md" />
        <div className="absolute bottom-[30%] left-[50%] w-8 h-8 bg-green-500/40 rounded-full blur-md" />
        <div className="absolute top-[65%] right-[20%] w-7 h-7 bg-pink-500/40 rounded-full blur-md" />
      </div>

      {/* HIDDEN LAYER: Easter egg hints - completely invisible until x-ray */}
      <div className="absolute inset-0 pointer-events-none">
        {STATIC_HINTS.map((hint, index) => (
          <div
            key={index}
            className="absolute"
            style={hint.position}
          >
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2">
              <div className="text-blue-400/70 text-sm font-semibold tracking-wide">{hint.text}</div>
              <div className="text-gray-500 text-xs">{hint.subtext}</div>
            </div>
          </div>
        ))}
      </div>

      {/* X-RAY MASK: Directional cone beam */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 100 }}
      />

      {/* Minimal UI elements */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 200 }}>
        <div className="absolute bottom-8 right-8 text-gray-800 text-[10px] font-mono opacity-30">
          VANDOKO INTELLIGENCE
        </div>
      </div>
    </div>
  );
}