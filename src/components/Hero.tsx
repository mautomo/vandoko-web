'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-gray-900 to-gray-900" />
      
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-sm text-gray-300">AI-Powered Market Intelligence</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl lg:text-7xl font-black text-white">
            See What Your
            <span className="block bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Competition
            </span>
            Doesn't Want You To
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl text-gray-400 max-w-xl">
            Real-time inventory tracking, pricing intelligence, and competitive insights 
            that turn market pressure into market dominance.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 btn-primary rounded-lg">
              Check Your Market →
            </button>
            <button className="px-8 py-4 glass rounded-lg font-semibold hover:bg-white/10 transition text-white">
              Watch Demo
            </button>
          </div>
        </div>
        
        {/* Right side - Quick market check */}
        <div className="glass rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-white">Quick Market Check</h3>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Enter ZIP Code"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-pink-500 focus:outline-none transition text-white placeholder-gray-500"
            />
            <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-pink-500 focus:outline-none transition text-white">
              <option value="">Select OEM</option>
              <option value="toyota">Toyota</option>
              <option value="honda">Honda</option>
              <option value="ford">Ford</option>
              <option value="chevrolet">Chevrolet</option>
              <option value="nissan">Nissan</option>
            </select>
            <button className="w-full py-3 btn-primary rounded-lg">
              Get Free Analysis
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}