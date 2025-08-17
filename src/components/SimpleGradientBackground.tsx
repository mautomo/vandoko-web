'use client';

import { useEffect, useRef } from 'react';

export default function MeshGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Animated gradient colors
    let time = 0;
    
    const animate = () => {
      time += 0.002;

      // Create mesh gradient with slow animation
      const gradient1 = ctx.createRadialGradient(
        canvas.width * (0.3 + Math.sin(time) * 0.1),
        canvas.height * (0.3 + Math.cos(time) * 0.1),
        0,
        canvas.width * 0.3,
        canvas.height * 0.3,
        canvas.width * 0.5
      );
      gradient1.addColorStop(0, 'rgba(59, 130, 246, 0.15)'); // Blue
      gradient1.addColorStop(1, 'transparent');

      const gradient2 = ctx.createRadialGradient(
        canvas.width * (0.7 + Math.cos(time * 1.2) * 0.1),
        canvas.height * (0.6 + Math.sin(time * 1.2) * 0.1),
        0,
        canvas.width * 0.7,
        canvas.height * 0.6,
        canvas.width * 0.5
      );
      gradient2.addColorStop(0, 'rgba(139, 92, 246, 0.15)'); // Purple
      gradient2.addColorStop(1, 'transparent');

      const gradient3 = ctx.createRadialGradient(
        canvas.width * (0.5 + Math.sin(time * 0.8) * 0.1),
        canvas.height * (0.8 + Math.cos(time * 0.8) * 0.1),
        0,
        canvas.width * 0.5,
        canvas.height * 0.8,
        canvas.width * 0.4
      );
      gradient3.addColorStop(0, 'rgba(236, 72, 153, 0.1)'); // Pink
      gradient3.addColorStop(1, 'transparent');

      // Clear and draw
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 opacity-50"
        style={{ zIndex: 0 }}
      />
      {/* Noise texture overlay for depth */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ zIndex: 1 }}>
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.4" />
        </svg>
      </div>
    </>
  );
}