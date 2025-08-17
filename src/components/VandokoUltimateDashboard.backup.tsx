'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GodModeTrigger } from './GodModeDashboard';  // THIS SHOULD BE LINE 3 or 4
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
  Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  PieChart,
  Pie
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

// ==========================================
// SUBSCRIPTION TIERS (from Excel)
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
// MOCK DATA - ENHANCED WITH MAR FEATURES
// ==========================================

const DEALERSHIP_DATA = {
  name: "Vandoko Demo Dealership",
  tier: 'mid', // Current subscription
  oem: "Toyota",
  oemType: "Import",
  marketArea: "Chicago, IL 60601",
  userAvatar: "VD",
  userName: "Mike Donovan",
  usersActive: 2,
  maxUsers: 3,
  agencyUser: true
};

// Competitor data with compliance tracking
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

// Market activity data
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

// Inventory tracking with model details
const INVENTORY_BY_MODEL = [
  { model: 'Camry', newUnits: 42, usedOnBrand: 18, usedOffBrand: 0, avgPrice: 28500, avgDiscount: 2800 },
  { model: 'RAV4', newUnits: 38, usedOnBrand: 22, usedOffBrand: 0, avgPrice: 32800, avgDiscount: 2500 },
  { model: 'Highlander', newUnits: 28, usedOnBrand: 15, usedOffBrand: 0, avgPrice: 42500, avgDiscount: 3200 },
  { model: 'Corolla', newUnits: 35, usedOnBrand: 25, usedOffBrand: 0, avgPrice: 22500, avgDiscount: 1800 },
  { model: 'Tacoma', newUnits: 25, usedOnBrand: 12, usedOffBrand: 0, avgPrice: 38500, avgDiscount: 2200 },
];

// Chart data with different time ranges for dramatic scaling
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
    // More dramatic swings for 30 days
    return [
      { day: 'Week 1', new: 145, used: 78 },
      { day: 'Week 2', new: 189, used: 95 },
      { day: 'Week 3', new: 156, used: 102 },
      { day: 'Week 4', new: 201, used: 88 },
      { day: 'Current', new: 178, used: 94 }
    ];
  } else {
    // Extreme variations for 3 months
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
      
      // Smooth easing function
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
// MAIN DASHBOARD COMPONENT
// ==========================================

export default function VandokoUltimateDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showAIChat, setShowAIChat] = useState(false);
  const [konami, setKonami] = useState('');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '3m'>('7d');
  
  // SHOWMETHEMONEY Easter Egg Detection
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newKonami = konami + e.key.toUpperCase();
      
      if ('SHOWMETHEMONEY'.startsWith(newKonami)) {
        setKonami(newKonami);
        
        if (newKonami === 'SHOWMETHEMONEY') {
          console.log('🚀 GOD MODE ACTIVATED!');
          // Trigger God Mode Dashboard
          document.body.style.animation = 'glitch 0.5s';
          setTimeout(() => {
            document.body.style.animation = '';
            alert('GOD MODE UNLOCKED! 🔥 Welcome to the inner circle!');
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

  // Calculate totals
  const totalNewInventory = INVENTORY_BY_MODEL.reduce((sum, item) => sum + item.newUnits, 0);
  const totalUsedOnBrand = INVENTORY_BY_MODEL.reduce((sum, item) => sum + item.usedOnBrand, 0);
  const totalUsedOffBrand = INVENTORY_BY_MODEL.reduce((sum, item) => sum + item.usedOffBrand, 0);
  const totalUsedInventory = totalUsedOnBrand + totalUsedOffBrand;
  const competitorAvgInventory = Math.floor(COMPETITORS.filter(c => !c.isYou).reduce((sum, c) => sum + c.inventory, 0) / 4);
  const inventoryAdvantage = totalNewInventory + totalUsedInventory - competitorAvgInventory;

  return (
    <div className="min-h-screen" style={{ backgroundColor: THEME.background, color: THEME.foreground }}>
      
      {/* LEFT SIDEBAR - Collapsible Navigation */}
      <aside 
        className={cn(
          "fixed left-0 top-0 h-full z-40 transition-all duration-300",
          sidebarCollapsed ? "w-20" : "w-64"
        )}
        style={{ 
          backgroundColor: THEME.background, // Fixed to match main background
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
                color: THEME.mutedForeground
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
                {/* Animated gradient overlay */}
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

          {/* TABS FOR DIFFERENT VIEWS */}
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

              {/* Model Mix Breakdown */}
              <Card style={{ backgroundColor: THEME.card, border: `1px solid ${THEME.border}` }}>
                <CardHeader>
                  <CardTitle>Inventory by Model</CardTitle>
                  <CardDescription style={{ color: THEME.mutedForeground }}>
                    Detailed breakdown of new and used inventory
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {INVENTORY_BY_MODEL.map((model, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{model.model}</span>
                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="outline" style={{ borderColor: THEME.chart1, color: THEME.chart1 }}>
                              New: {model.newUnits}
                            </Badge>
                            <Badge variant="outline" style={{ borderColor: THEME.chart2, color: THEME.chart2 }}>
                              Used: {model.usedOnBrand}
                            </Badge>
                            <span style={{ color: THEME.mutedForeground }}>
                              ${model.avgDiscount.toLocaleString()} avg discount
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full transition-all duration-1000 ease-out"
                            style={{ 
                              width: `${(model.newUnits / 50) * 100}%`,
                              background: THEME.gradient1
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* COMPETITORS TAB */}
            <TabsContent value="competitors" className="space-y-6">
              <Card style={{ backgroundColor: THEME.card, border: `1px solid ${THEME.border}` }}>
                <CardHeader>
                  <CardTitle>Competitor Analysis</CardTitle>
                  <CardDescription style={{ color: THEME.mutedForeground }}>
                    Real-time competitive intelligence with compliance monitoring
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {COMPETITORS.sort((a, b) => a.distance - b.distance).map((competitor, index) => (
                      <div 
                        key={index}
                        className={cn(
                          "p-4 rounded-lg border transition-all duration-300",
                          competitor.isYou && "ring-2",
                        )}
                        style={{ 
                          backgroundColor: competitor.isYou ? THEME.primary + '10' : THEME.muted,
                          borderColor: competitor.isYou ? THEME.primary : THEME.border
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-lg font-semibold">
                              {competitor.name}
                              {competitor.isYou && (
                                <Badge className="ml-2" style={{ backgroundColor: THEME.primary }}>YOU</Badge>
                              )}
                            </div>
                            {!competitor.isYou && (
                              <Badge variant="outline" style={{ borderColor: THEME.mutedForeground }}>
                                {competitor.distance} miles
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="text-2xl font-bold" style={{ color: THEME.primary }}>
                                {competitor.inventory}
                              </div>
                              <div className="text-xs" style={{ color: THEME.mutedForeground }}>units</div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-2xl font-bold" style={{ color: THEME.chart2 }}>
                                ${competitor.avgDiscount.toLocaleString()}
                              </div>
                              <div className="text-xs" style={{ color: THEME.mutedForeground }}>avg discount</div>
                            </div>
                            
                            {/* Compliance Indicators */}
                            <div className="flex items-center gap-2">
                              <div 
                                className="flex items-center gap-1 px-2 py-1 rounded"
                                style={{ 
                                  backgroundColor: competitor.disclaimerCompliant ? THEME.chart2 + '20' : THEME.destructive + '20',
                                  color: competitor.disclaimerCompliant ? THEME.chart2 : THEME.destructive
                                }}
                              >
                                {competitor.disclaimerCompliant ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                <span className="text-xs font-medium">Disclaimer</span>
                              </div>
                              
                              <div 
                                className="flex items-center gap-1 px-2 py-1 rounded"
                                style={{ 
                                  backgroundColor: competitor.oemCompliant ? THEME.chart2 + '20' : THEME.destructive + '20',
                                  color: competitor.oemCompliant ? THEME.chart2 : THEME.destructive
                                }}
                              >
                                {competitor.oemCompliant ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                <span className="text-xs font-medium">OEM</span>
                              </div>
                              
                              {competitor.complianceViolations > 0 && (
                                <Badge 
                                  variant="destructive"
                                  className="animate-pulse"
                                  style={{ backgroundColor: THEME.destructive }}
                                >
                                  {competitor.complianceViolations} violations
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* INVENTORY TAB */}
            <TabsContent value="inventory" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card style={{ backgroundColor: THEME.card, border: `1px solid ${THEME.border}` }}>
                  <CardHeader>
                    <CardTitle style={{ color: THEME.chart1 }}>New Inventory</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold mb-4" style={{ color: THEME.chart1 }}>
                      <AnimatedNumber value={totalNewInventory} suffix=" units" />
                    </div>
                    <div className="space-y-2">
                      {INVENTORY_BY_MODEL.slice(0, 3).map((model) => (
                        <div key={model.model} className="flex justify-between text-sm">
                          <span>{model.model}</span>
                          <span style={{ color: THEME.chart1 }}>{model.newUnits}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: THEME.card, border: `1px solid ${THEME.border}` }}>
                  <CardHeader>
                    <CardTitle style={{ color: THEME.chart2 }}>Used On-Brand</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold mb-4" style={{ color: THEME.chart2 }}>
                      <AnimatedNumber value={totalUsedOnBrand} suffix=" units" />
                    </div>
                    <div className="space-y-2">
                      {INVENTORY_BY_MODEL.slice(0, 3).map((model) => (
                        <div key={model.model} className="flex justify-between text-sm">
                          <span>{model.model}</span>
                          <span style={{ color: THEME.chart2 }}>{model.usedOnBrand}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ backgroundColor: THEME.card, border: `1px solid ${THEME.border}` }}>
                  <CardHeader>
                    <CardTitle style={{ color: THEME.chart3 }}>Used Off-Brand</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold mb-4" style={{ color: THEME.chart3 }}>
                      <AnimatedNumber value={totalUsedOffBrand} suffix=" units" />
                    </div>
                    <div className="text-sm" style={{ color: THEME.mutedForeground }}>
                      No off-brand inventory currently in stock
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* MARKET ACTIVITY TAB */}
            <TabsContent value="activity" className="space-y-6">
              <Card style={{ backgroundColor: THEME.card, border: `1px solid ${THEME.border}` }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Market Activity</CardTitle>
                      <CardDescription style={{ color: THEME.mutedForeground }}>
                        Real-time alerts and notifications
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure Alerts
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                      {MARKET_ACTIVITIES.map((activity) => (
                        <div
                          key={activity.id}
                          className={cn(
                            "p-4 rounded-lg border transition-all duration-300",
                            activity.actionRequired && "animate-pulse"
                          )}
                          style={{
                            backgroundColor: activity.actionRequired ? THEME.destructive + '10' : THEME.muted,
                            borderColor: activity.actionRequired ? THEME.destructive + '40' : THEME.border
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div 
                              className="p-2 rounded-lg"
                              style={{ 
                                backgroundColor: THEME.primary + '20',
                                color: THEME.primary
                              }}
                            >
                              {activity.type === 'violation' && <Shield className="w-5 h-5" />}
                              {activity.type === 'price' && <TrendingDown className="w-5 h-5" />}
                              {activity.type === 'inventory' && <Car className="w-5 h-5" />}
                              {activity.type === 'opportunity' && <Target className="w-5 h-5" />}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold">{activity.title}</h4>
                                <Badge 
                                  variant={activity.impact === 'high' ? 'destructive' : 'secondary'}
                                  style={{
                                    backgroundColor: activity.impact === 'high' ? THEME.destructive : THEME.accent,
                                    color: activity.impact === 'high' ? '#fff' : THEME.accentForeground
                                  }}
                                >
                                  {activity.impact.toUpperCase()}
                                </Badge>
                                {activity.actionRequired && (
                                  <Badge 
                                    variant="destructive"
                                    className="ml-auto animate-pulse"
                                    style={{ backgroundColor: THEME.destructive }}
                                  >
                                    ACTION REQUIRED
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-sm mb-2" style={{ color: THEME.mutedForeground }}>
                                {activity.description}
                              </p>
                              
                              <div className="flex items-center gap-4 text-xs" style={{ color: THEME.mutedForeground }}>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {activity.time}
                                </span>
                                {activity.dealer && (
                                  <span>{activity.dealer}</span>
                                )}
                                <div className="flex items-center gap-2 ml-auto">
                                  <span>Sent via:</span>
                                  {activity.sentVia.map((channel) => (
                                    <div
                                      key={channel}
                                      className="p-1 rounded"
                                      style={{ backgroundColor: THEME.primary + '20' }}
                                    >
                                      {channel === 'sms' && <Phone className="w-3 h-3" />}
                                      {channel === 'email' && <Mail className="w-3 h-3" />}
                                      {channel === 'push' && <Bell className="w-3 h-3" />}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

       {/* AI CHAT BUBBLE - This is OUTSIDE main but INSIDE the main div */}
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
                  💡 Pro tip: Some say there is a secret command that unlocks hidden features... 
                  Want to see something that will SHOW you THE MONEY?
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>      
      <GodModeTrigger />
    </div>
  );
}
