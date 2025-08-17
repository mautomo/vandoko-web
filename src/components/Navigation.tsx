'use client'

import Link from 'next/link'
import Image from 'next/image'
import ThemeToggleButton from '@/components/ui/theme-toggle-button'

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/50 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo Only - No Text */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png"
              alt="Vandoko"
              width={80}
              height={80}
              className="object-contain"
              style={{ width: 'auto', height: '80px' }}
            />
          </Link>
          
          {/* Menu with Theme Toggle */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-muted-foreground hover:text-primary transition">
              Product
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-secondary transition">
              Pricing
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-accent transition">
              About
            </Link>
            
            {/* Simple Theme Toggle Button */}
<ThemeToggleButton variant="gif" />
            
            <button className="px-6 py-2 btn-primary rounded-lg">
              Request Demo
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}