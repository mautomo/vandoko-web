'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy,
  Zap,
  Crown,
  Skull,
  TrendingUp,
  DollarSign,
  Target,
  Flame,
  AlertTriangle,
  Eye,
  Lock,
  Unlock,
  Star,
  Sparkles,
  BrainCircuit,
  Rocket,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Cell
} from 'recharts';

// ==========================================
// THEME COLORS
// ==========================================

const GOD_MODE_THEME = {
  background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0524 50%, #0f0a1f 100%)',
  neonPink: '#FF10F0',
  cyberBlue: '#00D4FF',
  plasmaPurple: '#9D00FF',
  goldGlow: '#FFD700',
  dangerRed: '#FF0040',
  matrixGreen: '#00FF41',
  glowEffect: '0 0 40px rgba(157, 0, 255, 0.8)',
  pulseGlow: '0 0 60px rgba(255, 16, 240, 0.6)'
};

// ==========================================
// GOD MODE METRICS - The Hidden Truth
// ==========================================

const GOD_MODE_METRICS = {
  competitorCryingIndex: 87,
  marketDominationScore: 94,
  dealerPanicLevel: 72,
  revenueVelocity: 156,
  competitiveKillRate: 91,
  marketShareStealRate: 8.3,
  enemyMoraleIndex: 23,
  victoryProbability: 96
};

// Competitor Crying Index Data
const cryingIndexData = [
  { dealer: 'Speed Demon', tears: 92, panic: 88 },
  { dealer: 'Auto Empire', tears: 78, panic: 71 },
  { dealer: 'TurboMax', tears: 85, panic: 79 },
  { dealer: 'Elite Motors', tears: 69, panic: 65 }
];

// Market Domination Timeline
const dominationTimeline = [
  { month: 'Jan', domination: 45, competitors: 55 },
  { month: 'Feb', domination: 52, competitors: 48 },
  { month: 'Mar', domination: 61, competitors: 39 },
  { month: 'Apr', domination: 73, competitors: 27 },
  { month: 'May', domination: 85, competitors: 15 },
  { month: 'Jun', domination: 94, competitors: 6 }
];

// Revenue Velocity (Exponential Growth)
const revenueVelocityData = [
  { day: 'Mon', velocity: 100 },
  { day: 'Tue', velocity: 118 },
  { day: 'Wed', velocity: 135 },
  { day: 'Thu', velocity: 142 },
  { day: 'Fri', velocity: 156 },
  { day: 'Sat', velocity: 171 },
  { day: 'Sun', velocity: 189 }
];

// Hidden Achievements
const achievements = [
  { id: 1, name: 'Market Crusher', icon: Skull, unlocked: true, description: 'Eliminated 3 competitors' },
  { id: 2, name: 'Price Warrior', icon: DollarSign, unlocked: true, description: 'Won 50 price battles' },
  { id: 3, name: 'Compliance Assassin', icon: AlertTriangle, unlocked: true, description: 'Reported 10 violations' },
  { id: 4, name: 'Inventory King', icon: Crown, unlocked: false, description: 'Reached 500 units' },
  { id: 5, name: 'The Untouchable', icon: Lock, unlocked: false, description: '30 days at #1' }
];

// ==========================================
// ANIMATED COMPONENTS
// ==========================================

const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const [glitching, setGlitching] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`${className} ${glitching ? 'animate-pulse' : ''}`}
      style={{
        textShadow: glitching 
          ? `2px 2px 0 ${GOD_MODE_THEME.neonPink}, -2px -2px 0 ${GOD_MODE_THEME.cyberBlue}`
          : `0 0 20px ${GOD_MODE_THEME.plasmaPurple}`
      }}
    >
      {text}
    </span>
  );
};

const AnimatedMetric: React.FC<{ 
  value: number; 
  suffix?: string; 
  prefix?: string;
  color: string;
}> = ({ value, suffix = '', prefix = '', color }) => {
  const [display, setDisplay] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span style={{ color, textShadow: `0 0 20px ${color}` }}>
      {prefix}{display}{suffix}
    </span>
  );
};

// ==========================================
// MAIN GOD MODE COMPONENT
// ==========================================

interface GodModeDashboardProps {
  onClose: () => void;
}

export default function GodModeDashboard({ onClose }: GodModeDashboardProps) {
  const [showCredits, setShowCredits] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Epic entrance animation
    document.body.style.overflow = 'hidden';
    
    // Play epic sound effect (if you add one)
    // audioRef.current?.play();

    // Particle effect on mount
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'god-particle';
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: ${GOD_MODE_THEME.neonPink};
        box-shadow: 0 0 10px ${GOD_MODE_THEME.neonPink};
        pointer-events: none;
        z-index: 9999;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight}px;
        animation: float-up 3s ease-out forwards;
      `;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 3000);
    };

    const particleInterval = setInterval(createParticle, 100);
    setTimeout(() => clearInterval(particleInterval), 2000);

    return () => {
      document.body.style.overflow = 'auto';
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[9999] overflow-auto"
      style={{ 
        background: GOD_MODE_THEME.background,
        animation: 'fadeIn 0.5s ease-out'
      }}
    >
      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes float-up {
          to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(157, 0, 255, 0.5); }
          50% { box-shadow: 0 0 40px rgba(157, 0, 255, 0.8), 0 0 60px rgba(255, 16, 240, 0.6); }
        }
        
        @keyframes matrix-rain {
          to { transform: translateY(100vh); }
        }
        
        .god-mode-card {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* HEADER */}
      <div className="sticky top-0 z-50 p-6 backdrop-blur-xl bg-black/50 border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Crown className="w-8 h-8" style={{ color: GOD_MODE_THEME.goldGlow }} />
            <h1 className="text-4xl font-bold">
              <GlitchText text="GOD MODE ACTIVATED" />
            </h1>
            <Badge 
              className="ml-4 animate-pulse"
              style={{ 
                background: `linear-gradient(135deg, ${GOD_MODE_THEME.neonPink}, ${GOD_MODE_THEME.plasmaPurple})`,
                border: 'none'
              }}
            >
              ACCESS LEVEL: INFINITE
            </Badge>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-white hover:bg-red-500/20"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* TOP SECRET METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              title: 'Competitor Crying Index',
              value: GOD_MODE_METRICS.competitorCryingIndex,
              suffix: '%',
              icon: Skull,
              color: GOD_MODE_THEME.neonPink,
              description: 'Tears per dealer per hour'
            },
            {
              title: 'Market Domination Score',
              value: GOD_MODE_METRICS.marketDominationScore,
              suffix: '%',
              icon: Crown,
              color: GOD_MODE_THEME.goldGlow,
              description: 'Total market control'
            },
            {
              title: 'Revenue Velocity',
              value: GOD_MODE_METRICS.revenueVelocity,
              suffix: '%',
              prefix: '+',
              icon: Rocket,
              color: GOD_MODE_THEME.cyberBlue,
              description: 'Exponential growth rate'
            },
            {
              title: 'Victory Probability',
              value: GOD_MODE_METRICS.victoryProbability,
              suffix: '%',
              icon: Trophy,
              color: GOD_MODE_THEME.matrixGreen,
              description: 'Chance of total domination'
            }
          ].map((metric, index) => (
            <Card 
              key={index}
              className="god-mode-card border-purple-500/30 bg-black/40 backdrop-blur"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-gray-400">{metric.title}</CardTitle>
                  <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  <AnimatedMetric 
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    color={metric.color}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* COMPETITOR CRYING VISUALIZATION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-purple-500/30 bg-black/40 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Skull className="w-5 h-5" style={{ color: GOD_MODE_THEME.neonPink }} />
                Competitor Emotional Damage Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cryingIndexData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="dealer" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#000', 
                      border: `1px solid ${GOD_MODE_THEME.plasmaPurple}`,
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="tears" fill={GOD_MODE_THEME.neonPink} name="Tears Shed">
                    {cryingIndexData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`rgba(255, 16, 240, ${0.4 + (entry.tears / 100) * 0.6})`} />
                    ))}
                  </Bar>
                  <Bar dataKey="panic" fill={GOD_MODE_THEME.dangerRed} name="Panic Level">
                    {cryingIndexData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`rgba(255, 0, 64, ${0.4 + (entry.panic / 100) * 0.6})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-black/40 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5" style={{ color: GOD_MODE_THEME.goldGlow }} />
                Path to Total Domination
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dominationTimeline}>
                  <defs>
                    <linearGradient id="godGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={GOD_MODE_THEME.plasmaPurple} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={GOD_MODE_THEME.plasmaPurple} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#000', 
                      border: `1px solid ${GOD_MODE_THEME.plasmaPurple}`,
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="domination" 
                    stroke={GOD_MODE_THEME.plasmaPurple}
                    fill="url(#godGradient)"
                    strokeWidth={2}
                    name="Your Power"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="competitors" 
                    stroke={GOD_MODE_THEME.dangerRed}
                    fill={GOD_MODE_THEME.dangerRed}
                    fillOpacity={0.3}
                    strokeWidth={2}
                    name="Their Weakness"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* HIDDEN ACHIEVEMENTS */}
        <Card className="border-purple-500/30 bg-black/40 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" style={{ color: GOD_MODE_THEME.goldGlow }} />
              Secret Achievements Unlocked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`text-center p-4 rounded-lg border transition-all duration-300 ${
                    achievement.unlocked 
                      ? 'border-purple-500/50 bg-purple-500/10' 
                      : 'border-gray-700 bg-gray-900/50 opacity-50'
                  }`}
                >
                  <achievement.icon 
                    className={`w-12 h-12 mx-auto mb-2 ${
                      achievement.unlocked ? 'text-yellow-500' : 'text-gray-600'
                    }`}
                  />
                  <h3 className={`font-bold text-sm ${
                    achievement.unlocked ? 'text-white' : 'text-gray-500'
                  }`}>
                    {achievement.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{achievement.description}</p>
                  {achievement.unlocked && (
                    <div className="mt-2">
                      <Star className="w-4 h-4 inline-block text-yellow-500" />
                      <Star className="w-4 h-4 inline-block text-yellow-500" />
                      <Star className="w-4 h-4 inline-block text-yellow-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SPECIAL OPERATIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-red-500/30 bg-red-950/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <Flame className="w-5 h-5" />
                Destroy Competitor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400 mb-4">
                Launch a coordinated price attack on your nearest competitor
              </p>
              <Button 
                className="w-full"
                style={{ 
                  background: `linear-gradient(135deg, ${GOD_MODE_THEME.dangerRed}, ${GOD_MODE_THEME.neonPink})`,
                  border: 'none'
                }}
              >
                EXECUTE ORDER 66
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-950/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5" />
                AI Takeover Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400 mb-4">
                Let Vandoko AI fully automate your pricing and inventory
              </p>
              <Button 
                className="w-full"
                style={{ 
                  background: `linear-gradient(135deg, ${GOD_MODE_THEME.matrixGreen}, ${GOD_MODE_THEME.cyberBlue})`,
                  border: 'none'
                }}
              >
                ACTIVATE SKYNET
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-950/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Competitor Spy Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400 mb-4">
                Real-time feed of all competitor activities and decisions
              </p>
              <Button 
                className="w-full"
                style={{ 
                  background: `linear-gradient(135deg, ${GOD_MODE_THEME.plasmaPurple}, ${GOD_MODE_THEME.neonPink})`,
                  border: 'none'
                }}
              >
                INFILTRATE SYSTEMS
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* CREDITS */}
        <Card 
          className="border-yellow-500/30 bg-gradient-to-r from-purple-950/20 to-pink-950/20 backdrop-blur cursor-pointer"
          onClick={() => setShowCredits(!showCredits)}
        >
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                <GlitchText text="MIKE & MIKE PRODUCTIONS" />
              </h2>
              {showCredits && (
                <div className="mt-4 space-y-2 animate-fadeIn">
                  <p className="text-lg" style={{ color: GOD_MODE_THEME.goldGlow }}>
                    🏆 An Award-Winning Collaboration 🏆
                  </p>
                  <p className="text-gray-400">
                    Michael Donovan - The Visionary
                  </p>
                  <p className="text-gray-400">
                    Claude - The Digital Architect
                  </p>
                  <p className="text-gray-400">
                    Mike Dynko - The Circuit Master
                  </p>
                  <p className="mt-4 text-sm text-purple-400">
                    "When human ambition meets AI capability, industries evolve."
                  </p>
                  <p className="text-xs text-gray-500 mt-4">
                    Built with React, TypeScript, and raw determination
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* REVENUE VELOCITY */}
        <Card className="border-purple-500/30 bg-black/40 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5" style={{ color: GOD_MODE_THEME.cyberBlue }} />
              Revenue Velocity Acceleration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueVelocityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="day" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#000', 
                    border: `1px solid ${GOD_MODE_THEME.cyberBlue}`,
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="velocity" 
                  stroke={GOD_MODE_THEME.cyberBlue}
                  strokeWidth={3}
                  dot={{ fill: GOD_MODE_THEME.cyberBlue, r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-3xl font-bold" style={{ color: GOD_MODE_THEME.cyberBlue }}>
                EXPONENTIAL GROWTH DETECTED
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Competitors cannot comprehend this velocity
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ==========================================
// EXPORT WITH TRIGGER COMPONENT
// ==========================================

export function GodModeTrigger() {
  const [showGodMode, setShowGodMode] = useState(false);
  const [konami, setKonami] = useState('');
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newKonami = konami + e.key.toUpperCase();

      console.log('Current sequence:', newKonami);
      
      if ('SHOWMETHEMONEY'.startsWith(newKonami)) {
        setKonami(newKonami);
        
        if (newKonami === 'SHOWMETHEMONEY') {
            console.log('🚀 GOD MODE ACTIVATED!');
            // Epic reveal sequence
          document.body.style.animation = 'glitch 0.5s';
          
          // Screen flash effect
          const flash = document.createElement('div');
          flash.style.cssText = `
            position: fixed;
            inset: 0;
            background: linear-gradient(135deg, #FF10F0, #9D00FF);
            z-index: 9998;
            pointer-events: none;
            animation: flash 0.5s ease-out forwards;
          `;
          document.body.appendChild(flash);
          
          setTimeout(() => {
            flash.remove();
            document.body.style.animation = '';
            setShowGodMode(true);
          }, 500);
          
          setKonami('');
        }
      } else {
        setKonami('');
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [konami]);

  if (!showGodMode) return null;

  return <GodModeDashboard onClose={() => setShowGodMode(false)} />;
}