import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Shield,
  Factory,
  Map,
  Droplets,
  Leaf,
  Cpu,
  BarChart3,
  Globe,
  TrendingUp,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    id: 1,
    years: '0-5 Years',
    title: 'Phase 1: Foundation',
    color: '#5adbff',
    objectives: [
      'Pollution interception',
      'Initial mega STP development',
      'Drain mapping',
      'Emergency river protection',
    ],
    activities: [
      { icon: Shield, text: 'Interceptor tunnel construction' },
      { icon: Factory, text: 'Pilot reuse corridors' },
      { icon: Map, text: 'Pollution monitoring systems' },
    ],
  },
  {
    id: 2,
    years: '5-10 Years',
    title: 'Phase 2: Expansion',
    color: '#c3e5ae',
    objectives: [
      'Large-scale reuse systems',
      'Wetland development',
      'Regional treatment grids',
    ],
    activities: [
      { icon: Droplets, text: 'Industrial treated-water integration' },
      { icon: Leaf, text: 'Groundwater recharge projects' },
      { icon: TrendingUp, text: 'Ecological restoration' },
    ],
  },
  {
    id: 3,
    years: '10-20 Years',
    title: 'Phase 3: Maturity',
    color: '#f87060',
    objectives: [
      'Statewide circular water economy',
      'Near-potable river systems',
      'Biodiversity restoration',
    ],
    activities: [
      { icon: Cpu, text: 'Smart river ecosystem management' },
      { icon: Globe, text: 'Public water transparency systems' },
      { icon: BarChart3, text: 'Ecological flow stabilization' },
    ],
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
      });

      const cards = sectionRef.current?.querySelectorAll('.phase-card');
if (cards) {
  gsap.set(cards, { opacity: 1, y: 0 }); // ← always visible immediately
  gsap.from(cards, {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: cards[0],
      start: 'top 95%', // ← triggers earlier
    },
  });
  ScrollTrigger.refresh(); // ← forces recalculation
}
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2e36] via-[#0c3238] to-[#0a2e36]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-1 bg-[#f87060] rounded-full" />
            <span className="text-xs font-mono text-[#f87060] uppercase tracking-widest">
              Implementation Roadmap
            </span>
            <div className="w-8 h-1 bg-[#f87060] rounded-full" />
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#edffff] mb-4">
            20-Year
            <span className="text-gradient-coral"> Phased Timeline</span>
          </h2>
          <p className="text-[#edffff]/60 max-w-2xl mx-auto">
            A strategic three-phase implementation plan spanning two decades,
            from initial interception to statewide circular water economy.
          </p>
        </div>

        {/* Phase selector */}
        <div className="flex justify-center gap-2 mb-12">
          {phases.map((phase, i) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                i === activePhase
                  ? 'text-[#0a2e36] shadow-lg'
                  : 'glass-panel text-[#edffff]/60 hover:text-[#edffff]'
              }`}
              style={
                i === activePhase
                  ? { backgroundColor: phase.color }
                  : undefined
              }
            >
              {phase.years}
            </button>
          ))}
        </div>

        {/* Timeline visual */}
        <div className="relative mb-12">
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${((activePhase + 1) / 3) * 100}%`,
                background: `linear-gradient(90deg, ${phases[0].color}, ${phases[1].color}, ${phases[2].color})`,
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs font-mono text-[#edffff]/30">Year 0</span>
            <span className="text-xs font-mono text-[#edffff]/30">Year 5</span>
            <span className="text-xs font-mono text-[#edffff]/30">
              Year 10
            </span>
            <span className="text-xs font-mono text-[#edffff]/30">
              Year 20
            </span>
          </div>
        </div>

        {/* Phase Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {phases.map((phase, i) => (
            <div
              key={phase.id}
              className={`phase-card rounded-2xl border transition-all duration-500 ${
                i === activePhase
                  ? 'scale-[1.02] shadow-2xl'
                  : 'opacity-60 hover:opacity-80'
              }`}
              style={{
                background: `linear-gradient(135deg, ${phase.color}08, ${phase.color}03)`,
                borderColor:
                  i === activePhase
                    ? `${phase.color}40`
                    : 'rgba(255,255,255,0.05)',
              }}
            >
              {/* Header */}
              <div
                className="p-6 border-b border-white/5"
                style={{ borderColor: `${phase.color}15` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${phase.color}15` }}
                  >
                    <span
                      className="font-mono font-bold text-lg"
                      style={{ color: phase.color }}
                    >
                      {phase.id}
                    </span>
                  </div>
                  <div>
                    <div
                      className="font-mono text-xs font-semibold"
                      style={{ color: phase.color }}
                    >
                      {phase.years}
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#edffff]">
                      {phase.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Objectives */}
              <div className="p-6 border-b border-white/5">
                <span className="text-xs font-mono text-[#edffff]/40 uppercase tracking-wider mb-3 block">
                  Objectives
                </span>
                <ul className="space-y-2">
                  {phase.objectives.map((obj, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-[#edffff]/70"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: phase.color }}
                      />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Activities */}
              <div className="p-6">
                <span className="text-xs font-mono text-[#edffff]/40 uppercase tracking-wider mb-3 block">
                  Major Activities
                </span>
                <ul className="space-y-3">
                  {phase.activities.map((act, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-3 text-sm text-[#edffff]/70"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${phase.color}10` }}
                      >
                        <act.icon
                          className="w-4 h-4"
                          style={{ color: phase.color }}
                        />
                      </div>
                      {act.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
