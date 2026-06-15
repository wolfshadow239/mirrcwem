import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Wheat,
  Factory,
  Droplets,
  TreePine,
  Flower2,
  Building2,
  ShieldCheck,
  BarChart3,
  Eye,
  Waves,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Particle System ─── */
const PARTICLE_COUNT = 8000;
const ATTRACTORS = [
  new THREE.Vector3(-6, 3, 0),
  new THREE.Vector3(6, 3, 0),
  new THREE.Vector3(-6, -3, 0),
  new THREE.Vector3(6, -3, 0),
  new THREE.Vector3(0, 5, 0),
];

const COLORS = ['#5adbff', '#f87060', '#c3e5ae', '#edffff', '#8fb9a8'];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const particleData = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const delays = new Float32Array(PARTICLE_COUNT);
    const targets = new Int32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);

    const colorObj = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const attractor = ATTRACTORS[Math.floor(Math.random() * ATTRACTORS.length)];
      positions[i * 3] = attractor.x + (Math.random() - 0.5) * 1.5;
      positions[i * 3 + 1] = attractor.y + (Math.random() - 0.5) * 1.5;
      positions[i * 3 + 2] = attractor.z + (Math.random() - 0.5) * 0.5;

      colorObj.set(COLORS[Math.floor(Math.random() * COLORS.length)]);
      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;

      delays[i] = Math.random();
      targets[i] = Math.floor(Math.random() * ATTRACTORS.length);
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, delays, targets, phases };
  }, []);

  const velocities = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const colAttr = pointsRef.current.geometry.attributes.color;
    const positions = posAttr.array as Float32Array;
    const colors = colAttr.array as Float32Array;

    const mouseWorldX = mouseRef.current.x * viewport.width * 0.5;
    const mouseWorldY = mouseRef.current.y * viewport.height * 0.5;
    const mouseDist = Math.sqrt(mouseWorldX * mouseWorldX + mouseWorldY * mouseWorldY);
    const mouseInfluence = Math.max(0, 1 - mouseDist / 6);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      const target = ATTRACTORS[particleData.targets[i]];
      const delay = particleData.delays[i];
      const phase = particleData.phases[i];

      // Orbital motion around target
      const orbitRadius = 0.5 + delay * 1.5;
      const orbitSpeed = 0.3 + delay * 0.5;
      const angle = time * orbitSpeed + phase;

      let targetX = target.x + Math.cos(angle) * orbitRadius;
      let targetY = target.y + Math.sin(angle) * orbitRadius * 0.6;
      const targetZ = target.z + Math.sin(angle * 0.7) * 0.3;

      // Center pull when mouse is near
      if (mouseInfluence > 0.1) {
        const centerPull = mouseInfluence * 0.6;
        targetX = lerp(targetX, 0, centerPull);
        targetY = lerp(targetY, 0, centerPull);
      }

      // Spring physics
      const spring = 0.02;
      velocities[idx] += (targetX - positions[idx]) * spring;
      velocities[idx + 1] += (targetY - positions[idx + 1]) * spring;
      velocities[idx + 2] += (targetZ - positions[idx + 2]) * spring;

      // Damping
      velocities[idx] *= 0.95;
      velocities[idx + 1] *= 0.95;
      velocities[idx + 2] *= 0.95;

      positions[idx] += velocities[idx];
      positions[idx + 1] += velocities[idx + 1];
      positions[idx + 2] += velocities[idx + 2];

      // Pulse opacity through color intensity
      const pulse = Math.sin(time * 2 + delay * Math.PI * 2) * 0.3 + 0.7;
      const baseR = particleData.colors[idx];
      const baseG = particleData.colors[idx + 1];
      const baseB = particleData.colors[idx + 2];
      colors[idx] = baseR * pulse;
      colors[idx + 1] = baseG * pulse;
      colors[idx + 2] = baseB * pulse;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particleData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particleData.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        vertexColors
      />
    </points>
  );
}

/* ─── Main Section ─── */
const allocations = [
  { sector: 'Agriculture', percent: 30, icon: Wheat, color: '#c3e5ae', desc: 'Irrigation via treated water' },
  { sector: 'Industry', percent: 35, icon: Factory, color: '#5adbff', desc: 'Industrial process water' },
  { sector: 'Groundwater Recharge', percent: 15, icon: Droplets, color: '#8fb9a8', desc: 'Aquifer replenishment' },
  { sector: 'Ecological Release', percent: 10, icon: TreePine, color: '#f87060', desc: 'River flow maintenance' },
  { sector: 'Landscaping & Utilities', percent: 10, icon: Flower2, color: '#edffff', desc: 'Urban green spaces' },
];

const governanceItems = [
  { icon: Waves, label: 'River Management' },
  { icon: Building2, label: 'Sewage Infrastructure' },
  { icon: Droplets, label: 'Treated-Water Reuse' },
  { icon: Eye, label: 'Monitoring & Enforcement' },
  { icon: ShieldCheck, label: 'Floodplain Protection' },
  { icon: BarChart3, label: 'Public Awareness Programs' },
];

export default function CircularEconomy() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="economy"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 overflow-hidden"
    >
      {/* WebGL Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ParticleField />
        </Canvas>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2e36] via-transparent to-[#0a2e36] z-[1] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-1 bg-[#c3e5ae] rounded-full" />
            <span className="text-xs font-mono text-[#c3e5ae] uppercase tracking-widest">
              Circular Water Economy
            </span>
            <div className="w-8 h-1 bg-[#c3e5ae] rounded-full" />
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#edffff] mb-4">
            Treated Water Reuse
            <span className="text-gradient-coral"> Allocation</span>
          </h2>
          <p className="text-[#edffff]/60 max-w-2xl mx-auto">
            Maximizing every drop through strategic allocation across sectors,
            creating a sustainable closed-loop water system.
          </p>
        </div>

        {/* Allocation Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
          {allocations.map((alloc) => (
            <div
              key={alloc.sector}
              className={`glass-panel rounded-2xl p-5 transition-all duration-500 cursor-pointer ${
                hoveredSector === alloc.sector
                  ? 'scale-105 border-opacity-40'
                  : 'hover:scale-[1.02]'
              }`}
              style={{
                borderColor:
                  hoveredSector === alloc.sector
                    ? alloc.color
                    : 'rgba(255,255,255,0.08)',
              }}
              onMouseEnter={() => setHoveredSector(alloc.sector)}
              onMouseLeave={() => setHoveredSector(null)}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${alloc.color}15` }}
              >
                <alloc.icon className="w-5 h-5" style={{ color: alloc.color }} />
              </div>
              <div
                className="font-mono font-bold text-3xl mb-1"
                style={{ color: alloc.color }}
              >
                {alloc.percent}%
              </div>
              <div className="font-display font-semibold text-sm text-[#edffff] mb-1">
                {alloc.sector}
              </div>
              <div className="text-xs text-[#edffff]/50">{alloc.desc}</div>

              {/* Bar */}
              <div className="mt-4 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: hoveredSector === alloc.sector ? `${alloc.percent * 2}%` : `${alloc.percent}%`,
                    backgroundColor: alloc.color,
                    opacity: 0.7,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Governance Model */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12">
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-[#5adbff] uppercase tracking-widest">
              Proposed Governance Model
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#edffff] mt-3">
              Maharashtra River Restoration & Water Reuse Authority
              <span className="text-[#5adbff]"> (MRRWRA)</span>
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {governanceItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#5adbff]/10 flex items-center justify-center group-hover:bg-[#5adbff]/20 transition-colors">
                  <item.icon className="w-5 h-5 text-[#5adbff]" />
                </div>
                <span className="text-[#edffff]/80 text-sm font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
