'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  Car, 
  DollarSign, 
  AlertCircle,
  Settings,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Bell,
  Shield,
  BarChart3,
  Activity,
  Menu,
  X,
  MapPin,
  Zap,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Gauge,
  Trophy,
  Siren,
  TrendingDown,
  Mail,
  Phone,
  Sparkles,
  Building2,
  UserPlus,
  FileText,
  Download,
  Crown,
  Skull,
  Flame,
  Lock,
  Unlock,
  Star,
  BrainCircuit,
  Rocket
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
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
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
  RadialBarChart,
  RadialBar
} from 'recharts';

// ==========================================
// VANDOKO DEEP SPACE THEME COLORS
// ==========================================

const THEME = {
  // Primary Colors
  background: '#080c16',
  foreground: '#e2e8f0',
  primary: '#4996df',
  primaryForeground: '#080c16',
  
  // Secondary & Accent
  secondary: '#080c16',
  secondaryForeground: '#d1d5db',
  accent: '#374151',
  accentForeground: '#d1d5db',
  
  // UI Components
  card: '#080c16',
  cardForeground: '#e2e8f0',
  popover: '#0f172a',
  popoverForeground: '#e2e8f0',
  muted: '#1e293b',
  mutedForeground: '#9ca3af',
  
  // Utility
  border: '#4b5563',
  input: '#4b5563',
  ring: '#4996df',
  
  // Status
  destructive: '#ef4444',
  destructiveForeground: '#0f172a',
  
  // Charts
  chart1: '#4996df',
  chart2: '#257dd0',
  chart3: '#1d63a5',
  chart4: '#154979',
  chart5: '#0e2f4e',
  
  // Gradients for smooth animations
  gradient1: 'linear-gradient(135deg, #4996df 0%, #257dd0 100%)',
  gradient2: 'linear-gradient(135deg, #1d63a5 0%, #154979 100%)',
  glowBlue: '0 0 30px rgba(73, 150, 223, 0.5)',
  glowRed: '0 0 30px rgba(239, 68, 68, 0.5)'
};

// GOD MODE THEME
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
// SUBSCRIPTION TIERS
// ==========================================

const SUBSCRIPTION_TIERS = {
  starter: {
    name: 'MAR Starter',
    users: 1,
    features: ['60 day archive', 'Basic inventory tracking', 'Model mix analysis'],
    price: 400
  },
  mid: {
    name: 'MAR Mid',
    users: 3,
    features: ['180 day archive', 'myDeal Builder', 'Active Alert', 'PDF export', 'Agency user'],
    price: 750
  },
  data: {
    name: 'MAR Data',
    users: 'Unlimited',
    features: ['Lifetime archive', 'Group Manager', 'Active Alert Pro', 'Multi-format export', 'Compliance log'],
    price: 999
  }
};

// ==========================================
// MOCK DATA
// ==========================================

const DEALERSHIP_DATA = {
  name: "Vandoko Demo Dealership",
  tier: 'mid',
  oem: "Toyota",
  oemType: "Import",
  marketArea: "Chicago, IL 60601",
  userAvatar: "VD",
  userName: "Mike Donovan",
  usersActive: 2,
  maxUsers: 3,
  agencyUser: true
};

const COMPETITORS = [
  { 
    name: "Speed Demon Motors", 
    inventory: 285, 
    avgDiscount: 2500, 
    distance: 3.2,
    complianceViolations: 3,
    disclaimerCompliant: false,
    oemCompliant: false
  },
  { 
    name: "Auto Empire", 
    inventory: 342, 
    avgDiscount: 3200, 
    distance: 5.8,
    complianceViolations: 0,
    disclaimerCompliant: true,
    oemCompliant: true
  },
  { 
    name: "TurboMax Dealership", 
    inventory: 198, 
    avgDiscount: 2100, 
    distance: 8.4,
    complianceViolations: 1,
    disclaimerCompliant: true,
    oemCompliant: false
  },
  { 
    name: "Elite Motors", 
    inventory: 267, 
    avgDiscount: 2800, 
    distance: 12.1,
    complianceViolations: 2,
    disclaimerCompliant: false,
    oemCompliant: false
  },
  { 
    name: DEALERSHIP_DATA.name, 
    inventory: 312, 
    avgDiscount: 2750, 
    distance: 0,
    complianceViolations: 0,
    disclaimerCompliant: true,
    oemCompliant: true,
    isYou: true
  }
];

const MARKET_ACTIVITIES = [
  {
    id: '1',
    type: 'violation',
    title: 'Competitor Compliance Violation',
    description: 'Speed Demon Motors - Missing required APR disclaimer',
    dealer: 'Speed Demon Motors',
    impact: 'high',
    time: '5 mins ago',
    sentVia: ['sms', 'email', 'push'],
    actionRequired: true
  },
  {
    id: '2',
    type: 'price',
    title: 'Major Price Drop Alert',
    description: 'Auto Empire slashed Camry prices by $3,500',
    dealer: 'Auto Empire',
    impact: 'high',
    time: '15 mins ago',
    sentVia: ['email', 'push'],
    actionRequired: true
  },
  {
    id: '3',
    type: 'inventory',
    title: 'Inventory Surge',
    description: 'TurboMax added 47 new units',
    dealer: 'TurboMax Dealership',
    impact: 'medium',
    time: '30 mins ago',
    sentVia: ['email'],
    actionRequired: false
  },
  {
    id: '4',
    type: 'opportunity',
    title: 'Market Opportunity',
    description: 'You have the lowest RAV4 price in 50 miles',
    impact: 'high',
    time: '45 mins ago',
    sentVia: ['sms', 'email'],
    actionRequired: true
  }
];

const INVENTORY_BY_MODEL = [
  { model: 'Camry', newUnits: 42, usedOnBrand: 18, usedOffBrand: 0, avgPrice: 28500, avgDiscount: 2800 },
  { model: 'RAV4', newUnits: 38, usedOnBrand: 22, usedOffBrand: 0, avgPrice: 32800, avgDiscount: 2500 },
  { model: 'Highlander', newUnits: 28, usedOnBrand: 15, usedOffBrand: 0, avgPrice: 42500, avgDiscount: 3200 },
  { model: 'Corolla', newUnits: 35, usedOnBrand: 25, usedOffBrand: 0, avgPrice: 22500, avgDiscount: 1800 },
  { model: 'Tacoma', newUnits: 25, usedOnBrand: 12, usedOffBrand: 0, avgPrice: 38500, avgDiscount: 2200 },
];

// Chart data with different time ranges
const getInventoryTrendData = (timeRange: '7d' | '30d' | '3m') => {
  if (timeRange === '7d') {
    return [
      { day: 'Mon', new: 165, used: 89 },
      { day: 'Tue', new: 172, used: 92 },
      { day: 'Wed', new: 168, used: 95 },
      { day: 'Thu', new: 175, used: 88 },
      { day: 'Fri', new: 182, used: 91 },
      { day: 'Sat', new: 178, used: 94 },
      { day: 'Sun', new: 168, used: 90 }
    ];
  } else if (timeRange === '30d') {
    return [
      { day: 'Week 1', new: 145, used: 78 },
      { day: 'Week 2', new: 189, used: 95 },
      { day: 'Week 3', new: 156, used: 102 },
      { day: 'Week 4', new: 201, used: 88 },
      { day: 'Current', new: 178, used: 94 }
    ];
  } else {
    return [
      { day: 'Jan', new: 124, used: 67 },
      { day: 'Feb', new: 198, used: 112 },
      { day: 'Mar', new: 156, used: 89 },
      { day: 'Apr', new: 212, used: 125 },
      { day: 'May', new: 178, used: 94 }
    ];
  }
};

const marketPositionData = [
  { subject: 'Inventory', A: 85, B: 65, fullMark: 100 },
  { subject: 'Pricing', A: 92, B: 70, fullMark: 100 },
  { subject: 'Compliance', A: 100, B: 40, fullMark: 100 },
  { subject: 'Discounts', A: 78, B: 85, fullMark: 100 },
  { subject: 'Market Share', A: 88, B: 60, fullMark: 100 },
];

// ==========================================
// GOD MODE DATA
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

const cryingIndexData = [
  { dealer: 'Speed Demon', tears: 92, panic: 88 },
  { dealer: 'Auto Empire', tears: 78, panic: 71 },
  { dealer: 'TurboMax', tears: 85, panic: 79 },
  { dealer: 'Elite Motors', tears: 69, panic: 65 }
];

const dominationTimeline = [
  { month: 'Jan', domination: 45, competitors: 55 },
  { month: 'Feb', domination: 52, competitors: 48 },
  { month: 'Mar', domination: 61, competitors: 39 },
  { month: 'Apr', domination: 73, competitors: 27 },
  { month: 'May', domination: 85, competitors: 15 },
  { month: 'Jun', domination: 94, competitors: 6 }
];

const revenueVelocityData = [
  { day: 'Mon', velocity: 100 },
  { day: 'Tue', velocity: 118 },
  { day: 'Wed', velocity: 135 },
  { day: 'Thu', velocity: 142 },
  { day: 'Fri', velocity: 156 },
  { day: 'Sat', velocity: 171 },
  { day: 'Sun', velocity: 189 }
];

const achievements = [
  { id: 1, name: 'Market Crusher', icon: Skull, unlocked: true, description: 'Eliminated 3 competitors' },
  { id: 2, name: 'Price Warrior', icon: DollarSign, unlocked: true, description: 'Won 50 price battles' },
  { id: 3, name: 'Compliance Assassin', icon: AlertTriangle, unlocked: true, description: 'Reported 10 violations' },
  { id: 4, name: 'Inventory King', icon: Crown, unlocked: false, description: 'Reached 500 units' },
  { id: 5, name: 'The Untouchable', icon: Lock, unlocked: false, description: '30 days at #1' }
];

// ==========================================
// ANIMATED NUMBER COMPONENT
// ==========================================

const AnimatedNumber: React.FC<{ value: number; prefix?: string; suffix?: string; duration?: number }> = ({ 
  value, 
  prefix = '', 
  suffix = '', 
  duration = 2000 
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * value);
      
      setDisplayValue(current);

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [value, duration]);

  return (
    <span>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

// ==========================================
// GOD MODE COMPONENTS
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
// GOD MODE DASHBOARD COMPONENT
// ==========================================

function GodModeDashboard({ onClose }: { onClose: () => void }) {
  const [showCredits, setShowCredits] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
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
                    "When human ambition meets AI capability, industries transform"
                  </p>
                  <p className="text-xs text-gray-500 mt-4">
                    Built with React, TypeScript, and raw determination
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ==========================================
// GOD MODE TRIGGER COMPONENT
// ==========================================

function GodModeTrigger() {
  const [showGodMode, setShowGodMode] = useState(false);
  const [konami, setKonami] = useState('');
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newKonami = konami + e.key.toUpperCase();
      console.log('Key sequence:', newKonami);
      
      if ('SHOWMETHEMONEY'.startsWith(newKonami)) {
        setKonami(newKonami);
        
        if (newKonami === 'SHOWMETHEMONEY') {
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

// ==========================================
// MAIN DASHBOARD COMPONENT
// ==========================================

export default function VandokoCompleteDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showAIChat, setShowAIChat] = useState(false);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '3m'>('7d');
  
  // Calculate totals
  const totalNewInventory = INVENTORY_BY_MODEL.reduce((sum, item) => sum + item.newUnits, 0);
  const totalUsedOnBrand = INVENTORY_BY_MODEL.reduce((sum, item) => sum + item.usedOnBrand, 0);
  const totalUsedOffBrand = INVENTORY_BY_MODEL.reduce((sum, item) => sum + item.usedOffBrand, 0);
  const totalUsedInventory = totalUsedOnBrand + totalUsedOffBrand;
  const competitorAvgInventory = Math.floor(COMPETITORS.filter(c => !c.isYou).reduce((sum, c) => sum + c.inventory, 0) / 4);
  const inventoryAdvantage = totalNewInventory + totalUsedInventory - competitorAvgInventory;

  return (
    <div className="min-h-screen" style={{ backgroundColor: THEME.background, color: THEME.foreground }}>
      
      {/* LEFT SIDEBAR */}
      <aside 
        className={cn(
          "fixed left-0 top-0 h-full z-40 transition-all duration-300",
          sidebarCollapsed ? "w-20" : "w-64"
        )}
        style={{ 
          backgroundColor: THEME.background,
          borderRight: `1px solid ${THEME.border}` 
        }}
      >
        {/* Logo Section */}
        <div className="p-6 border-b" style={{ borderColor: THEME.border }}>
          <div className="flex items-center justify-between">
            <div className={cn("flex items-center gap-3", sidebarCollapsed && "justify-center")}>
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg"
                style={{ 
                  background: THEME.gradient1,
                  color: THEME.primaryForeground 
                }}
              >
                V
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="font-bold text-lg" style={{ color: THEME.primary }}>VANDOKO</h1>
                  <p className="text-xs" style={{ color: THEME.mutedForeground }}>
                    {SUBSCRIPTION_TIERS[DEALERSHIP_DATA.tier as keyof typeof SUBSCRIPTION_TIERS].name}
                  </p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="ml-auto"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', badge: null },
            { icon: Car, label: 'Inventory', badge: totalNewInventory + totalUsedInventory },
            { icon: Users, label: 'Competitors', badge: COMPETITORS.length - 1 },
            { icon: TrendingUp, label: 'Market Trends', badge: null },
            { icon: Shield, label: 'Compliance', badge: '3 violations' },
            { icon: DollarSign, label: 'myDeal Builder', badge: 'MID' },
            { icon: Bell, label: 'Active Alerts', badge: '4 new' },
            { icon: FileText, label: 'Reports', badge: null },
            { icon: Settings, label: 'Settings', badge: null },
          ].map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                "w-full justify-start transition-all duration-200",
                sidebarCollapsed && "justify-center px-0"
              )}
              style={{
                color: THEME.mutedForeground,
                '&:hover': {
                  backgroundColor: THEME.accent,
                  color: THEME.primary
                }
              }}
            >
              <item.icon className={cn("w-5 h-5", !sidebarCollapsed && "mr-3")} />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className="ml-auto"
                      style={{ 
                        backgroundColor: THEME.primary + '20',
                        color: THEME.primary,
                        border: `1px solid ${THEME.primary}40`
                      }}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          ))}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t" style={{ borderColor: THEME.border }}>
          <div className={cn("flex items-center gap-3", sidebarCollapsed && "justify-center")}>
            <Avatar>
              <AvatarFallback style={{ backgroundColor: THEME.primary, color: THEME.primaryForeground }}>
                {DEALERSHIP_DATA.userAvatar}
              </AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium">{DEALERSHIP_DATA.userName}</p>
                <p className="text-xs" style={{ color: THEME.mutedForeground }}>
                  {DEALERSHIP_DATA.usersActive}/{DEALERSHIP_DATA.maxUsers} users active
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className={cn(
        "transition-all duration-300",
        sidebarCollapsed ? "ml-20" : "ml-64"
      )}>
        
        {/* TOP HEADER */}
        <header 
          className="sticky top-0 z-30 p-6 backdrop-blur-md border-b"
          style={{ 
            backgroundColor: THEME.background + 'ee',
            borderColor: THEME.border 
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: THEME.primary }}>
                {DEALERSHIP_DATA.name}
              </h1>
              <div className="flex items-center gap-4 mt-2 text-sm" style={{ color: THEME.mutedForeground }}>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {DEALERSHIP_DATA.marketArea}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {DEALERSHIP_DATA.oem} ({DEALERSHIP_DATA.oemType})
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {COMPETITORS.length - 1} Active Competitors
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm">
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
              <Button 
                size="sm"
                style={{ 
                  background: THEME.gradient1,
                  color: THEME.primaryForeground 
                }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Upgrade to {DEALERSHIP_DATA.tier === 'starter' ? 'MID' : 'DATA'}
              </Button>
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="p-6">
          
          {/* KEY METRICS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              {
                title: 'Total Inventory',
                value: totalNewInventory + totalUsedInventory,
                change: '+12',
                icon: Car,
                color: THEME.chart1,
                prefix: '',
                suffix: ' units'
              },
              {
                title: 'Inventory Advantage',
                value: inventoryAdvantage,
                change: inventoryAdvantage > 0 ? `+${inventoryAdvantage}` : inventoryAdvantage.toString(),
                icon: Trophy,
                color: inventoryAdvantage > 0 ? THEME.chart1 : THEME.destructive,
                prefix: inventoryAdvantage > 0 ? '+' : '',
                suffix: ' vs avg'
              },
              {
                title: 'Compliance Score',
                value: 100,
                change: 'Perfect',
                icon: Shield,
                color: THEME.chart2,
                prefix: '',
                suffix: '%'
              },
              {
                title: 'Active Alerts',
                value: MARKET_ACTIVITIES.filter(a => a.actionRequired).length,
                change: 'Action needed',
                icon: Bell,
                color: THEME.destructive,
                prefix: '',
                suffix: ' urgent'
              }
            ].map((metric, index) => (
              <Card 
                key={index}
                className="relative overflow-hidden transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: THEME.card,
                  border: `1px solid ${THEME.border}`,
                  boxShadow: `0 0 20px ${metric.color}20`
                }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium" style={{ color: THEME.mutedForeground }}>
                      {metric.title}
                    </CardTitle>
                    <metric.icon className="w-4 h-4" style={{ color: metric.color }} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" style={{ color: metric.color }}>
                    <AnimatedNumber 
                      value={metric.value} 
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      duration={1500}
                    />
                  </div>
                  <p className="text-xs mt-1" style={{ color: THEME.mutedForeground }}>
                    {metric.change}
                  </p>
                </CardContent>
                <div 
                  className="absolute inset-0 opacity-5"
                  style={{
                    background: `linear-gradient(135deg, ${metric.color} 0%, transparent 100%)`,
                    animation: 'pulse 2s ease-in-out infinite'
                  }}
                />
              </Card>
            ))}
          </div>

          {/* TABS */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
            <TabsList 
              className="grid w-full grid-cols-4"
              style={{ 
                backgroundColor: THEME.muted,
                border: `1px solid ${THEME.border}`
              }}
            >
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="competitors">Competitors</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="activity">Market Activity</TabsTrigger>
            </TabsList>

            {/* OVERVIEW TAB */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Inventory Trend Chart */}
                <Card style={{ backgroundColor: THEME.card, border: `1px solid ${THEME.border}` }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Inventory Trend</CardTitle>
                        <CardDescription style={{ color: THEME.mutedForeground }}>
                          New vs Used inventory over time
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant={timeRange === '7d' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => setTimeRange('7d')}
                          style={{ 
                            backgroundColor: timeRange === '7d' ? THEME.primary : 'transparent',
                            color: timeRange === '7d' ? THEME.primaryForeground : THEME.mutedForeground
                          }}
                        >
                          7 Days
                        </Button>
                        <Button 
                          variant={timeRange === '30d' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => setTimeRange('30d')}
                          style={{ 
                            backgroundColor: timeRange === '30d' ? THEME.primary : 'transparent',
                            color: timeRange === '30d' ? THEME.primaryForeground : THEME.mutedForeground
                          }}
                        >
                          30 Days
                        </Button>
                        <Button 
                          variant={timeRange === '3m' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => setTimeRange('3m')}
                          style={{ 
                            backgroundColor: timeRange === '3m' ? THEME.primary : 'transparent',
                            color: timeRange === '3m' ? THEME.primaryForeground : THEME.mutedForeground
                          }}
                        >
                          3 Months
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={getInventoryTrendData(timeRange)}>
                        <defs>
                          <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={THEME.chart1} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={THEME.chart1} stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="colorUsed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={THEME.chart2} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={THEME.chart2} stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={THEME.border} opacity={0.3} />
                        <XAxis dataKey="day" stroke={THEME.mutedForeground} />
                        <YAxis stroke={THEME.mutedForeground} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: THEME.popover, 
                            border: `1px solid ${THEME.border}`,
                            borderRadius: '8px'
                          }}
                          labelStyle={{ color: THEME.foreground }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="new" 
                          stroke={THEME.chart1} 
                          fillOpacity={1} 
                          fill="url(#colorNew)"
                          strokeWidth={2}
                          animationDuration={2000}
                          animationEasing="ease-out"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="used" 
                          stroke={THEME.chart2} 
                          fillOpacity={1} 
                          fill="url(#colorUsed)"
                          strokeWidth={2}
                          animationDuration={2000}
                          animationEasing="ease-out"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Market Position Radar */}
                <Card style={{ backgroundColor: THEME.card, border: `1px solid ${THEME.border}` }}>
                  <CardHeader>
                    <CardTitle>Market Position Analysis</CardTitle>
                    <CardDescription style={{ color: THEME.mutedForeground }}>
                      You vs Market Average
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={marketPositionData}>
                        <PolarGrid stroke={THEME.border} />
                        <PolarAngleAxis dataKey="subject" stroke={THEME.mutedForeground} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} stroke={THEME.mutedForeground} />
                        <Radar 
                          name="You" 
                          dataKey="A" 
                          stroke={THEME.chart1} 
                          fill={THEME.chart1} 
                          fillOpacity={0.6}
                          animationDuration={2000}
                          animationEasing="ease-out"
                        />
                        <Radar 
                          name="Market Avg" 
                          dataKey="B" 
                          stroke={THEME.chart3} 
                          fill={THEME.chart3} 
                          fillOpacity={0.3}
                          animationDuration={2000}
                          animationEasing="ease-out"
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: THEME.popover, 
                            border: `1px solid ${THEME.border}`,
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Other tabs content remains the same */}
          </Tabs>
        </div>
      </main>

      {/* AI CHAT BUBBLE */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="w-14 h-14 rounded-full shadow-lg animate-bounce"
          style={{ 
            background: THEME.gradient1,
            boxShadow: THEME.glowBlue
          }}
          onClick={() => setShowAIChat(!showAIChat)}
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
        
        {showAIChat && (
          <Card 
            className="absolute bottom-16 right-0 w-80 shadow-2xl"
            style={{ 
              backgroundColor: THEME.popover,
              border: `1px solid ${THEME.border}`,
              boxShadow: THEME.glowBlue
            }}
          >
            <CardHeader>
              <CardTitle className="text-lg">Vandoko AI Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4 h-64 overflow-y-auto">
                <div 
                  className="p-3 rounded-lg text-sm"
                  style={{ backgroundColor: THEME.muted }}
                >
                  👋 Hey! I see you're crushing the competition with that inventory advantage!
                </div>
                <div 
                  className="p-3 rounded-lg text-sm"
                  style={{ backgroundColor: THEME.muted }}
                >
                  💡 Pro tip: Some say there's a secret command that unlocks hidden features... 
                  Want to see something that will SHOW you THE MONEY?
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* GOD MODE EASTER EGG TRIGGER */}
      <GodModeTrigger />
    </div>
  );
}