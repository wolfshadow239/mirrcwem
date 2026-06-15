import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Shield,
  Factory,
  Route,
  Leaf,
  RefreshCw,
  Waves,
  Users,
  AlertTriangle,
  Building2,
  MapPinned,
  Gauge,
  Unlink,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const primaryObjectives = [
  { icon: Shield, text: 'Prevent untreated sewage from entering ecological rivers' },
  { icon: Factory, text: 'Establish regional high-capacity STP infrastructure' },
  { icon: Route, text: 'Develop engineered secondary wastewater corridors' },
  { icon: Leaf, text: 'Restore river biodiversity and ecological flows' },
  { icon: RefreshCw, text: 'Enable reuse of treated wastewater' },
  { icon: Waves, text: 'Improve groundwater recharge and flood management' },
  { icon: Users, text: 'Build public participation and environmental awareness' },
];

const challenges = [
  { icon: AlertTriangle, title: 'Untreated Sewage', desc: 'Large volumes of municipal sewage discharged into rivers daily' },
  { icon: Building2, title: 'Industrial Pollution', desc: 'Industrial belts release chemical contaminants into river systems' },
  { icon: MapPinned, title: 'Floodplain Encroachment', desc: 'Urban development has narrowed natural river corridors' },
  { icon: Gauge, title: 'Inadequate STP Capacity', desc: 'Many existing STPs operate below required standards' },
  { icon: Unlink, title: 'Weak Reuse Infrastructure', desc: 'Treated wastewater reuse remains limited across sectors' },
  { icon: Shield, title: 'Fragmented Governance', desc: 'Multiple agencies manage fragmented components of water systems' },
];

export default function Objectives() {
  const sectionRef = useRef(null);
  const objRef = useRef(null);
  const chalRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const objCards = objRef.current?.querySelectorAll('.obj-card');
      if (objCards && objCards.length > 0) {
        gsap.from(objCards, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: objRef.current,
            start: 'top 80%',
          },
        });
      }

      const chalCards = chalRef.current?.querySelectorAll('.chal-card');
      if (chalCards && chalCards.length > 0) {
        gsap.from(chalCards, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: chalRef.current,
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="objectives"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/restored_river.jpg"
          alt="Restored River"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[#0a2e36]/95 z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Primary Objectives */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-1 rounded-full" style={{ backgroundColor: '#5adbff' }} />
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#5adbff' }}>
              Primary Objectives
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl mb-12" style={{ color: '#edffff' }}>
            Seven Pillars of{' '}
            <span style={{
              background: 'linear-gradient(to right, #5adbff, #00ff88)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Transformation
            </span>
          </h2>

          <div
            ref={objRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {primaryObjectives.map((obj, i) => {
              const IconComponent = obj.icon;
              return (
                <div
                  key={i}
                  className="obj-card rounded-xl p-5 flex items-start gap-4 transition-all duration-500 cursor-pointer"
                  style={{
                    background: 'rgba(237, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(237, 255, 255, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(90, 219, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(237, 255, 255, 0.1)';
                  }}
                >
                  <div 
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{ background: 'rgba(90, 219, 255, 0.1)' }}
                  >
                    <IconComponent size={20} color="#5adbff" />
                  </div>
                  <p className="text-sm leading-relaxed pt-2" style={{ color: 'rgba(237, 255, 255, 0.8)' }}>
                    {obj.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Challenges */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-1 rounded-full" style={{ backgroundColor: '#f87060' }} />
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#f87060' }}>
              Current Challenges
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl mb-12" style={{ color: '#edffff' }}>
            Major Problems{' '}
            <span style={{
              background: 'linear-gradient(to right, #f87060, #ff6b6b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Facing Rivers
            </span>
          </h2>

          <div
            ref={chalRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {challenges.map((ch, i) => {
              const IconComponent = ch.icon;
              return (
                <div
                  key={i}
                  className="chal-card relative overflow-hidden rounded-xl p-6 transition-all duration-500 cursor-pointer"
                  style={{
                    background: 'linear-gradient(to bottom right, rgba(248, 112, 96, 0.1), transparent)',
                    border: '1px solid rgba(248, 112, 96, 0.15)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(248, 112, 96, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(248, 112, 96, 0.15)';
                  }}
                >
                  <div 
                    className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl transition-all"
                    style={{ background: 'rgba(248, 112, 96, 0.05)' }}
                  />
                  <div className="relative z-10">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors"
                      style={{ background: 'rgba(248, 112, 96, 0.15)' }}
                    >
                      <IconComponent size={20} color="#f87060" />
                    </div>
                    <h3 className="font-display font-bold text-lg mb-2" style={{ color: '#edffff' }}>
                      {ch.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(237, 255, 255, 0.6)' }}>
                      {ch.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
