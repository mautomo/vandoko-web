import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image 
                src="/logo.png"  // Change this to your actual filename
                alt="Vandoko"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-xl font-bold">VANDOKO</span>
            </div>
            <p className="text-sm text-gray-400">
              AI-powered market intelligence for automotive dealers.
            </p>
          </div>
          
          {/* Rest of footer content stays the same */}
          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-300">Product</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition">Features</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition">Pricing</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition">API</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition">Integrations</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-300">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition">About</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition">Blog</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition">Careers</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-300">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition">Privacy</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition">Terms</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition">Security</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          © 2025 Vandoko. All rights reserved.
        </div>
      </div>
    </footer>
  )
}