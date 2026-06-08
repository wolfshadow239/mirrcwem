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
  const sectionRef = useRef<HTMLElement>(null);
  const objRef = useRef<HTMLDivElement>(null);
  const chalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const objCards = objRef.current?.querySelectorAll('.obj-card');
      if (objCards) {
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
      if (chalCards) {
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
      <div className="absolute inset-0 bg-[#0a2e36]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Primary Objectives */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-[#5adbff] rounded-full" />
            <span className="text-xs font-mono text-[#5adbff] uppercase tracking-widest">
              Primary Objectives
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#edffff] mb-12">
            Seven Pillars of
            <span className="text-gradient-teal"> Transformation</span>
          </h2>

          <div
            ref={objRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {primaryObjectives.map((obj, i) => (
              <div
                key={i}
                className="obj-card glass-panel rounded-xl p-5 flex items-start gap-4 hover:border-[#5adbff]/30 transition-all duration-500 group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#5adbff]/10 flex items-center justify-center group-hover:bg-[#5adbff]/20 group-hover:scale-110 transition-all duration-300">
                  <obj.icon className="w-5 h-5 text-[#5adbff]" />
                </div>
                <p className="text-[#edffff]/80 text-sm leading-relaxed pt-2">
                  {obj.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Current Challenges */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-[#f87060] rounded-full" />
            <span className="text-xs font-mono text-[#f87060] uppercase tracking-widest">
              Current Challenges
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#edffff] mb-12">
            Major Problems
            <span className="text-gradient-coral"> Facing Rivers</span>
          </h2>

          <div
            ref={chalRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {challenges.map((ch, i) => (
              <div
                key={i}
                className="chal-card relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-[#f87060]/10 to-transparent border border-[#f87060]/15 hover:border-[#f87060]/40 transition-all duration-500 group"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#f87060]/5 rounded-full blur-2xl group-hover:bg-[#f87060]/10 transition-all" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-[#f87060]/15 flex items-center justify-center mb-4 group-hover:bg-[#f87060]/25 transition-colors">
                    <ch.icon className="w-5 h-5 text-[#f87060]" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#edffff] mb-2">
                    {ch.title}
                  </h3>
                  <p className="text-[#edffff]/60 text-sm leading-relaxed">
                    {ch.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
