import { useLenis } from './hooks/useLenis';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Vision from './sections/Vision';
import Objectives from './sections/Objectives';
import BasinAnalysis from './sections/BasinAnalysis';
import Engineering from './sections/Engineering';
import CircularEconomy from './sections/CircularEconomy';
import Timeline from './sections/Timeline';
import CostBreakdown from './sections/CostBreakdown';
import Impact from './sections/Impact';
import FundingRisk from './sections/FundingRisk';
import Participation from './sections/Participation';
import Footer from './sections/Footer';

export default function App() {
  useLenis();

  return (
    <div className="relative min-h-screen bg-[#0a2e36]">
      <Navigation />
      <Hero />
      <Vision />
      <Objectives />
      <BasinAnalysis />
      <Engineering />
      <CircularEconomy />
      <Timeline />
      <CostBreakdown />
      <Impact />
      <FundingRisk />
      <Participation />
      <Footer />
    </div>
  );
}
