'use client';

import { useState } from 'react';
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
  Bell,
  Shield,
  BarChart3,
  Activity,
  Menu,
  X
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* SIDEBAR */}
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-card border-r border-border z-40 transition-all duration-300",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        {/* Logo Section */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className={cn("flex items-center gap-3", !sidebarOpen && "justify-center")}>
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg" />
            {sidebarOpen && (
              <div>
                <span className="text-xl font-bold">VANDOKO</span>
                <p className="text-xs text-muted-foreground">Intelligence Hub</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" active sidebarOpen={sidebarOpen} />
          <NavItem icon={<Car />} label="Inventory" sidebarOpen={sidebarOpen} />
          <NavItem icon={<DollarSign />} label="Offers" sidebarOpen={sidebarOpen} />
          <NavItem icon={<Users />} label="Competitors" sidebarOpen={sidebarOpen} />
          <NavItem icon={<TrendingUp />} label="Trends" sidebarOpen={sidebarOpen} />
          <NavItem icon={<Shield />} label="Compliance" badge="3" sidebarOpen={sidebarOpen} />
          <NavItem icon={<Settings />} label="Settings" sidebarOpen={sidebarOpen} />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className={cn(
        "min-h-screen transition-all duration-300",
        sidebarOpen ? "ml-64" : "ml-16"
      )}>
        
        {/* HEADER */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold">More Deals Automotive</h1>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-muted-foreground">OEM: Toyota, Ford</span>
                <Badge variant="secondary">Import & Domestic</Badge>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium">Mr. More Deals</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
                <Avatar>
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="p-8 space-y-8">
          
          {/* METRICS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard 
              title="Competing Dealers" 
              value="12" 
              change="+2 this month"
              icon={<Users className="h-4 w-4" />}
            />
            <MetricCard 
              title="Market Inventory" 
              value="1,847" 
              change="-5.2%"
              icon={<Car className="h-4 w-4" />}
            />
            <MetricCard 
              title="Advantage Score" 
              value="87" 
              change="+12 points"
              icon={<TrendingUp className="h-4 w-4" />}
              highlight
            />
            <MetricCard 
              title="Compliance Issues" 
              value="3" 
              change="Action needed"
              icon={<AlertCircle className="h-4 w-4" />}
              alert
            />
          </div>

          {/* MAIN DASHBOARD GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* COMPETITOR OVERVIEW - 2 cols */}
            <Card className="lg:col-span-2 card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Competitor Intelligence
                </CardTitle>
                <CardDescription>Real-time market positioning</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="new" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="new">New Inventory</TabsTrigger>
                    <TabsTrigger value="used">Used Inventory</TabsTrigger>
                  </TabsList>
                  <TabsContent value="new" className="space-y-4">
                    <DealerBar name="More Deals (You)" count={347} isYou />
                    <DealerBar name="City Toyota" count={412} difference="+65" />
                    <DealerBar name="Metro Ford" count={298} difference="-49" />
                    <DealerBar name="Valley Auto" count={376} difference="+29" />
                  </TabsContent>
                  <TabsContent value="used" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <StatCard label="On-Brand" value="142" />
                      <StatCard label="Off-Brand" value="92" />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* OFFER RANKINGS - 1 col */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-secondary" />
                  Offer Rankings
                </CardTitle>
                <CardDescription>Toyota Camry</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <RankingItem rank={1} dealer="Valley Auto" offer="$2,500" status="compliant" />
                <RankingItem rank={2} dealer="More Deals" offer="$2,250" status="compliant" isYou />
                <RankingItem rank={3} dealer="City Toyota" offer="$2,000" status="warning" />
                <RankingItem rank={4} dealer="Metro Ford" offer="$1,750" status="violation" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* AI CHAT BUBBLE */}
      <Button
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-gradient-to-r from-primary to-secondary hover:scale-110 transition-transform"
        onClick={() => setChatOpen(!chatOpen)}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* CHAT WINDOW */}
      {chatOpen && (
        <Card className="fixed bottom-24 right-8 w-96 h-[500px] z-50">
          <CardHeader>
            <CardTitle>Vandoko AI</CardTitle>
            <CardDescription>
              Ask about your data... or try "SHOW ME THE MONEY" 😉
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Chat messages would go here */}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// SUB-COMPONENTS
const NavItem = ({ icon, label, active = false, badge = null, sidebarOpen }) => (
  <Button
    variant={active ? "secondary" : "ghost"}
    className={cn("w-full justify-start", !sidebarOpen && "justify-center px-2")}
  >
    {icon}
    {sidebarOpen && (
      <>
        <span className="ml-3">{label}</span>
        {badge && <Badge className="ml-auto" variant="destructive">{badge}</Badge>}
      </>
    )}
  </Button>
);

const MetricCard = ({ title, value, change, icon, highlight = false, alert = false }) => (
  <Card className={cn(
    "card-hover",
    highlight && "border-primary/50 bg-primary/5",
    alert && "border-destructive/50 bg-destructive/5"
  )}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{change}</p>
    </CardContent>
  </Card>
);

const DealerBar = ({ name, count, difference = null, isYou = false }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className={cn(isYou && "text-primary font-medium")}>{name}</span>
      <div className="flex items-center gap-2">
        <span className="font-bold">{count}</span>
        {difference && (
          <span className={cn(
            "text-xs",
            difference.startsWith('+') ? "text-destructive" : "text-success"
          )}>
            {difference}
          </span>
        )}
      </div>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <div 
        className={cn("h-full", isYou ? "bg-primary" : "bg-muted-foreground")}
        style={{ width: `${(count / 450) * 100}%` }}
      />
    </div>
  </div>
);

const RankingItem = ({ rank, dealer, offer, status, isYou = false }) => (
  <div className={cn(
    "flex items-center gap-3 p-2 rounded-lg",
    isYou && "bg-primary/10 border border-primary/30"
  )}>
    <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    <div className="flex-1">
      <div className="text-sm font-medium">{dealer}</div>
      <div className="text-xs text-muted-foreground">{offer}</div>
    </div>
    <div className={cn(
      "h-2 w-2 rounded-full",
      status === 'compliant' && "bg-success",
      status === 'warning' && "bg-warning",
      status === 'violation' && "bg-destructive"
    )} />
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="p-3 bg-muted rounded-lg">
    <div className="text-xs text-muted-foreground">{label}</div>
    <div className="text-xl font-bold">{value}</div>
  </div>
);