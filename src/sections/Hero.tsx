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
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Set visible first so mobile always shows content
      gsap.set(
        [
          badgeRef.current,
          titleRef.current,
          subtitleRef.current,
          ...(statsRef.current ? Array.from(statsRef.current.children) : []),
        ],
        { opacity: 1, y: 0 }
      );

      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(badgeRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .from(
          titleRef.current,
          { y: 60, opacity: 0, duration: 1.2, ease: 'power4.out' },
          '-=0.4'
        )
        .from(
          subtitleRef.current,
          { y: 30, opacity: 0, duration: 1, ease: 'power3.out' },
          '-=0.8'
        )
        .from(
          statsRef.current ? Array.from(statsRef.current.children) : [],
          { y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
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
      {/* ── VIDEO BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero_fallback.jpg"
          className="w-full h-full object-cover object-center"
        >
          <source src="/hero_dam.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2e36]/60 via-[#0a2e36]/20 to-[#0a2e36]" />
        <div className="absolute inset-0 bg-[#0a2e36]/30" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center py-24 sm:py-32">

        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-panel mb-6 sm:mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#f87060] animate-pulse flex-shrink-0" />
          <span className="text-[10px] sm:text-xs font-mono text-[#edffff]/80 uppercase tracking-widest">
            Detailed Project Report (DPR)
          </span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-display font-black text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#edffff] leading-[0.95] mb-4 sm:mb-6 px-2"
          style={{ textShadow: '0 4px 24px rgba(10, 46, 54, 0.8)' }}
        >
          MAHARASHTRA&apos;S
          <br />
          <span className="text-[#5adbff]">RIVERS, RESTORED.</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-sm sm:text-lg md:text-xl text-[#edffff]/80 max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2"
        >
          An integrated river restoration &amp; circular water economy mission
          transforming Maharashtra into India&apos;s first large-scale circular
          water economy state.
        </p>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 w-full max-w-xs sm:max-w-2xl mx-auto mb-10 sm:mb-16"
        >
          <div className="glass-panel rounded-xl sm:rounded-2xl px-2 sm:px-6 py-3 sm:py-4 text-center">
            <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-[#f87060] mx-auto mb-1 sm:mb-2" />
            <div className="font-mono font-bold text-base sm:text-2xl md:text-3xl text-[#edffff] leading-tight">
              3–4L Cr
            </div>
            <div className="text-[9px] sm:text-xs text-[#edffff]/60 mt-0.5 sm:mt-1 leading-tight">
              Investment
            </div>
          </div>

          <div className="glass-panel rounded-xl sm:rounded-2xl px-2 sm:px-6 py-3 sm:py-4 text-center">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#5adbff] mx-auto mb-1 sm:mb-2" />
            <div className="font-mono font-bold text-base sm:text-2xl md:text-3xl text-[#edffff] leading-tight">
              15–20 Yrs
            </div>
            <div className="text-[9px] sm:text-xs text-[#edffff]/60 mt-0.5 sm:mt-1 leading-tight">
              Phased Roadmap
            </div>
          </div>

          <div className="glass-panel rounded-xl sm:rounded-2xl px-2 sm:px-6 py-3 sm:py-4 text-center">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#c3e5ae] mx-auto mb-1 sm:mb-2" />
            <div className="font-mono font-bold text-base sm:text-2xl md:text-3xl text-[#edffff] leading-tight">
              15+ Rivers
            </div>
            <div className="text-[9px] sm:text-xs text-[#edffff]/60 mt-0.5 sm:mt-1 leading-tight">
              River Systems
            </div>
          </div>
        </div>

        {/* Scroll CTA */}
        <a
          href="#vision"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#vision')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#edffff]/60 hover:text-[#5adbff] transition-colors group"
        >
          <span>Explore the Mission</span>
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
