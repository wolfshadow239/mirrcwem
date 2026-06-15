import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Waves,
  AlertCircle,
  Wrench,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Basin {
  id: string;
  name: string;
  rivers: string[];
  issues: string[];
  interventions: string[];
  stps: { location: string; capacity: number }[];
  stpLabel: string;
}

const basins: Basin[] = [
  {
    id: 'pune',
    name: 'Pune Metropolitan Basin',
    rivers: ['Mula', 'Mutha', 'Mula-Mutha', 'Pavana', 'Indrayani'],
    issues: ['Severe sewage inflow', 'Drain discharge', 'Urban runoff', 'Encroachments'],
    interventions: ['Deep interceptor tunnels', 'Mega peripheral STPs', 'Secondary wastewater corridors', 'Floodplain restoration', 'Treated-water reuse pipelines'],
    stps: [
      { location: 'Chakan', capacity: 350 },
      { location: 'Wagholi', capacity: 300 },
      { location: 'Hadapsar', capacity: 400 },
      { location: 'Talegaon', capacity: 200 },
      { location: 'Daund Corridor', capacity: 500 },
    ],
    stpLabel: 'Proposed STP Corridors',
  },
  {
    id: 'mumbai',
    name: 'Mumbai Metropolitan Basin',
    rivers: ['Mithi', 'Dahisar', 'Poisar', 'Ulhas'],
    issues: ['Tidal contamination', 'Stormwater congestion', 'Industrial discharge', 'Urban waste accumulation'],
    interventions: ['Underground deep sewer tunnels', 'Coastal mega STPs', 'Mangrove restoration', 'Tidal ecological channels', 'Smart drainage systems'],
    stps: [
      { location: 'Trombay', capacity: 700 },
      { location: 'Navi Mumbai', capacity: 600 },
      { location: 'Versova', capacity: 500 },
      { location: 'Vasai-Virar', capacity: 400 },
    ],
    stpLabel: 'Proposed STP Zones',
  },
  {
    id: 'nashik',
    name: 'Nashik-Godavari Basin',
    rivers: ['Godavari', 'Kadva'],
    issues: ['Religious waste', 'Municipal sewage', 'Seasonal pollution spikes'],
    interventions: ['Sacred river protection zone', 'Treated-water agriculture reuse', 'Industrial recycled-water mandate', 'Riverfront ecological restoration'],
    stps: [],
    stpLabel: '',
  },
  {
    id: 'nagpur',
    name: 'Nagpur & Vidarbha Basin',
    rivers: ['Nag River', 'Kanhan', 'Wainganga', 'Wardha'],
    issues: ['Sewage discharge', 'Industrial contamination', 'Thermal power water stress'],
    interventions: ['Reuse-based water grid', 'Industrial reclaimed-water supply', 'Ecological river isolation', 'Smart monitoring systems'],
    stps: [],
    stpLabel: '',
  },
  {
    id: 'western',
    name: 'Western Maharashtra Basin',
    rivers: ['Krishna', 'Bhima', 'Panchganga'],
    issues: ['Sugar mill discharge', 'Agricultural runoff', 'Urban sewage inflow'],
    interventions: ['Zero Liquid Discharge systems', 'Industrial wastewater recycling', 'Bioenergy recovery systems', 'Nutrient recovery infrastructure'],
    stps: [],
    stpLabel: '',
  },
];

export default function BasinAnalysis() {
  const [activeBasin, setActiveBasin] = useState(0);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeData = basins[activeBasin];

  const sortedStps = [...activeData.stps].sort((a, b) =>
    sortDir === 'desc' ? b.capacity - a.capacity : a.capacity - b.capacity
  );

  const toggleSort = () => {
    setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeBasin]);

  return (
    <section
      id="basins"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2e36] via-[#0d3a42] to-[#0a2e36]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-[#c3e5ae] rounded-full" />
            <span className="text-xs font-mono text-[#c3e5ae] uppercase tracking-widest">
              River Basin Analysis
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#edffff] mb-4">
            Five Critical River
            <span className="text-gradient-teal"> Basins</span>
          </h2>
          <p className="text-[#edffff]/60 max-w-2xl mb-12">
            Comprehensive analysis of Maharashtra&apos;s major river basins, their
            challenges, and proposed intervention strategies.
          </p>
        </div>

        {/* Basin Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {basins.map((basin, i) => (
            <button
              key={basin.id}
              onClick={() => setActiveBasin(i)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                i === activeBasin
                  ? 'bg-[#5adbff] text-[#0a2e36] shadow-lg shadow-[#5adbff]/20'
                  : 'glass-panel text-[#edffff]/70 hover:text-[#edffff] hover:bg-white/5'
              }`}
            >
              {basin.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Basin Content */}
        <div ref={contentRef} className="space-y-6">
          {/* Rivers */}
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Waves className="w-4 h-4 text-[#5adbff]" />
              <h3 className="font-display font-bold text-lg text-[#edffff]">
                Rivers in {activeData.name}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeData.rivers.map((river) => (
                <span
                  key={river}
                  className="px-3 py-1.5 rounded-full bg-[#5adbff]/10 text-[#5adbff] text-sm font-medium"
                >
                  {river}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Key Issues */}
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-4 h-4 text-[#f87060]" />
                <h3 className="font-display font-bold text-lg text-[#edffff]">
                  Key Issues
                </h3>
              </div>
              <ul className="space-y-3">
                {activeData.issues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#f87060] mt-2" />
                    <span className="text-[#edffff]/70 text-sm">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Proposed Interventions */}
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-4 h-4 text-[#c3e5ae]" />
                <h3 className="font-display font-bold text-lg text-[#edffff]">
                  Proposed Interventions
                </h3>
              </div>
              <ul className="space-y-3">
                {activeData.interventions.map((intervention, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#c3e5ae] mt-2" />
                    <span className="text-[#edffff]/70 text-sm">{intervention}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* STP Table */}
          {activeData.stps.length > 0 && (
            <div className="glass-panel rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/5">
                <h3 className="font-display font-bold text-lg text-[#edffff]">
                  {activeData.stpLabel}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-6 py-3 text-xs font-mono text-[#edffff]/50 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="text-right px-6 py-3">
                        <button
                          onClick={toggleSort}
                          className="inline-flex items-center gap-1 text-xs font-mono text-[#5adbff] uppercase tracking-wider hover:text-[#5adbff]/80 transition-colors"
                        >
                          Proposed Capacity
                          {sortDir === 'desc' ? (
                            <ChevronDown className="w-3 h-3" />
                          ) : (
                            <ChevronUp className="w-3 h-3" />
                          )}
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedStps.map((stp, i) => (
                      <tr
                        key={stp.location}
                        className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        <td className="px-6 py-4 text-[#edffff]/80 font-medium">
                          {stp.location}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-mono font-bold text-[#5adbff]">
                            {stp.capacity}
                          </span>
                          <span className="text-[#edffff]/40 text-sm ml-1">
                            MLD
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
