'use client';

import React, { useState, useEffect } from 'react';
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
  Siren
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
  Cell
} from 'recharts';

// ==========================================
// MOCK DATA - REAL AUTOMOTIVE METRICS
// ==========================================

const DEALERSHIP_DATA = {
  name: "Mr. More Deals Motors",
  oem: "Toyota",
  oemType: "Import",
  marketArea: "Chicago, IL 60601",
  userAvatar: "MD",
  userName: "Mr. More Deals"
};

const COMPETITORS = [
  { name: "City Toyota", distance: 3.2, inventory: 202, avgDiscount: 3892 },
  { name: "Metro Auto Group", distance: 5.7, inventory: 142, avgDiscount: 3247 },
  { name: "Valley Toyota", distance: 8.1, inventory: 117, avgDiscount: 4150 },
  { name: "Premier Motors", distance: 11.3, inventory: 122, avgDiscount: 3675 },
  { name: "Elite Automotive", distance: 14.6, inventory: 98, avgDiscount: 4250 }
];

// 30-day inventory trend data
const INVENTORY_TREND = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  you: 187 + Math.floor(Math.random() * 20 - 10),
  competitor1: 202 + Math.floor(Math.random() * 25 - 12),
  competitor2: 142 + Math.floor(Math.random() * 15 - 7),
  market: 165 + Math.floor(Math.random() * 18 - 9)
}));

// Offer compliance data
const OFFER_COMPLIANCE = [
  { dealer: "City Toyota", offer: "$3,500 off MSRP", model: "Camry", inventory: 23, disclaimer: true, oemCompliant: false },
  { dealer: "Metro Auto", offer: "$2,250 off", model: "Camry", inventory: 18, disclaimer: false, oemCompliant: true },
  { dealer: "Valley Toyota", offer: "$4,000 rebate", model: "RAV4", inventory: 31, disclaimer: false, oemCompliant: false },
  { dealer: "Premier Motors", offer: "0% APR 72mo", model: "Highlander", inventory: 12, disclaimer: true, oemCompliant: true },
  { dealer: "Elite Auto", offer: "$5,000 off", model: "Tacoma", inventory: 8, disclaimer: false, oemCompliant: false }
];

// Market positioning radar chart
const MARKET_POSITION = [
  { metric: 'Inventory Volume', A: 85, B: 120, fullMark: 150 },
  { metric: 'Price Competitiveness', A: 93, B: 80, fullMark: 150 },
  { metric: 'Market Share', A: 78, B: 90, fullMark: 150 },
  { metric: 'Customer Reach', A: 89, B: 85, fullMark: 150 },
  { metric: 'Digital Presence', A: 95, B: 60, fullMark: 150 },
  { metric: 'Compliance Score', A: 98, B: 70, fullMark: 150 }
];

// ==========================================
// MAIN DASHBOARD COMPONENT
// ==========================================

export default function VandokoDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedCompetitor, setSelectedCompetitor] = useState(COMPETITORS[0]);
  const [alertCount, setAlertCount] = useState(3);
  
  // Animate numbers on mount
  const [animatedValues, setAnimatedValues] = useState({
    inventory: 0,
    marketShare: 0,
    advantageScore: 0,
    complianceIssues: 0
  });

  useEffect(() => {
    // Animate counters on mount
    const timer = setTimeout(() => {
      setAnimatedValues({
        inventory: 187,
        marketShare: 23.4,
        advantageScore: 87,
        complianceIssues: 5
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* SIDEBAR - COLLAPSIBLE NAVIGATION */}
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-50 transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "w-20" : "w-64"
      )}>
        {/* Logo & Dealership Info */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className={cn("flex items-center gap-3", sidebarCollapsed && "justify-center")}>
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-chart-2 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                {alertCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
                )}
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="font-bold text-sidebar-foreground">VANDOKO</h1>
                  <p className="text-xs text-muted-foreground">Market Intelligence</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="ml-auto"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation Items */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-2">
            <SidebarItem icon={<Gauge />} label="Dashboard" active collapsed={sidebarCollapsed} />
            <SidebarItem icon={<Car />} label="Inventory Intel" badge="Live" badgeVariant="success" collapsed={sidebarCollapsed} />
            <SidebarItem icon={<DollarSign />} label="Offer Warfare" collapsed={sidebarCollapsed} />
            <SidebarItem icon={<Users />} label="Competitor Tracking" collapsed={sidebarCollapsed} />
            <SidebarItem icon={<Shield />} label="Compliance Monitor" badge={alertCount} badgeVariant="destructive" collapsed={sidebarCollapsed} />
            <SidebarItem icon={<Target />} label="Market Position" collapsed={sidebarCollapsed} />
            <SidebarItem icon={<AlertCircle />} label="Alerts" collapsed={sidebarCollapsed} />
            <SidebarItem icon={<Settings />} label="Settings" collapsed={sidebarCollapsed} />
          </nav>
        </ScrollArea>

        {/* User Section */}
        <div className="p-4 border-t border-sidebar-border">
          <div className={cn("flex items-center gap-3", sidebarCollapsed && "justify-center")}>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-to-br from-primary to-chart-3 text-xs">
                {DEALERSHIP_DATA.userAvatar}
              </AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium">{DEALERSHIP_DATA.userName}</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className={cn(
        "transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "ml-20" : "ml-64"
      )}>
        
        {/* TOP HEADER - DEALERSHIP INFO */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Dealership Details */}
              <div className="flex items-center gap-6">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                    {DEALERSHIP_DATA.name}
                  </h1>
                  <div className="flex items-center gap-4 mt-1">
                    <Badge variant="outline" className="gap-1">
                      <Car className="w-3 h-3" />
                      {DEALERSHIP_DATA.oem}
                    </Badge>
                    <Badge variant="secondary">
                      {DEALERSHIP_DATA.oemType}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {DEALERSHIP_DATA.marketArea}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Clock className="w-4 h-4" />
                  Live Updates
                </Button>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  {alertCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                      {alertCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="p-6 space-y-6">
          
          {/* CRITICAL METRICS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Your Inventory"
              value={animatedValues.inventory}
              unit="units"
              change="+12 from yesterday"
              trend="up"
              icon={<Car className="w-5 h-5" />}
              color="primary"
            />
            <MetricCard
              title="Market Share"
              value={`${animatedValues.marketShare}%`}
              unit=""
              change="+2.3% this week"
              trend="up"
              icon={<Trophy className="w-5 h-5" />}
              color="success"
            />
            <MetricCard
              title="Advantage Score"
              value={animatedValues.advantageScore}
              unit="/100"
              change="Outperforming 4 of 5"
              trend="up"
              icon={<Target className="w-5 h-5" />}
              color="chart-2"
            />
            <MetricCard
              title="Compliance Alerts"
              value={animatedValues.complianceIssues}
              unit="violations"
              change="Competitor exposed"
              trend="alert"
              icon={<Siren className="w-5 h-5" />}
              color="destructive"
            />
          </div>

          {/* MAIN GRID - 2 COLUMNS */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* LEFT COLUMN - COMPETITIVE INTELLIGENCE */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* INVENTORY WARFARE CHART */}
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-bold">Inventory Warfare</CardTitle>
                    <CardDescription>Real-time competitive positioning</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={timeRange === '7d' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTimeRange('7d')}
                    >
                      7D
                    </Button>
                    <Button
                      variant={timeRange === '30d' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTimeRange('30d')}
                    >
                      30D
                    </Button>
                    <Button
                      variant={timeRange === '90d' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTimeRange('90d')}
                    >
                      90D
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={INVENTORY_TREND}>
                      <defs>
                        <linearGradient id="colorYou" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorCompetitor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="day" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: 'var(--radius)'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="you"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorYou)"
                        strokeWidth={2}
                        name="Your Inventory"
                      />
                      <Area
                        type="monotone"
                        dataKey="competitor1"
                        stroke="hsl(var(--destructive))"
                        fillOpacity={1}
                        fill="url(#colorCompetitor)"
                        strokeWidth={2}
                        name="Top Competitor"
                      />
                      <Line
                        type="monotone"
                        dataKey="market"
                        stroke="hsl(var(--muted-foreground))"
                        strokeDasharray="5 5"
                        name="Market Average"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* COMPLIANCE VIOLATIONS TABLE */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Shield className="w-5 h-5 text-destructive" />
                        Compliance Violations Detected
                      </CardTitle>
                      <CardDescription>Competitor violations you can report</CardDescription>
                    </div>
                    <Badge variant="destructive" className="animate-pulse">
                      5 Active Violations
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {OFFER_COMPLIANCE.map((violation, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-card hover:bg-accent/5 transition-colors border border-border"
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            !violation.disclaimer && !violation.oemCompliant ? "bg-destructive animate-pulse" :
                            !violation.disclaimer || !violation.oemCompliant ? "bg-warning" :
                            "bg-success"
                          )} />
                          <div>
                            <p className="font-medium">{violation.dealer}</p>
                            <p className="text-sm text-muted-foreground">
                              {violation.offer} • {violation.model} ({violation.inventory} units)
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!violation.disclaimer && (
                            <Badge variant="outline" className="text-xs gap-1">
                              <XCircle className="w-3 h-3" />
                              No Disclaimer
                            </Badge>
                          )}
                          {!violation.oemCompliant && (
                            <Badge variant="destructive" className="text-xs gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              OEM Violation
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT COLUMN - MARKET POSITION & COMPETITORS */}
            <div className="space-y-6">
              
              {/* MARKET POSITION RADAR */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold">Market Domination Score</CardTitle>
                  <CardDescription>Your position vs market leader</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={MARKET_POSITION}>
                      <PolarGrid strokeDasharray="3 3" className="stroke-muted" />
                      <PolarAngleAxis dataKey="metric" className="text-xs" />
                      <PolarRadiusAxis angle={90} domain={[0, 150]} />
                      <Radar
                        name="You"
                        dataKey="A"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name="Leader"
                        dataKey="B"
                        stroke="hsl(var(--destructive))"
                        fill="hsl(var(--destructive))"
                        fillOpacity={0.1}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* CLOSEST COMPETITORS */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold">Threat Proximity</CardTitle>
                  <CardDescription>Competitors by distance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {COMPETITORS.map((competitor, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer",
                        selectedCompetitor.name === competitor.name 
                          ? "bg-primary/10 border border-primary/30" 
                          : "hover:bg-accent/5 border border-transparent"
                      )}
                      onClick={() => setSelectedCompetitor(competitor)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                          index === 0 ? "bg-destructive/20 text-destructive" :
                          index === 1 ? "bg-warning/20 text-warning" :
                          "bg-muted text-muted-foreground"
                        )}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{competitor.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {competitor.distance} miles • {competitor.inventory} units
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">${competitor.avgDiscount}</p>
                        <p className="text-xs text-muted-foreground">avg discount</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* AI CHAT ASSISTANT */}
      <Button
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg transition-all",
          "bg-gradient-to-r from-primary to-chart-2 hover:scale-110",
          chatOpen && "scale-0"
        )}
        onClick={() => setChatOpen(true)}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* CHAT WINDOW */}
      {chatOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-lg">Vandoko AI Assistant</CardTitle>
              <CardDescription className="text-xs">
                Ask about your data... or discover hidden features 😉
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setChatOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm">
                  🤖 Welcome back! Your advantage score is up 12 points this week. 
                </p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm">
                  💡 Pro tip: Some say if you <span className="font-bold text-primary">SHOW ME THE MONEY</span> in the right place, 
                  you unlock insights your competitors can't see...
                </p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm">
                  🎯 City Toyota just dropped prices on Camry by $500. Want me to analyze the impact?
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ==========================================
// SUB-COMPONENTS
// ==========================================

const SidebarItem = ({ icon, label, active = false, badge = null, badgeVariant = "default", collapsed }) => (
  <Button
    variant={active ? "secondary" : "ghost"}
    className={cn(
      "w-full justify-start transition-all",
      collapsed ? "px-3" : "px-3",
      active && "bg-sidebar-accent text-sidebar-accent-foreground"
    )}
  >
    <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "gap-3 flex-1")}>
      {icon}
      {!collapsed && <span className="flex-1 text-left">{label}</span>}
      {!collapsed && badge && (
        <Badge variant={badgeVariant} className="ml-auto">
          {badge}
        </Badge>
      )}
    </div>
  </Button>
);

const MetricCard = ({ title, value, unit, change, trend, icon, color }) => {
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-warning';
  
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all hover:scale-105",
      trend === 'alert' && "border-destructive/50 bg-destructive/5"
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className={cn("p-2 rounded-lg bg-background", `text-${color}`)}>
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        <p className={cn("text-xs mt-1", trendColor)}>
          {change}
        </p>
      </CardContent>
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r",
        color === 'primary' && "from-primary to-chart-2",
        color === 'success' && "from-success to-green-400",
        color === 'destructive' && "from-destructive to-red-400",
        color === 'chart-2' && "from-chart-2 to-chart-3"
      )} />
    </Card>
  );
};