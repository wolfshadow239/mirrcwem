import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users,
  Megaphone,
  GraduationCap,
  Microscope,
  Share2,
  FileText,
  BarChart3,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  { icon: Users, title: 'River Volunteer Programs', desc: 'Community-led river cleanup and monitoring initiatives' },
  { icon: Megaphone, title: 'Public Awareness Campaigns', desc: 'Statewide education on river conservation and water reuse' },
  { icon: GraduationCap, title: 'School Environmental Education', desc: 'Curriculum integration for next-generation stewardship' },
  { icon: Microscope, title: 'Citizen Science Monitoring', desc: 'Public participation in water quality data collection' },
];

const digitalCampaigns = [
  { icon: Share2, title: 'Social Media Awareness' },
  { icon: FileText, title: 'Online Petition Systems' },
  { icon: BarChart3, title: 'Interactive Dashboards' },
];

export default function Participation() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.part-card');
      if (cards) {
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 sm:py-32">
      <div className="absolute inset-0 bg-[#0a2e36]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-1 bg-[#edffff] rounded-full" />
          <span className="text-xs font-mono text-[#edffff]/60 uppercase tracking-widest">
            Public Participation
          </span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#edffff] mb-4">
          Citizen
          <span className="text-gradient-teal"> Engagement</span>
        </h2>
        <p className="text-[#edffff]/60 max-w-2xl mb-12">
          Building a movement through education, participation, and transparent
          governance. Every citizen is a stakeholder in Maharashtra&apos;s river
          future.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Programs */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-[#edffff] mb-4">
              Engagement Programs
            </h3>
            {programs.map((prog, i) => (
              <div
                key={i}
                className="part-card glass-panel rounded-xl p-5 flex items-start gap-4 hover:border-[#edffff]/10 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#edffff]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#edffff]/10 transition-colors">
                  <prog.icon className="w-5 h-5 text-[#edffff]/70" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-[#edffff] mb-1">
                    {prog.title}
                  </h4>
                  <p className="text-xs text-[#edffff]/50">{prog.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Digital Campaigns + Conclusion */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-lg text-[#edffff] mb-4">
                Digital Campaigns
              </h3>
              <div className="flex flex-wrap gap-3">
                {digitalCampaigns.map((camp, i) => (
                  <div
                    key={i}
                    className="part-card glass-panel rounded-xl px-5 py-3 flex items-center gap-3"
                  >
                    <camp.icon className="w-4 h-4 text-[#5adbff]" />
                    <span className="text-sm text-[#edffff]/70">
                      {camp.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini conclusion card */}
            <div className="part-card relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-[#5adbff]/10 to-[#c3e5ae]/5 border border-[#5adbff]/15">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#5adbff]/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h4 className="font-display font-bold text-xl text-[#edffff] mb-3">
                  The Future of Maharashtra&apos;s Rivers
                </h4>
                <p className="text-sm text-[#edffff]/60 leading-relaxed mb-4">
                  Depends on long-term integrated planning, engineering
                  innovation and public participation. Together, we can restore
                  our rivers and build a circular water economy.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Restore river ecosystems',
                    'Improve public health',
                    'Increase water security',
                    'Support industrial growth',
                    'Improve climate resilience',
                    'Build a circular water economy',
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-[#5adbff]/10 text-[#5adbff] text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
