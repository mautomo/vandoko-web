'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Moon, Sun } from 'lucide-react'

interface ThemeToggleButtonProps {
  showLabel?: boolean
  variant?: 'default' | 'circle' | 'circle-blur' | 'gif'
  start?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  url?: string
}

export default function ThemeToggleButton({ 
  showLabel = false, 
  variant = 'default',
  start = 'top-left',
  url = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3JwcXdzcHd5MW92NWprZXVpcTBtNXM5cG9obWh0N3I4NzFpaDE3byZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/WgsVx6C4N8tjy/giphy.gif"
}: ThemeToggleButtonProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }
  }, [])

  const updateTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const toggleTheme = async (e: React.MouseEvent) => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    
    // Fallback for browsers that don't support View Transitions API
    if (!document.startViewTransition || variant !== 'gif') {
      updateTheme(newTheme)
      return
    }

    // Get button position for animation origin
    const button = buttonRef.current
    if (!button) return
    
    const rect = button.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    // Create transition mask element
    const mask = document.createElement('div')
    mask.style.cssText = `
      position: fixed;
      top: ${y}px;
      left: ${x}px;
      width: 100px;
      height: 100px;
      transform: translate(-50%, -50%);
      background-image: url('${url}');
      background-size: cover;
      background-position: center;
      border-radius: 50%;
      z-index: 9999;
      pointer-events: none;
    `
    
    document.body.appendChild(mask)
    setIsTransitioning(true)

    // Start the view transition
    const transition = document.startViewTransition(() => {
      updateTheme(newTheme)
    })

    // Animate the mask
    mask.animate([
      {
        width: '100px',
        height: '100px',
        opacity: 1
      },
      {
        width: '200vmax',
        height: '200vmax',
        opacity: 0.8
      }
    ], {
      duration: 2500,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    })

    // Clean up after transition
    transition.finished.then(() => {
      setTimeout(() => {
        mask.remove()
        setIsTransitioning(false)
      }, 100)
    })
  }

  if (!mounted) return null

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      disabled={isTransitioning}
      className={`
        relative p-3 rounded-lg transition-all duration-300
        hover:bg-primary/10 group
        ${isTransitioning ? 'pointer-events-none' : ''}
      `}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Moon className="w-5 h-5 text-primary relative z-10" />
      ) : (
        <Sun className="w-5 h-5 text-accent relative z-10" />
      )}
      
      {showLabel && (
        <span className="ml-2 text-sm relative z-10">
          {theme === 'dark' ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  )
}