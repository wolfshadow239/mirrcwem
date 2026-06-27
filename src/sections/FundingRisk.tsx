import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Landmark,
  Building,
  Globe,
  Leaf,
  TrendingUp,
  Handshake,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Users,
  Droplets,
  Recycle,
  Mountain,
  Building2,
  Sparkles,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type FundingSource = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  name: string;
};

type Benchmark = {
  country: string;
  practice: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

type Risk = {
  id: number;
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  mitigations: string[];
};

const fundingSources: FundingSource[] = [
  { icon: Landmark, name: 'State Government Funding' },
  { icon: Building, name: 'Central Government Schemes' },
  { icon: Globe, name: 'Multilateral Development Banks' },
  { icon: Leaf, name: 'Green Infrastructure Funds' },
  { icon: TrendingUp, name: 'ESG Investment Platforms' },
  { icon: Handshake, name: 'Public-Private Partnerships' },
];

const benchmarks: Benchmark[] = [
  { country: 'Singapore', practice: 'Deep sewer tunnel systems', icon: Building2 },
  { country: 'Netherlands', practice: 'Floodplain restoration', icon: Mountain },
  { country: 'Israel', practice: 'Wastewater reuse', icon: Recycle },
  { country: 'Japan', practice: 'Smart drainage systems', icon: Droplets },
  { country: 'South Korea', practice: 'Urban river restoration', icon: Sparkles },
];

const risks: Risk[] = [
  {
    id: 1,
    title: 'Land Acquisition Delays',
    icon: AlertTriangle,
    color: '#f87060',
    mitigations: ['Use government land banks', 'Peripheral utility zones'],
  },
  {
    id: 2,
    title: 'Funding Constraints',
    icon: Clock,
    color: '#5adbff',
    mitigations: ['PPP models', 'Green bonds', 'Multilateral funding'],
  },
  {
    id: 3,
    title: 'Governance Fragmentation',
    icon: ShieldCheck,
    color: '#c3e5ae',
    mitigations: ['Unified river authority', 'Digital coordination systems'],
  },
  {
    id: 4,
    title: 'Public Resistance',
    icon: Users,
    color: '#edffff',
    mitigations: ['Awareness campaigns', 'Transparent monitoring systems'],
  },
];

export default function FundingRisk() {
  const sectionRef = useRef<HTMLElement>(null);
  const fundingRef = useRef<HTMLDivElement>(null);
  const benchmarkRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Funding cards
      const fundingCards = fundingRef.current?.querySelectorAll('.funding-card');
      if (fundingCards && fundingCards.length > 0) {
        gsap.set(fundingCards, { opacity: 1, y: 0 });
        gsap.from(fundingCards, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: fundingRef.current,
            start: 'top 95%',
          },
        });
      }

      // Benchmark cards
      const bmCards = benchmarkRef.current?.querySelectorAll('.benchmark-card');
      if (bmCards && bmCards.length > 0) {
        gsap.set(bmCards, { opacity: 1, y: 0 });
        gsap.from(bmCards, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: benchmarkRef.current,
            start: 'top 95%',
          },
        });
      }

      // Risk cards
      const riskCards = riskRef.current?.querySelectorAll('.risk-card');
      if (riskCards && riskCards.length > 0) {
        gsap.set(riskCards, { opacity: 1, y: 0 });
        gsap.from(riskCards, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: riskRef.current,
            start: 'top 95%',
          },
        });
      }
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2e36] via-[#0d3a42] to-[#0a2e36]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── FUNDING SOURCES ── */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-[#c3e5ae] rounded-full" />
            <span className="text-xs font-mono text-[#c3e5ae] uppercase tracking-widest">
              Proposed Funding Sources
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#edffff] mb-10">
            Diversified
            <span className="text-[#5adbff]"> Funding Strategy</span>
          </h2>

          <div ref={fundingRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fundingSources.map((source, i) => (
              <div
                key={i}
                className="funding-card glass-panel rounded-xl p-5 flex items-center gap-4 hover:border-[#c3e5ae]/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#c3e5ae]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c3e5ae]/20 transition-colors">
                  {React.createElement(source.icon, { className: 'w-6 h-6 text-[#c3e5ae]' })}
                </div>
                <span className="text-[#edffff]/80 font-medium text-sm">
                  {source.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── INTERNATIONAL BENCHMARKING ── */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-[#5adbff] rounded-full" />
            <span className="text-xs font-mono text-[#5adbff] uppercase tracking-widest">
              International Benchmarking
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#edffff] mb-10">
            Global Best
            <span className="text-[#5adbff]"> Practices</span>
          </h2>

          <div ref={benchmarkRef} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {benchmarks.map((bm, i) => (
              <div
                key={i}
                className="benchmark-card glass-panel rounded-2xl p-6 text-center hover:border-[#5adbff]/20 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#5adbff]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#5adbff]/20 group-hover:scale-110 transition-all duration-300">
                  {React.createElement(bm.icon, { className: 'w-7 h-7 text-[#5adbff]' })}
                </div>
                <h4 className="font-display font-bold text-[#edffff] mb-1">
                  {bm.country}
                </h4>
                <p className="text-xs text-[#edffff]/50">{bm.practice}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RISK ASSESSMENT ── */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-[#f87060] rounded-full" />
            <span className="text-xs font-mono text-[#f87060] uppercase tracking-widest">
              Risk Assessment
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#edffff] mb-10">
            Risk
            <span className="text-[#f87060]"> Mitigation</span>
          </h2>

          <div ref={riskRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {risks.map((risk) => (
              <div
                key={risk.id}
                className="risk-card rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${risk.color}08, transparent)`,
                  borderColor: `${risk.color}20`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${risk.color}15` }}
                >
                  {React.createElement(risk.icon, {
                    className: 'w-6 h-6',
                    style: { color: risk.color },
                  })}
                </div>
                <h4 className="font-display font-bold text-[#edffff] mb-4">
                  {risk.title}
                </h4>
                <div className="space-y-2">
                  <span
                    className="text-xs font-mono uppercase tracking-wider"
                    style={{ color: risk.color }}
                  >
                    Mitigation:
                  </span>
                  <ul className="space-y-1.5">
                    {risk.mitigations.map((m, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-xs text-[#edffff]/60"
                      >
                        <span
                          className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: risk.color }}
                        />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
