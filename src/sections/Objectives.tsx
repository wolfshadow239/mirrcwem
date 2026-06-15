import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Shield,
  Factory,
  Route,
  Leaf,
  RefreshCw,
  Waves,
  Users,
  AlertTriangle,
  Building2,
  MapPinned,
  Gauge,
  Unlink,
} from 'lucide-react';
import './app.css'; // Make sure this path is correct for your project structure

gsap.registerPlugin(ScrollTrigger);

const primaryObjectives = [
  { icon: Shield, text: 'Prevent untreated sewage from entering ecological rivers' },
  { icon: Factory, text: 'Establish regional high-capacity STP infrastructure' },
  { icon: Route, text: 'Develop engineered secondary wastewater corridors' },
  { icon: Leaf, text: 'Restore river biodiversity and ecological flows' },
  { icon: RefreshCw, text: 'Enable reuse of treated wastewater' },
  { icon: Waves, text: 'Improve groundwater recharge and flood management' },
  { icon: Users, text: 'Build public participation and environmental awareness' },
];

const challenges = [
  { icon: AlertTriangle, title: 'Untreated Sewage', desc: 'Large volumes of municipal sewage discharged into rivers daily' },
  { icon: Building2, title: 'Industrial Pollution', desc: 'Industrial belts release chemical contaminants into river systems' },
  { icon: MapPinned, title: 'Floodplain Encroachment', desc: 'Urban development has narrowed natural river corridors' },
  { icon: Gauge, title: 'Inadequate STP Capacity', desc: 'Many existing STPs operate below required standards' },
  { icon: Unlink, title: 'Weak Reuse Infrastructure', desc: 'Treated wastewater reuse remains limited across sectors' },
  { icon: Shield, title: 'Fragmented Governance', desc: 'Multiple agencies manage fragmented components of water systems' },
];

export default function Objectives() {
  const sectionRef = useRef(null);
  const objRef = useRef(null);
  const chalRef = useRef(null);

  useEffect(() => {
    // Add error handling for GSAP
    try {
      const ctx = gsap.context(() => {
        const objCards = objRef.current?.querySelectorAll('.obj-card');
        if (objCards && objCards.length > 0) {
          gsap.from(objCards, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: objRef.current,
              start: 'top 80%',
            },
          });
        }

        const chalCards = chalRef.current?.querySelectorAll('.chal-card');
        if (chalCards && chalCards.length > 0) {
          gsap.from(chalCards, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: chalRef.current,
              start: 'top 80%',
            },
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    } catch (error) {
      console.error('GSAP animation error:', error);
    }
  }, []);

  return (
    <section id="objectives" ref={sectionRef} style={styles.section}>
      <div style={styles.container}>
        {/* Restored River Image */}
        <img 
          src="/restored_river.jpg" 
          alt="Restored River" 
          style={styles.image}
          onError={(e) => {
            console.error('Image failed to load:', e);
            e.target.style.display = 'none';
          }}
        />

        {/* Primary Objectives */}
        <div style={styles.objectivesGrid}>
          <div style={styles.labelContainer}>
            <div style={{...styles.labelLine, backgroundColor: '#5adbff'}} />
            <span style={{...styles.labelText, color: '#5adbff'}}>Primary Objectives</span>
          </div>
          <h2 style={styles.title}>
            Seven Pillars of <span style={styles.gradientTeal}>Transformation</span>
          </h2>

          <div ref={objRef} style={styles.cardsGrid}>
            {primaryObjectives.map((obj, i) => {
              const IconComponent = obj.icon;
              return (
                <div key={i} style={styles.objCard}>
                  <div style={styles.objIcon}>
                    <IconComponent size={20} color="#5adbff" />
                  </div>
                  <p style={styles.objText}>{obj.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Challenges */}
        <div>
          <div style={styles.labelContainer}>
            <div style={{...styles.labelLine, backgroundColor: '#f87060'}} />
            <span style={{...styles.labelText, color: '#f87060'}}>Current Challenges</span>
          </div>
          <h2 style={styles.title}>
            Major Problems <span style={styles.gradientCoral}>Facing Rivers</span>
          </h2>

          <div ref={chalRef} style={styles.cardsGrid}>
            {challenges.map((ch, i) => {
              const IconComponent = ch.icon;
              return (
                <div key={i} style={styles.chalCard}>
                  <div style={styles.chalGlow} />
                  <div style={styles.chalContent}>
                    <div style={styles.chalIcon}>
                      <IconComponent size={20} color="#f87060" />
                    </div>
                    <h3 style={styles.chalTitle}>{ch.title}</h3>
                    <p style={styles.chalDesc}>{ch.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Inline styles as fallback
const styles = {
  section: {
    position: 'relative',
    width: '100%',
    padding: '96px 0',
    background: '#0a2e36',
  },
  container: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
  },
  image: {
    width: '100%',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    marginBottom: '80px',
  },
  objectivesGrid: {
    marginBottom: '80px',
  },
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  labelLine: {
    width: '32px',
    height: '4px',
    borderRadius: '999px',
  },
  labelText: {
    fontSize: '12px',
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  title: {
    fontWeight: 900,
    fontSize: '36px',
    color: '#edffff',
    marginBottom: '48px',
  },
  gradientTeal: {
    background: 'linear-gradient(to right, #5adbff, #00ff88)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  gradientCoral: {
    background: 'linear-gradient(to right, #f87060, #ff6b6b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px',
  },
  objCard: {
    background: 'rgba(237, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(237, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    transition: 'all 0.5s',
    cursor: 'pointer',
  },
  objIcon: {
    flexShrink: 0,
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    background: 'rgba(90, 219, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s',
  },
  objText: {
    color: 'rgba(237, 255, 255, 0.8)',
    fontSize: '14px',
    lineHeight: '1.5',
    paddingTop: '8px',
  },
  chalCard: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '12px',
    padding: '24px',
    background: 'linear-gradient(to bottom right, rgba(248, 112, 96, 0.1), transparent)',
    border: '1px solid rgba(248, 112, 96, 0.15)',
    transition: 'all 0.5s',
    cursor: 'pointer',
  },
  chalGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '80px',
    height: '80px',
    background: 'rgba(248, 112, 96, 0.05)',
    borderRadius: '50%',
    filter: 'blur(40px)',
  },
  chalContent: {
    position: 'relative',
    zIndex: 10,
  },
  chalIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    background: 'rgba(248, 112, 96, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  chalTitle: {
    fontWeight: 700,
    fontSize: '18px',
    color: '#edffff',
    marginBottom: '8px',
  },
  chalDesc: {
    color: 'rgba(237, 255, 255, 0.6)',
    fontSize: '14px',
    lineHeight: '1.5',
  },
};
