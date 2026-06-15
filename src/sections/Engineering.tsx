import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDownToDot,
  Route,
  Factory,
  CheckCircle2,
  Globe,
  Droplets,
  Settings,
  BarChart3,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const frameworks = [
  {
    id: 'tunnels',
    icon: ArrowDownToDot,
    title: 'Deep Interceptor Tunnel System',
    purpose: 'Capture sewage before it enters natural rivers.',
    components: [
      'Gravity sewer tunnels',
      'Smart pumping stations',
      'Overflow diversion systems',
      'SCADA automation',
      'Flow sensors',
    ],
    references: ['Singapore Deep Tunnel Sewer System', 'Thames Tideway Tunnel (London)', 'Tokyo Underground Drainage System'],
    color: '#5adbff',
  },
  {
    id: 'corridors',
    icon: Route,
    title: 'Secondary Wastewater Corridors',
    purpose: 'Engineered corridors dedicated to carrying wastewater toward treatment zones.',
    components: [
      'Controlled lining systems',
      'Sedimentation channels',
      'Wetland polishing zones',
      'Aeration systems',
      'Flow balancing systems',
    ],
    features: true,
    color: '#c3e5ae',
  },
  {
    id: 'stps',
    icon: Factory,
    title: 'Mega Regional STPs',
    purpose: 'High-capacity treatment plants with advanced technology.',
    components: [
      'Membrane Bioreactor (MBR)',
      'UV disinfection',
      'Ozonation',
      'Activated sludge systems',
      'Sludge-to-biogas recovery',
    ],
    specs: [
      { param: 'BOD', target: '<5 mg/L' },
      { param: 'COD', target: '<20 mg/L' },
      { param: 'Faecal Coliform', target: 'Near Zero' },
      { param: 'Automation', target: 'Fully SCADA Enabled' },
    ],
    color: '#f87060',
  },
];

export default function Engineering() {
  const stpImage = '/stp_facility.jpg';
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
      });

      const cards = cardsRef.current?.querySelectorAll('.eng-card');
      if (cards) {
        gsap.from(cards, {
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="engineering"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32"
    >
      <div className="absolute inset-0 bg-[#0a2e36]" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #5adbff 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-[#5adbff] rounded-full" />
            <span className="text-xs font-mono text-[#5adbff] uppercase tracking-widest">
              Engineering Framework
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#edffff] mb-4">
            Technical Infrastructure
            <span className="text-gradient-teal"> Solutions</span>
          </h2>
          <p className="text-[#edffff]/60 max-w-2xl mb-16">
            World-class engineering frameworks designed to intercept, transport,
            and treat wastewater at unprecedented scale.
          </p>
        </div>

        <div ref={cardsRef} className="grid lg:grid-cols-3 gap-6">
          {frameworks.map((fw) => (
            <div
              key={fw.id}
              className="eng-card holographic-card group"
            >
              <div className="card-body p-6 sm:p-8">
                {/* Header */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${fw.color}15` }}
                >
                  <fw.icon
                    className="w-7 h-7"
                    style={{ color: fw.color }}
                  />
                </div>

                <h3 className="font-display font-bold text-xl text-[#edffff] mb-3">
                  {fw.title}
                </h3>
                <p className="text-[#edffff]/60 text-sm mb-6 leading-relaxed">
                  {fw.purpose}
                </p>

                {/* Components */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Settings className="w-3.5 h-3.5 text-[#edffff]/40" />
                    <span className="text-xs font-mono text-[#edffff]/40 uppercase tracking-wider">
                      Components
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {fw.components.map((comp, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[#edffff]/70"
                      >
                        <CheckCircle2
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: fw.color }}
                        />
                        {comp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Special sections */}
                {fw.references && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="w-3.5 h-3.5 text-[#edffff]/40" />
                      <span className="text-xs font-mono text-[#edffff]/40 uppercase tracking-wider">
                        International References
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {fw.references.map((ref, i) => (
                        <li
                          key={i}
                          className="text-xs text-[#edffff]/50 flex items-center gap-2"
                        >
                          <Droplets className="w-3 h-3 text-[#5adbff]/40" />
                          {ref}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {fw.specs && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart3 className="w-3.5 h-3.5 text-[#edffff]/40" />
                      <span className="text-xs font-mono text-[#edffff]/40 uppercase tracking-wider">
                        Treatment Targets
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {fw.specs.map((spec, i) => (
                        <div
                          key={i}
                          className="rounded-lg bg-white/[0.03] px-3 py-2"
                        >
                          <div className="text-xs text-[#edffff]/40 mb-1">
                            {spec.param}
                          </div>
                          <div
                            className="font-mono font-bold text-sm"
                            style={{ color: fw.color }}
                          >
                            {spec.target}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {fw.features && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#edffff]/40" />
                      <span className="text-xs font-mono text-[#edffff]/40 uppercase tracking-wider">
                        Corridor Features
                      </span>
                    </div>
                    <p className="text-xs text-[#edffff]/50 leading-relaxed">
                      Engineered channels with controlled lining, built-in
                      sedimentation, integrated wetland polishing, continuous
                      aeration, and automated flow balancing for optimal
                      wastewater transport.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
