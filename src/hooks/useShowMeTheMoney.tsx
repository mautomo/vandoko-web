// hooks/useShowMeTheMoney.tsx
// The hidden circuit breaker that unlocks God Mode
// Mike & Mike's secret handshake with the universe

import { useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

const SECRET_CODE = 'SHOWMETHEMONEY';
const ACTIVATION_SOUND = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';

export const useShowMeTheMoney = () => {
  const [keysPressed, setKeysPressed] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  const [godModeReady, setGodModeReady] = useState(false);

  // The electrical surge animation when triggered
  const triggerElectricalSurge = useCallback(() => {
    // Create lightning effect across screen
    const lightning = document.createElement('div');
    lightning.className = 'fixed inset-0 pointer-events-none z-[9999]';
    lightning.style.background = 'linear-gradient(45deg, transparent, #FF10F0, transparent)';
    lightning.style.mixBlendMode = 'screen';
    document.body.appendChild(lightning);

    // Phase 1: The surge
    gsap.to(lightning, {
      opacity: 1,
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      ease: "power4.inOut",
      onComplete: () => {
        lightning.remove();
        initializeGodMode();
      }
    });

    // Screen shake - like a breaker tripping
    gsap.to('body', {
      x: "random(-10, 10)",
      y: "random(-10, 10)",
      duration: 0.05,
      repeat: 10,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set('body', { x: 0, y: 0 });
      }
    });

    // Play activation sound
    const audio = new Audio(ACTIVATION_SOUND);
    audio.volume = 0.3;
    audio.play().catch(() => {}); // Fail silently if audio blocked
  }, []);

  const initializeGodMode = useCallback(() => {
    // Create the God Mode overlay container
    const godModeContainer = document.createElement('div');
    godModeContainer.id = 'god-mode-dashboard';
    godModeContainer.className = 'fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl';
    godModeContainer.innerHTML = `
      <div class="absolute inset-0 overflow-hidden">
        <!-- Circuit board pattern background -->
        <div class="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="2" height="50" fill="#FF10F0" opacity="0.5"/>
                <rect width="50" height="2" fill="#00D4FF" opacity="0.5"/>
                <circle cx="50" cy="50" r="3" fill="#9D00FF"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>
        
        <!-- God Mode Header -->
        <div class="relative z-10 p-8">
          <div class="text-center mb-8">
            <h1 class="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF10F0] via-[#00D4FF] to-[#9D00FF] mb-2">
              GOD MODE ACTIVATED
            </h1>
            <p class="text-[#00FF88] text-xl">Welcome to the Master Control Panel</p>
            <p class="text-gray-400 mt-2">Mike & Mike's Secret Laboratory</p>
          </div>
          
          <!-- Metrics Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <!-- Competitor Crying Index -->
            <div class="bg-gradient-to-br from-[#1C1C2E]/80 to-[#0A0A0F]/80 p-6 rounded-xl border border-[#FF10F0]/30">
              <h3 class="text-[#FF10F0] text-sm uppercase tracking-wider mb-2">Competitor Crying Index</h3>
              <div class="text-4xl font-bold text-white">87.3%</div>
              <div class="text-[#00FF88] text-sm mt-1">↑ 12.4% tears detected</div>
            </div>
            
            <!-- Market Domination Score -->
            <div class="bg-gradient-to-br from-[#1C1C2E]/80 to-[#0A0A0F]/80 p-6 rounded-xl border border-[#00D4FF]/30">
              <h3 class="text-[#00D4FF] text-sm uppercase tracking-wider mb-2">Market Domination Score</h3>
              <div class="text-4xl font-bold text-white">9,847</div>
              <div class="text-[#00FF88] text-sm mt-1">↑ Path to 10K clear</div>
            </div>
            
            <!-- Reality Distortion Field -->
            <div class="bg-gradient-to-br from-[#1C1C2E]/80 to-[#0A0A0F]/80 p-6 rounded-xl border border-[#9D00FF]/30">
              <h3 class="text-[#9D00FF] text-sm uppercase tracking-wider mb-2">Reality Distortion Field</h3>
              <div class="text-4xl font-bold text-white">MAX</div>
              <div class="text-[#00FF88] text-sm mt-1">↑ Bending space-time</div>
            </div>
          </div>
          
          <!-- Hidden Message -->
          <div class="text-center mt-12 opacity-0" id="hidden-message">
            <p class="text-gray-500 text-sm">Two friends. One vision. Infinite possibilities.</p>
            <p class="text-gray-600 text-xs mt-2">Donovan + Dynko = Destiny</p>
          </div>
          
          <!-- Exit Instructions -->
          <div class="absolute top-8 right-8">
            <button onclick="document.getElementById('god-mode-dashboard').remove()" 
                    class="text-gray-400 hover:text-white transition-colors">
              Press ESC to exit God Mode
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(godModeContainer);
    
    // Animate in the dashboard
    gsap.from('#god-mode-dashboard > div > div > div', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    });
    
    // Reveal hidden message after delay
    gsap.to('#hidden-message', {
      opacity: 1,
      delay: 3,
      duration: 2
    });
    
    setGodModeReady(true);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      const newKeysPressed = keysPressed + key;
      
      // Check if the new sequence matches part of our code
      if (SECRET_CODE.startsWith(newKeysPressed)) {
        setKeysPressed(newKeysPressed);
        
        // Visual feedback for each correct key
        const spark = document.createElement('div');
        spark.className = 'fixed pointer-events-none z-[9998]';
        spark.style.left = `${Math.random() * window.innerWidth}px`;
        spark.style.top = `${Math.random() * window.innerHeight}px`;
        spark.style.width = '4px';
        spark.style.height = '4px';
        spark.style.background = '#FF10F0';
        spark.style.borderRadius = '50%';
        spark.style.boxShadow = '0 0 10px #FF10F0';
        document.body.appendChild(spark);
        
        gsap.to(spark, {
          scale: 10,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => spark.remove()
        });
        
        // ACTIVATION!
        if (newKeysPressed === SECRET_CODE && !isActivated) {
          setIsActivated(true);
          triggerElectricalSurge();
        }
      } else if (!SECRET_CODE.startsWith(newKeysPressed)) {
        // Reset if wrong key
        setKeysPressed('');
      }
    };

    // ESC to exit God Mode
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && godModeReady) {
        const godMode = document.getElementById('god-mode-dashboard');
        if (godMode) {
          gsap.to(godMode, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              godMode.remove();
              setGodModeReady(false);
              setIsActivated(false);
              setKeysPressed('');
            }
          });
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [keysPressed, isActivated, godModeReady, triggerElectricalSurge]);

  return {
    isActivated,
    progress: (keysPressed.length / SECRET_CODE.length) * 100,
    godModeReady
  };
};