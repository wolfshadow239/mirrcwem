import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  IndianRupee,
  Clock,
  Waves,
  TrendingUp,
  HeartPulse,
  CloudSun,
  Building2,
  Users,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}

function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2.5, decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration,
          ease: 'power2.out',
          onUpdate: () => setCount(obj.val),
        });
      },
    });

    return () => trigger.kill();
  }, [end, duration]);

  return (
    <div ref={ref} className="font-mono font-bold">
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString()}
      {suffix}
    </div>
  );
}

const bigStats = [
  {
    icon: IndianRupee,
    value: 3.5,
    prefix: '',
    suffix: ' Lakh Cr',
    label: 'Total Investment Potential',
    sublabel: 'Estimated project cost',
    color: '#5adbff',
    decimals: 1,
  },
  {
    icon: Clock,
    value: 20,
    prefix: '',
    suffix: ' Years',
    label: 'Implementation Roadmap',
    sublabel: 'Phased approach',
    color: '#c3e5ae',
  },
  {
    icon: Waves,
    value: 15,
    prefix: '',
    suffix: '+',
    label: 'River Systems',
    sublabel: 'Across Maharashtra',
    color: '#f87060',
  },
];

const benefits = [
  {
    category: 'River Restoration',
    icon: Waves,
    color: '#5adbff',
    items: ['Improved ecological flow', 'Biodiversity recovery', 'Reduced contamination'],
  },
  {
    category: 'Public Health',
    icon: HeartPulse,
    color: '#f87060',
    items: ['Reduced waterborne diseases', 'Cleaner urban environments'],
  },
  {
    category: 'Climate Resilience',
    icon: CloudSun,
    color: '#c3e5ae',
    items: ['Better flood management', 'Groundwater recharge', 'Drought mitigation'],
  },
  {
    category: 'Economic Benefits',
    icon: TrendingUp,
    color: '#edffff',
    items: ['Reclaimed water economy', 'Industrial water security', 'Reduced healthcare costs', 'Green infrastructure employment'],
  },
];

const smartTech = [
  { icon: Building2, name: 'AI Pollution Monitoring', desc: 'Real-time river quality analysis' },
  { icon: Waves, name: 'IoT Sensor Networks', desc: 'BOD, COD, pH, flow rates, heavy metals' },
  { icon: CloudSun, name: 'GIS River Dashboard', desc: 'Interactive statewide monitoring' },
  { icon: Users, name: 'Public Transparency Portal', desc: 'Citizen-accessible water quality data' },
];

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

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

      const benefitCards = sectionRef.current?.querySelectorAll('.benefit-card');
      if (benefitCards) {
        gsap.from(benefitCards, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: benefitCards[0],
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32"
    >
      <div className="absolute inset-0 bg-[#0a2e36]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-1 bg-[#5adbff] rounded-full" />
            <span className="text-xs font-mono text-[#5adbff] uppercase tracking-widest">
              Impact & Technology
            </span>
            <div className="w-8 h-1 bg-[#5adbff] rounded-full" />
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#edffff] mb-4">
            Transformative
            <span className="text-gradient-teal"> Impact</span>
          </h2>
          <p className="text-[#edffff]/60 max-w-2xl mx-auto">
            Quantified projections and multi-dimensional benefits spanning
            environmental, public health, climate, and economic domains.
          </p>
        </div>

        {/* Big Counters */}
        <div className="grid sm:grid-cols-3 gap-6 mb-20">
          {bigStats.map((stat, i) => (
            <div
              key={i}
              className="glass-panel rounded-3xl p-8 text-center group hover:border-[#5adbff]/20 transition-all duration-500"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon
                  className="w-7 h-7"
                  style={{ color: stat.color }}
                />
              </div>
              <div
                className="text-4xl sm:text-5xl lg:text-6xl mb-2"
                style={{ color: stat.color }}
              >
                <AnimatedCounter
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                />
              </div>
              <div className="font-display font-semibold text-[#edffff] mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-[#edffff]/50">{stat.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="benefit-card glass-panel rounded-2xl p-6 hover:border-opacity-30 transition-all duration-500"
              style={{ borderColor: `${benefit.color}15` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${benefit.color}12` }}
              >
                <benefit.icon
                  className="w-5 h-5"
                  style={{ color: benefit.color }}
                />
              </div>
              <h4 className="font-display font-bold text-[#edffff] mb-3">
                {benefit.category}
              </h4>
              <ul className="space-y-2">
                {benefit.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-xs text-[#edffff]/60"
                  >
                    <span
                      className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: benefit.color }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Smart Technology */}
        <div className="glass-panel rounded-3xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <span className="text-xs font-mono text-[#c3e5ae] uppercase tracking-widest">
              Smart Technology Integration
            </span>
            <h3 className="font-display font-bold text-xl text-[#edffff] mt-2">
              Proposed Digital Systems
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {smartTech.map((tech, i) => (
              <div
                key={i}
                className="rounded-xl p-5 bg-white/[0.03] hover:bg-white/[0.06] transition-colors group text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[#5adbff]/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#5adbff]/20 transition-colors">
                  <tech.icon className="w-6 h-6 text-[#5adbff]" />
                </div>
                <h4 className="font-display font-semibold text-sm text-[#edffff] mb-1">
                  {tech.name}
                </h4>
                <p className="text-xs text-[#edffff]/50">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
