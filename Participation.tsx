import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDownToDot,
  Factory,
  Droplets,
  Leaf,
  Cpu,
  Info,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const costItems = [
  {
    icon: ArrowDownToDot,
    component: 'Interceptor Tunnels',
    low: 150000,
    high: 200000,
    color: '#5adbff',
  },
  {
    icon: Factory,
    component: 'Mega STPs',
    low: 100000,
    high: 130000,
    color: '#c3e5ae',
  },
  {
    icon: Droplets,
    component: 'Reuse Infrastructure',
    low: 80000,
    high: 80000,
    color: '#8fb9a8',
  },
  {
    icon: Leaf,
    component: 'Wetlands & Ecological Restoration',
    low: 20000,
    high: 20000,
    color: '#f87060',
  },
  {
    icon: Cpu,
    component: 'Smart Monitoring Systems',
    low: 15000,
    high: 15000,
    color: '#edffff',
  },
];

function AnimatedBar({
  value,
  max,
  color,
  delay,
}: {
  value: number;
  max: number;
  color: string;
  delay: number;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        gsap.fromTo(
          el,
          { width: '0%' },
          { width: `${(value / max) * 100}%`, duration: 1.5, delay, ease: 'power3.out' }
        );
      },
    });

    return () => trigger.kill();
  }, [value, max, delay]);

  return (
    <div
      ref={barRef}
      className="h-full rounded-full"
      style={{ backgroundColor: color, opacity: 0.7 }}
    />
  );
}

export default function CostBreakdown() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxValue = Math.max(...costItems.map((c) => c.high));

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

      const rows = sectionRef.current?.querySelectorAll('.cost-row');
      if (rows) {
        gsap.from(rows, {
          x: -30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rows[0],
            start: 'top 85%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const totalLow = costItems.reduce((s, c) => s + c.low, 0);
  const totalHigh = costItems.reduce((s, c) => s + c.high, 0);

  const formatCr = (val: number) => {
    if (val >= 100000) return `${(val / 100000).toFixed(1)} Lakh Cr`;
    return `₹${(val / 1000).toFixed(0)},000 Cr`;
  };

  return (
    <section ref={sectionRef} className="relative w-full py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2e36] via-[#0c353c] to-[#0a2e36]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-[#f87060] rounded-full" />
            <span className="text-xs font-mono text-[#f87060] uppercase tracking-widest">
              Estimated Project Cost
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#edffff] mb-4">
            Investment
            <span className="text-gradient-coral"> Breakdown</span>
          </h2>
          <p className="text-[#edffff]/60 max-w-2xl mb-12">
            Comprehensive cost analysis across all infrastructure components for
            the 15-20 year implementation roadmap.
          </p>
        </div>

        {/* Cost Table */}
        <div className="glass-panel rounded-2xl overflow-hidden mb-8">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 bg-white/[0.02]">
            <div className="col-span-5 sm:col-span-4 text-xs font-mono text-[#edffff]/40 uppercase tracking-wider">
              Component
            </div>
            <div className="col-span-4 sm:col-span-5 text-xs font-mono text-[#edffff]/40 uppercase tracking-wider">
              Visual
            </div>
            <div className="col-span-3 text-right text-xs font-mono text-[#edffff]/40 uppercase tracking-wider">
              Estimated Cost
            </div>
          </div>

          {/* Rows */}
          {costItems.map((item, i) => (
            <div
              key={i}
              className="cost-row grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="col-span-5 sm:col-span-4 flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${item.color}12` }}
                >
                  <item.icon
                    className="w-4.5 h-4.5"
                    style={{ color: item.color }}
                  />
                </div>
                <span className="text-sm text-[#edffff]/80 font-medium truncate">
                  {item.component}
                </span>
              </div>
              <div className="col-span-4 sm:col-span-5 flex items-center">
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                  <AnimatedBar
                    value={item.high}
                    max={maxValue}
                    color={item.color}
                    delay={i * 0.1}
                  />
                </div>
              </div>
              <div className="col-span-3 text-right">
                <span
                  className="font-mono font-bold text-sm"
                  style={{
                    color:
                      hoveredIndex === i ? item.color : 'rgba(237,255,255,0.7)',
                  }}
                >
                  {item.low === item.high
                    ? formatCr(item.low)
                    : `${formatCr(item.low)} – ${formatCr(item.high)}`}
                </span>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="grid grid-cols-12 gap-4 px-6 py-5 bg-[#5adbff]/5 border-t border-[#5adbff]/10">
            <div className="col-span-5 sm:col-span-4 flex items-center gap-3">
              <Info className="w-5 h-5 text-[#5adbff]" />
              <span className="font-display font-bold text-[#edffff]">
                Total Estimated Investment
              </span>
            </div>
            <div className="col-span-4 sm:col-span-5" />
            <div className="col-span-3 text-right">
              <span className="font-mono font-bold text-lg text-[#5adbff]">
                {formatCr(totalLow)} – {formatCr(totalHigh)}
              </span>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#f87060]/5 border border-[#f87060]/10">
          <Info className="w-4 h-4 text-[#f87060] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#edffff]/50 leading-relaxed">
            Cost estimates are preliminary and subject to revision based on
            detailed engineering surveys, land acquisition assessments, and
            technology selection. Final costs will be determined during the
            Detailed Engineering Report (DER) phase.
          </p>
        </div>
      </div>
    </section>
  );
}
