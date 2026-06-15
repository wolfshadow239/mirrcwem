import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown, MapPin, Clock, IndianRupee } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(badgeRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .from(
          titleRef.current,
          {
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
          },
          '-=0.4'
        )
        .from(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.8'
        )
        .from(
          statsRef.current?.children || [],
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          },
          '-=0.5'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero_fallback.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/hero_dam.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2e36]/50 via-transparent to-[#0a2e36]" />
        <div className="absolute inset-0 bg-[#0a2e36]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#f87060] animate-pulse" />
          <span className="text-xs font-mono text-[#edffff]/80 uppercase tracking-widest">
            Detailed Project Report (DPR)
          </span>
        </div>

        <h1
          ref={titleRef}
          className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#edffff] leading-[0.95] mb-6"
          style={{ textShadow: '0 4px 24px rgba(10, 46, 54, 0.8)' }}
        >
          MAHARASHTRA&apos;S
          <br />
          <span className="text-gradient-teal">RIVERS, RESTORED.</span>
        </h1>

        <p
          ref={subtitleRef}
          className="font-body text-lg sm:text-xl text-[#edffff]/80 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          An integrated river restoration & circular water economy mission
          transforming Maharashtra into India&apos;s first large-scale circular
          water economy state.
        </p>

        <div
          ref={statsRef}
          className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-16"
        >
          <div className="glass-panel rounded-2xl px-6 py-4 text-center min-w-[140px]">
            <IndianRupee className="w-5 h-5 text-[#f87060] mx-auto mb-2" />
            <div className="font-mono font-bold text-2xl sm:text-3xl text-[#edffff]">
              3-4 Lakh Cr
            </div>
            <div className="text-xs text-[#edffff]/60 mt-1">
              Investment Potential
            </div>
          </div>
          <div className="glass-panel rounded-2xl px-6 py-4 text-center min-w-[140px]">
            <Clock className="w-5 h-5 text-[#5adbff] mx-auto mb-2" />
            <div className="font-mono font-bold text-2xl sm:text-3xl text-[#edffff]">
              15-20 Years
            </div>
            <div className="text-xs text-[#edffff]/60 mt-1">
              Phased Roadmap
            </div>
          </div>
          <div className="glass-panel rounded-2xl px-6 py-4 text-center min-w-[140px]">
            <MapPin className="w-5 h-5 text-[#c3e5ae] mx-auto mb-2" />
            <div className="font-mono font-bold text-2xl sm:text-3xl text-[#edffff]">
              15+ Rivers
            </div>
            <div className="text-xs text-[#edffff]/60 mt-1">
              River Systems
            </div>
          </div>
        </div>

        <a
          href="#vision"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#vision')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-sm text-[#edffff]/60 hover:text-[#5adbff] transition-colors group"
        >
          <span>Explore the Mission</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
