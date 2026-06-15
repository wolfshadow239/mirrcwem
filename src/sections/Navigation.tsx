import { useState, useEffect } from 'react';
import { Droplets, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Vision', href: '#vision' },
  { label: 'Objectives', href: '#objectives' },
  { label: 'Basins', href: '#basins' },
  { label: 'Engineering', href: '#engineering' },
  { label: 'Economy', href: '#economy' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Impact', href: '#impact' },
];

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="glass-panel border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2 group">
              <Droplets className="w-5 h-5 text-[#5adbff] group-hover:text-[#f87060] transition-colors" />
              <span className="font-display font-bold text-sm text-[#edffff] tracking-tight">
                River Restoration
              </span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="px-3 py-2 text-xs font-medium text-[#edffff]/70 hover:text-[#5adbff] rounded-full transition-all duration-300 hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              className="md:hidden text-[#edffff] p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#0a2e36]/95 backdrop-blur-xl">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="block px-3 py-2 text-sm text-[#edffff]/70 hover:text-[#5adbff] rounded-lg transition-colors hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
