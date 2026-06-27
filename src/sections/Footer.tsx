import { Droplets, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

const links = [
  {
    title: 'Mission',
    items: ['Vision', 'Objectives', 'River Basins', 'Engineering Framework'],
  },
  {
    title: 'Implementation',
    items: ['Timeline', 'Circular Economy', 'Smart Technology', 'Governance'],
  },
  {
    title: 'Resources',
    items: ['Annexure A: River Basin Maps', 'Annexure B: STP Projections', 'Annexure C: Reuse Framework'],
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full pt-20 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[#081f25]" />

      {/* Animated topographic lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 Q300,50 600,100 T1200,100"
            fill="none"
            stroke="#5adbff"
            strokeWidth="1"
          />
          <path
            d="M0,150 Q300,100 600,150 T1200,150"
            fill="none"
            stroke="#5adbff"
            strokeWidth="1"
          />
          <path
            d="M0,200 Q300,150 600,200 T1200,200"
            fill="none"
            stroke="#5adbff"
            strokeWidth="1"
          />
          <path
            d="M0,250 Q300,200 600,250 T1200,250"
            fill="none"
            stroke="#5adbff"
            strokeWidth="1"
          />
          <path
            d="M0,300 Q300,250 600,300 T1200,300"
            fill="none"
            stroke="#5adbff"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="w-6 h-6 text-[#5adbff]" />
              <span className="font-display font-bold text-lg text-[#edffff]">
                River Restoration Mission
              </span>
            </div>
            <p className="text-sm text-[#edffff]/50 leading-relaxed mb-6 max-w-sm">
              Maharashtra Integrated River Restoration & Circular Water Economy
              Mission — A transformational infrastructure opportunity for the
              state.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#edffff]/40">
                <MapPin className="w-3.5 h-3.5" />
                <span>Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#edffff]/40">
                <Mail className="w-3.5 h-3.5" />
                <span>creds.tush@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#edffff]/40">
                <Phone className="w-3.5 h-3.5" />
                <span>+91 9607397006</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {links.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-sm text-[#edffff] mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item}>
                    <span className="text-xs text-[#edffff]/40 hover:text-[#5adbff] transition-colors cursor-pointer flex items-center gap-1">
                      {item}
                      <ExternalLink className="w-3 h-3 opacity-0 hover:opacity-100 transition-opacity" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Prepared by */}
        <div className="border-t border-white/5 pt-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs font-mono text-[#edffff]/30 uppercase tracking-widest">
                Prepared By - Tushar S Kshirsagar Mob - 9607397006 Email id - creds.tush@gmail.com
              </span>
              <p className="text-sm text-[#edffff]/60 mt-1">
                RiverFuture Maharashtra Initiative
              </p>
              <p className="text-xs text-[#edffff]/40">
                Public Infrastructure Vision for Sustainable River Restoration
                &amp; Circular Water Economy
              </p>
            </div>
            <div className="flex gap-4">
              {['Government Agencies', 'Urban Local Bodies', 'Environmental Authorities', 'Research Institutions'].map(
                (stakeholder) => (
                  <span
                    key={stakeholder}
                    className="hidden lg:inline-flex px-3 py-1 rounded-full bg-white/[0.03] text-[#edffff]/30 text-xs"
                  >
                    {stakeholder}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#edffff]/30">
            &copy; {new Date().getFullYear()} Maharashtra River Restoration
            Mission. All rights reserved.
          </p>
          <p className="text-xs text-[#edffff]/20">
            Detailed Project Report (DPR) — Confidential
          </p>
        </div>
      </div>
    </footer>
  );
}
