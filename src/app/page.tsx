import Hero from '@/components/Hero'
import MarketTemperature from '@/components/MarketTemperature'
import DashboardPreview from '@/components/DashboardPreview'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-black">
        <Hero />
        <MarketTemperature />
        <DashboardPreview />
      </main>
      <Footer />
    </>
  )
}