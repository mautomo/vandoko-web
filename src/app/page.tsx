import Hero from '@/components/Hero';
import HolographicDataDisplay from '@/components/HolographicDataDisplay';
import LiveCollaboration from '@/components/LiveCollaboration';
import MarketTemperature from '@/components/MarketTemperature'
import DashboardPreview from '@/components/DashboardPreview'
import Footer from '@/components/Footer'
export default function Home() {
  return (
    <main>
      <LiveCollaboration />
      <Hero />
      <HolographicDataDisplay />
      <MarketTemperature />
      <DashboardPreview />
      <Footer />
    </main>
  );
}