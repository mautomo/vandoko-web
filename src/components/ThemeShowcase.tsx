'use client'

import ThemeToggleButton from '@/components/ui/theme-toggle-button'

export default function ThemeShowcase() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-8">Choose Your Vibe</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <ThemeToggleButton showLabel variant="default" />
          <ThemeToggleButton showLabel variant="circle" start="center" />
          <ThemeToggleButton showLabel variant="circle-blur" start="center" />
          <ThemeToggleButton 
            showLabel 
            variant="gif"
            url="https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif"
          />
        </div>
      </div>
    </section>
  )
}