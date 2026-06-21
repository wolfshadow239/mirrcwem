import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Target, TrendingUp } from 'lucide-react';

// Register plugin (safe for both client and server)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const visionPoints = [
  // ... your visionPoints array (unchanged)
];

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        x: -40,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
      });

      // Cards staggered reveal
      const cards = cardsRef.current?.querySelectorAll('.vision-card');
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          y: 60,
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

    // IMPORTANT: Refresh ScrollTrigger after animations
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      // Clean up all ScrollTriggers
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 lg:py-40"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2e36] via-[#0d383f] to-[#0a2e36]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left sticky heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <h2
              ref={headingRef}
              className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#edffff] leading-tight"
            >
              A CIRCULAR
              <br />
              <span className="text-gradient-coral">WATER</span>
              <br />
              ECONOMY
            </h2>
            <p className="mt-6 text-[#edffff]/60 text-base leading-relaxed">
              Transforming Maharashtra into India&apos;s first large-scale circular
              water economy state by restoring river ecosystems, restructuring
              wastewater infrastructure and maximizing treated-water reuse.
            </p>
          </div>

          {/* Right scrolling cards */}
          <div ref={cardsRef} className="lg:col-span-8 space-y-6">
            {visionPoints.map((point, i) => (
              <div
                key={i}
                className="vision-card glass-panel rounded-2xl p-6 sm:p-8 hover:border-[#5adbff]/20 transition-all duration-500 group"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#5adbff]/10 flex items-center justify-center group-hover:bg-[#5adbff]/20 transition-colors">
                    <point.icon className="w-6 h-6 text-[#5adbff]" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#edffff] mb-3">
                      {point.title}
                    </h3>
                    <p className="text-[#edffff]/70 text-sm sm:text-base leading-relaxed">
                      {point.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Vision statement highlight */}
            <div className="vision-card relative overflow-hidden rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-[#f87060]/20 to-[#5adbff]/10 border border-[#f87060]/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#f87060]/10 rounded-full blur-3xl" />
              <blockquote className="relative z-10">
                <p className="font-display font-bold text-xl sm:text-2xl text-[#edffff] leading-relaxed italic">
                  &ldquo;To transform Maharashtra into India&apos;s first large-scale
                  circular water economy state by restoring river ecosystems,
                  restructuring wastewater infrastructure and maximizing
                  treated-water reuse.&rdquo;
                </p>
                <footer className="mt-4 text-[#f87060] font-mono text-sm">
                  — Vision Statement
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
