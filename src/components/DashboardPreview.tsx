'use client'

import { useEffect, useState } from 'react'
import { 
  BarChart3, 
  Car, 
  TrendingUp, 
  Award, 
  Activity,
  DollarSign,
  Users,
  Zap,
  Target
} from 'lucide-react'

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState('new')
  const [animatedRank, setAnimatedRank] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedRank(3)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Intelligence That Drives
            <span className="block bg-gradient-to-r from-[#00C0FA] to-[#005EEA] bg-clip-text text-transparent">
              Sales
            </span>
          </h2>
          <p className="text-xl text-gray-400">Real-time insights from your exact market</p>
        </div>
        
        {/* Dashboard Container with Cyberpunk Theme */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-3xl -z-10" />
          
          <div className="bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20">
            <div className="flex h-[600px]">
              {/* Collapsed Side Navigation */}
              <div className="w-16 bg-black/80 border-r border-cyan-500/30 flex flex-col items-center py-6 space-y-6">
                <div className="p-2 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-lg border border-cyan-400/50 hover:border-cyan-300 transition-all cursor-pointer group">
                  <BarChart3 className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
                </div>
                <div className="p-2 hover:bg-cyan-500/10 rounded-lg transition-all cursor-pointer">
                  <Car className="w-6 h-6 text-gray-400 hover:text-cyan-400" />
                </div>
                <div className="p-2 hover:bg-cyan-500/10 rounded-lg transition-all cursor-pointer">
                  <TrendingUp className="w-6 h-6 text-gray-400 hover:text-cyan-400" />
                </div>
                <div className="p-2 hover:bg-cyan-500/10 rounded-lg transition-all cursor-pointer">
                  <Award className="w-6 h-6 text-gray-400 hover:text-cyan-400" />
                </div>
                <div className="p-2 hover:bg-cyan-500/10 rounded-lg transition-all cursor-pointer">
                  <Users className="w-6 h-6 text-gray-400 hover:text-cyan-400" />
                </div>
              </div>
              
              {/* Main Dashboard Content */}
              <div className="flex-1 p-8">
                {/* Dealer Rank Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Downtown Toyota</h3>
                      <p className="text-cyan-400">Market Position Analysis</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Overall Rank</div>
                      <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                        #{animatedRank || '--'}
                      </div>
                      <div className="text-xs text-green-400">↑ 2 positions this week</div>
                    </div>
                  </div>
                  
                  {/* Tab Navigation */}
                  <div className="flex space-x-1 p-1 bg-black/50 rounded-lg border border-cyan-500/30">
                    <button
                      onClick={() => setActiveTab('new')}
                      className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                        activeTab === 'new' 
                          ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 border border-cyan-400/50' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      New Inventory
                    </button>
                    <button
                      onClick={() => setActiveTab('used')}
                      className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                        activeTab === 'used' 
                          ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 border border-cyan-400/50' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Used Inventory
                    </button>
                    <button
                      onClick={() => setActiveTab('specials')}
                      className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                        activeTab === 'specials' 
                          ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 border border-cyan-400/50' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Specials & Promotions
                    </button>
                  </div>
                </div>
                
                {/* Tab Content */}
                <div className="space-y-6">
                  {activeTab === 'new' && (
                    <>
                      {/* New Inventory Rankings */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-4 rounded-lg border border-cyan-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Top Model 1</span>
                            <Zap className="w-4 h-4 text-yellow-400" />
                          </div>
                          <div className="text-xl font-bold">Camry</div>
                          <div className="text-sm text-cyan-400">147 units</div>
                          <div className="mt-2 text-xs text-green-400">23% market share</div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-blue-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Top Model 2</span>
                            <Target className="w-4 h-4 text-blue-400" />
                          </div>
                          <div className="text-xl font-bold">RAV4</div>
                          <div className="text-sm text-cyan-400">132 units</div>
                          <div className="mt-2 text-xs text-gray-400">21% market share</div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-purple-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Top Model 3</span>
                            <Activity className="w-4 h-4 text-purple-400" />
                          </div>
                          <div className="text-xl font-bold">Highlander</div>
                          <div className="text-sm text-cyan-400">89 units</div>
                          <div className="mt-2 text-xs text-gray-400">14% market share</div>
                        </div>
                      </div>
                      
                      {/* Performance Metrics */}
                      <div className="bg-black/50 p-6 rounded-lg border border-cyan-500/20">
                        <h4 className="text-lg font-semibold mb-4 text-cyan-300">Performance vs Market</h4>
                        <div className="space-y-3">
                          {[
                            { label: 'Inventory Turnover', value: 85, trend: '+12%' },
                            { label: 'Price Competitiveness', value: 92, trend: '+5%' },
                            { label: 'Model Diversity', value: 78, trend: '-3%' },
                          ].map((metric) => (
                            <div key={metric.label}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">{metric.label}</span>
                                <span className={metric.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                                  {metric.trend}
                                </span>
                              </div>
                              <div className="w-full bg-gray-800 rounded-full h-2">
                                <div 
                                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"
                                  style={{ width: `${metric.value}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {activeTab === 'used' && (
                    <>
                      {/* Used Inventory Breakdown */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 p-4 rounded-lg border border-green-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">On-Brand</span>
                            <Award className="w-4 h-4 text-green-400" />
                          </div>
                          <div className="text-2xl font-bold">234</div>
                          <div className="text-sm text-cyan-400">Toyota vehicles</div>
                          <div className="mt-2 text-xs text-green-400">↑ 15% vs last month</div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-4 rounded-lg border border-yellow-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Off-Brand</span>
                            <Car className="w-4 h-4 text-yellow-400" />
                          </div>
                          <div className="text-2xl font-bold">156</div>
                          <div className="text-sm text-cyan-400">Mixed brands</div>
                          <div className="mt-2 text-xs text-gray-400">Stable</div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-4 rounded-lg border border-blue-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Certified</span>
                            <Award className="w-4 h-4 text-blue-400" />
                          </div>
                          <div className="text-2xl font-bold">89</div>
                          <div className="text-sm text-cyan-400">CPO vehicles</div>
                          <div className="mt-2 text-xs text-green-400">↑ 8% vs last month</div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {activeTab === 'specials' && (
                    <>
                      {/* Specials & Promotions Rankings */}
                      <div className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 p-6 rounded-lg border border-yellow-500/30">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-yellow-300">Market Promotion Rankings</h4>
                          <DollarSign className="w-6 h-6 text-yellow-400" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-400 mb-2">Overall Market Rank</div>
                            <div className="text-3xl font-bold text-yellow-400">#2</div>
                            <div className="text-xs text-green-400">Best APR offers in market</div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-400 mb-2">Rank by Model</div>
                            <div className="space-y-1 mt-2">
                              <div className="flex justify-between text-sm">
                                <span>Camry</span>
                                <span className="text-cyan-400">#1</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>RAV4</span>
                                <span className="text-cyan-400">#3</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Corolla</span>
                                <span className="text-cyan-400">#2</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}