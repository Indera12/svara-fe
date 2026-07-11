import { useState, useEffect, useRef } from "react";
import './svara-box.css';

const G = {
  gold: "#D6B15B",
  goldBright: "#F4E6A7",
  goldDim: "#D7B25A",
  sparkle: "#f0eee9",
  dark: "#0a1f20",
  deepGreen: "#163F43",
  midGreen: "#1E5A5E",
  boxFront: "#5F9EA0",
  boxSide: "#163F43",
  boxTop: "#5F9EA0",
  boxBottom: "#0a1f20",
  brown: "#7a4a22",
  brownLight: "#9a6040",
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function Box3D({ isOpen, W, H, D }) {
  return (
    <div className="svara-3d-box" style={{ "--width": W, "--height": H, "--depth": D, "--depth-half": D / 2 }}>
      {/* BODY */}
      <div className="svara-3d-box-body">
        {/* Front */}
        <div className="svara-3d-face svara-3d-face-front" style={{ width: W, height: H, transform: `translateZ(${D / 2}px)` }}>
          <span className="svara-3d-logo" style={{ fontSize: W * 0.082 }}>Svara</span>
          <span className="svara-3d-tag" style={{ letterSpacing: 5 }}>wear your voice</span>
          <div className="svara-3d-glint" />
        </div>
        {/* Back */}
        <div className="svara-3d-face svara-3d-face-back" style={{ width: W, height: H, transform: `rotateY(180deg) translateZ(${D / 2}px)` }} />
        {/* Left */}
        <div className="svara-3d-face svara-3d-face-left" style={{ width: D, height: H, transform: `rotateY(-90deg) translateZ(${W / 2}px)` }} />
        {/* Right */}
        <div className="svara-3d-face svara-3d-face-right" style={{ width: D, height: H, transform: `rotateY(90deg) translateZ(${W / 2}px)` }} />
        {/* Bottom */}
        <div className="svara-3d-face svara-3d-face-bottom" style={{ width: W, height: D, transform: `rotateX(-90deg) translateZ(${H}px)` }} />
        {/* Inner floor */}
        <div className="svara-3d-face svara-3d-face-floor" style={{ width: W, height: D, transform: `rotateX(90deg) translateZ(0px)` }} />
      </div>

      {/* LID */}
      <div
        className={`svara-lid ${isOpen ? 'svara-lid-open' : 'svara-lid-closed'}`}
        style={{ "--width": W, "--depth": D }}
      >
        <div className="svara-lid-top svara-lid-top-open" style={{ width: W, height: D }}>
          <div style={{ position: "absolute", width: "100%", height: 2, background: `linear-gradient(90deg,transparent,var(--color-overlay-gold-accent),transparent)`, top: "50%", transform: "translateY(-50%)" }} />
          <div style={{ position: "absolute", height: "100%", width: 2, background: `linear-gradient(180deg,transparent,var(--color-overlay-gold-accent-light),transparent)`, left: "50%", transform: "translateX(-50%)" }} />
          <svg width="56" height="30" viewBox="0 0 56 30" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
            <path d="M28 15 Q20 4 8 7 Q2 8 4 15 Q6 21 15 19 Q22 18 28 15 Z" fill="rgba(214,177,91,0.6)" stroke="rgba(214,177,91,0.8)" strokeWidth="0.8" />
            <path d="M28 15 Q36 4 48 7 Q54 8 52 15 Q50 21 41 19 Q34 18 28 15 Z" fill="rgba(214,177,91,0.6)" stroke="rgba(214,177,91,0.8)" strokeWidth="0.8" />
            <ellipse cx="28" cy="15" rx="4" ry="4" fill="rgba(214,177,91,0.9)" />
          </svg>
        </div>
        <div className="svara-lid-strip" style={{ "--width": W, "--depth": D }} />
        <div className="svara-3d-face" style={{ width: W, height: D * 0.12, background: G.boxSide, position: "absolute", bottom: 0, transform: `rotateY(180deg) translateZ(${D / 2}px)` }} />
        <div className="svara-3d-face" style={{ width: D, height: D * 0.12, background: G.boxSide, position: "absolute", bottom: 0, transform: `rotateY(-90deg) translateZ(${W / 2}px)` }} />
        <div className="svara-3d-face" style={{ width: D, height: D * 0.12, background: G.boxSide, position: "absolute", bottom: 0, transform: `rotateY(90deg) translateZ(${W / 2}px)` }} />
      </div>
    </div>
  );
}

/* ── SVG Items ── */

function JacketSVG({ scale = 1 }) {
  return (
    <svg width={110 * scale} height={150 * scale} viewBox="0 0 140 190">
      <defs>
        <linearGradient id="jFab" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8a5530" /><stop offset="100%" stopColor="#5e3614" />
        </linearGradient>
        <linearGradient id="jFront" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#965c38" /><stop offset="100%" stopColor="#8a5530" />
        </linearGradient>
      </defs>
      <path d="M70 3 Q70 3 75 10 Q79 17 74 22" fill="none" stroke="#D6B15B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 30 Q70 14 128 30" fill="none" stroke="#D6B15B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="30" x2="12" y2="40" stroke="#D6B15B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="128" y1="30" x2="128" y2="40" stroke="#D6B15B" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="26" y="38" width="88" height="90" rx="3" fill="url(#jFab)" />
      <path d="M26 38 L26 128 L67 128 L67 82 L52 67 L52 38 Z" fill="url(#jFront)" />
      <path d="M114 38 L114 128 L73 128 L73 82 L88 67 L88 38 Z" fill="url(#jFront)" />
      <path d="M52 38 L70 68 L88 38 L88 46 L70 72 L52 46 Z" fill="#4a2a0e" />
      <path d="M52 38 L40 54 L52 64 L70 68 Z" fill="#a86840" />
      <path d="M88 38 L100 54 L88 64 L70 68 Z" fill="#a86840" />
      <path d="M26 42 Q6 48 4 90 Q4 102 13 104 L26 104 Z" fill="url(#jFab)" />
      <path d="M114 42 Q134 48 136 90 Q136 102 127 104 L114 104 Z" fill="url(#jFab)" />
      <rect x="4" y="100" width="22" height="8" rx="2" fill="#5a340e" />
      <rect x="114" y="100" width="22" height="8" rx="2" fill="#5a340e" />
      <path d="M32 54 L40 54 L40 62 L36 66 L32 62 Z" fill="rgba(214,177,91,0.38)" />
      <rect x="28" y="126" width="84" height="13" rx="2" fill="#4e2c0a" />
      <rect x="62" y="128" width="16" height="9" rx="1" fill="#D6B15B" opacity="0.65" />
      <path d="M28 139 L28 182 Q34 192 50 192 L62 168 L62 139 Z" fill="#6a3c14" />
      <path d="M112 139 L112 182 Q106 192 90 192 L78 168 L78 139 Z" fill="#6a3c14" />
      <line x1="70" y1="139" x2="70" y2="178" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
      <rect x="74" y="40" width="24" height="15" rx="2" fill="#f0e890" opacity="0.92" />
      <text x="86" y="51" textAnchor="middle" fill="#2a1a08" fontSize="6.5" fontFamily="Brittany Signature">Svara</text>
    </svg>
  );
}

function ShoesSVG({ scale = 1 }) {
  return (
    <svg width={130 * scale} height={65 * scale} viewBox="0 0 120 60">
      <defs>
        <linearGradient id="shoeG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8a5530" /><stop offset="100%" stopColor="#5e3210" />
        </linearGradient>
      </defs>
      <path d="M2 38 Q4 20 20 18 Q30 16 35 24 L37 42 Q22 48 2 44 Z" fill="url(#shoeG)" />
      <path d="M2 38 Q4 20 20 18 Q30 16 35 24" fill="none" stroke="#4a2c10" strokeWidth="1.2" />
      <path d="M14 18 Q24 14 33 19" fill="none" stroke="#4a2c10" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20 17 L22 12 L27 14" fill="none" stroke="#a86840" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 44 Q20 50 37 42 L37 46 Q20 52 2 47 Z" fill="#1e1008" />
      <path d="M83 42 Q81 24 97 20 Q112 18 117 28 L117 42 Q102 48 83 44 Z" fill="url(#shoeG)" />
      <path d="M83 40 Q85 22 100 20 Q110 18 115 25" fill="none" stroke="#4a2c10" strokeWidth="1.2" />
      <path d="M96 19 Q106 15 113 21" fill="none" stroke="#4a2c10" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M100 18 L102 13 L107 15" fill="none" stroke="#a86840" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M83 44 Q102 50 117 42 L117 46 Q102 52 83 47 Z" fill="#1e1008" />
    </svg>
  );
}

function BanglesSVG({ scale = 1 }) {
  return (
    <svg width={70 * scale} height={75 * scale} viewBox="0 0 60 72">
      {[
        { cy: 14, rx: 22, ry: 7, stroke: "#e0c060", sw: 4 },
        { cy: 24, rx: 22, ry: 7, stroke: "#D6B15B", sw: 4 },
        { cy: 34, rx: 22, ry: 7, stroke: "#D6B15B", sw: 3.5 },
        { cy: 43, rx: 22, ry: 6.5, stroke: "#8a5530", sw: 3 },
        { cy: 51, rx: 22, ry: 6, stroke: "#D7B25A", sw: 2.5 },
      ].map((b, i) => (
        <g key={i}>
          <ellipse cx="30" cy={b.cy} rx={b.rx} ry={b.ry} fill="none" stroke={b.stroke} strokeWidth={b.sw} />
          <ellipse cx="30" cy={b.cy} rx={b.rx} ry={b.ry} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1} strokeDasharray="4,8" />
          <circle cx={30 - b.rx + 2} cy={b.cy} r="2" fill="rgba(255,255,255,0.35)" />
        </g>
      ))}
    </svg>
  );
}

function EarringSVG({ scale = 1 }) {
  return (
    <svg width={36 * scale} height={70 * scale} viewBox="0 0 36 80">
      <path d="M18 5 Q24 5 25 11 Q26 18 21 23" fill="none" stroke="#D6B15B" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="21" y1="23" x2="18" y2="31" stroke="#D6B15B" strokeWidth="1.4" />
      <path d="M18 31 Q10 39 13 52 Q15 59 18 59 Q21 59 23 52 Q26 39 18 31 Z" fill="#7a4018" stroke="#D6B15B" strokeWidth="1" />
      <line x1="18" y1="32" x2="18" y2="58" stroke="#D6B15B" strokeWidth="0.7" strokeDasharray="2,2.5" />
      <line x1="13" y1="42" x2="23" y2="46" stroke="rgba(214,177,91,0.4)" strokeWidth="0.6" />
      <circle cx="12" cy="38" r="2.5" fill="#D6B15B" opacity="0.8" />
      <circle cx="24" cy="41" r="2.5" fill="#D6B15B" opacity="0.8" />
      <circle cx="12" cy="50" r="2" fill="#D6B15B" opacity="0.6" />
      <circle cx="24" cy="53" r="2" fill="#D6B15B" opacity="0.6" />
      <circle cx="18" cy="64" r="5" fill="#D6B15B" />
      <circle cx="15.5" cy="61.5" r="1.8" fill="rgba(255,255,255,0.45)" />
    </svg>
  );
}

function PendantSVG({ scale = 1 }) {
  return (
    <svg width={60 * scale} height={90 * scale} viewBox="0 0 60 90">
      <path d="M30 5 Q40 10 45 25 Q50 40 42 55 Q36 68 30 80 Q24 68 18 55 Q10 40 15 25 Q20 10 30 5 Z" fill="rgba(100,40,10,0.7)" stroke="#D6B15B" strokeWidth="1.2" />
      <path d="M30 5 Q38 15 40 30 Q42 45 35 58 Q33 65 30 73" fill="none" stroke="rgba(214,177,91,0.35)" strokeWidth="1" strokeDasharray="3,4" />
      <path d="M22 20 Q30 18 38 22" fill="none" stroke="rgba(214,177,91,0.4)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M18 35 Q30 32 42 37" fill="none" stroke="rgba(214,177,91,0.3)" strokeWidth="1" strokeLinecap="round" />
      <path d="M17 50 Q30 47 43 52" fill="none" stroke="rgba(214,177,91,0.25)" strokeWidth="1" strokeLinecap="round" />
      <circle cx="30" cy="5" r="3" fill="#D6B15B" opacity="0.8" />
    </svg>
  );
}

/* ── Particle ── */
function Particle({ x, y, size, duration, delay, drift }) {
  return (
    <div
      className="svara-particle"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        animation: `svaraFloat ${duration}s ease-in ${delay}s infinite`,
        "--drift": `${drift}px`,
      }}
    />
  );
}

/* ── Item Card ── */
function ItemCard({ isOpen, label, delay, targetX, targetY, children }) {
  return (
    <div
      className={`svara-item-card ${isOpen ? 'svara-item-card-active' : ''}`}
      style={{
        "--target-x": targetX,
        "--target-y": targetY,
        transition: `transform 1.1s cubic-bezier(0.15,0.9,0.3,1.05) ${delay}s, opacity 0.7s ease ${delay}s`,
      }}
    >
      {children}
      <span
        className="svara-item-label"
        style={{
          opacity: isOpen ? 1 : 0,
          transition: `opacity 0.5s ease ${delay + 0.3}s`,
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Main Component ── */
export default function SvaraBox() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [particles, setParticles] = useState([]);
  const particleId = useRef(0);
  const cardRef = useRef(null);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const scrollDir = useRef(null);
  const isFirstIntersect = useRef(true);

  const W = isMobile ? 150 : 220;
  const H = isMobile ? 110 : 160;
  const D = isMobile ? 150 : 220;

  const svgScale = isMobile ? 0.65 : 1;

  const items = isMobile
    ? [
        { key: "jacket",  label: "jacket + shorts", delay: 0.55, tx: -105, ty: -105, svg: <JacketSVG scale={svgScale} /> },
        { key: "earring", label: "earring",          delay: 0.75, tx:  105, ty: -100, svg: <EarringSVG scale={svgScale} /> },
        { key: "pendant", label: "pendant",          delay: 0.85, tx: -115, ty:   60, svg: <PendantSVG scale={svgScale} /> },
        { key: "bangles", label: "bangles",          delay: 0.65, tx:    0, ty: -130, svg: <BanglesSVG scale={svgScale} /> },
        { key: "shoes",   label: "loafers",          delay: 1.15, tx:  110, ty:   80, svg: <ShoesSVG scale={svgScale} /> },
      ]
    : [
        { key: "jacket",  label: "jacket + shorts", delay: 0.55, tx: -190, ty: -130, svg: <JacketSVG scale={svgScale} /> },
        { key: "earring", label: "earring",          delay: 0.75, tx:  185, ty: -140, svg: <EarringSVG scale={svgScale} /> },
        { key: "pendant", label: "pendant",          delay: 0.85, tx: -200, ty:   90, svg: <PendantSVG scale={svgScale} /> },
        { key: "bangles", label: "bangles",          delay: 0.65, tx:    0, ty: -170, svg: <BanglesSVG scale={svgScale} /> },
        { key: "shoes",   label: "loafers",          delay: 1.15, tx:  190, ty:  110, svg: <ShoesSVG scale={svgScale} /> },
      ];

  useEffect(() => {
    const interval = setInterval(() => {
      const id = particleId.current++;
      setParticles(prev => [...prev.slice(-25), {
        id,
        x: `${20 + Math.random() * 60}%`,
        y: `${30 + Math.random() * 40}%`,
        size: 1.5 + Math.random() * 2,
        duration: 4 + Math.random() * 4,
        delay: 0,
        drift: (Math.random() - 0.5) * 30,
      }]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const burst = () => {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const id = particleId.current++;
        setParticles(prev => [...prev.slice(-35), {
          id,
          x: `${40 + Math.random() * 20}%`,
          y: `${30 + Math.random() * 25}%`,
          size: 2 + Math.random() * 3,
          duration: 1.8 + Math.random() * 2,
          delay: 0,
          drift: (Math.random() - 0.5) * 60,
        }]);
      }, i * 60);
    }
  };

  const handleMouseEnter = () => { if (!isMobile) { burst(); setIsOpen(true); } };
  const handleMouseLeave = () => { if (!isMobile) setIsOpen(false); };

  const handleTap = () => {
    if (!isMobile) return;
    burst();
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    if (!isMobile || !cardRef.current) return;

    lastScrollY.current = window.scrollY;
    scrollDir.current = null;

    const handleScroll = () => {
      const y = window.scrollY;
      if (y < lastScrollY.current) scrollDir.current = 'up';
      else if (y > lastScrollY.current) scrollDir.current = 'down';
      lastScrollY.current = y;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const yNow = window.scrollY;
        if (yNow < lastScrollY.current) scrollDir.current = 'up';
        else if (yNow > lastScrollY.current) scrollDir.current = 'down';
        lastScrollY.current = yNow;

        if (entry.isIntersecting) {
          if (isFirstIntersect.current) {
            isFirstIntersect.current = false;
            return;
          }

          if (scrollDir.current === 'up') {
            setIsOpen(true);
            burst();
          }
        } else {
          setIsOpen(false);
        }
      },
      { threshold: 0.5 }
    );

    window.addEventListener('scroll', handleScroll, { passive: true });
    observer.observe(cardRef.current);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [isMobile]);

  return (
    <div className="svara-box-container" style={{ gap: 0, paddingTop: 80, paddingBottom: isMobile ? 32 : 48 }}>
      {/* Radial light bloom top-center */}
      <div className="svara-bloom-top" />
      <div className="svara-bloom-bottom" />

      {/* Watermark */}
      <div className={`svara-watermark ${isMobile ? 'svara-watermark-mobile' : ''}`}>SVARA</div>

      {/* Particles */}
      <div className="svara-particles">
        {particles.map(p => <Particle key={p.id} {...p} />)}
      </div>

      {/* Headline */}
      <div className="svara-headline svara-headline-animate">
        <div className={`svara-headline-text ${isMobile ? 'svara-headline-text-mobile' : 'svara-headline-text-desktop'}`}>
          <div className={`svara-headline-slide ${isOpen ? 'svara-headline-slide-in' : 'svara-headline-slide-out'}`}>
            YOU{" "}
            <span className="svara-headline-italic">×</span>
            {" "}
            <span style={{ fontFamily: "Brittany Signature" }} className="svara-headline-italic">Svara</span>
          </div>
          <div className={`svara-headline-slide ${isOpen ? 'svara-headline-slide-active' : 'svara-headline-slide-in'}`}>
            <span style={{ fontFamily: "Brittany Signature" }} className="svara-headline-italic">Svara</span>
            {" "}
            <span className="svara-headline-italic">×</span>
            {" "}YOU
          </div>
        </div>
        <div className={`svara-subtext ${isMobile ? 'svara-subtext-mobile' : ''} svara-subtext-animate`}>
          WEAR YOUR VOICE
        </div>
      </div>

      {/* Stage */}
      <div className={`svara-stage ${isMobile ? 'svara-stage-mobile' : 'svara-stage-desktop'}`}>
        {/* Glow bloom */}
        <div className={`svara-glow-bloom ${isOpen ? 'svara-glow-bloom-active' : ''}`} />

        {/* Items */}
        {items.map(item => (
          <ItemCard key={item.key} isOpen={isOpen} label={item.label} delay={item.delay} targetX={item.tx} targetY={item.ty}>
            {item.svg}
          </ItemCard>
        ))}

        {/* 3D Box */}
        <div
          ref={cardRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTap}
          className="svara-box-wrapper"
          style={{
            perspective: isMobile ? 600 : 900,
            perspectiveOrigin: "50% 40%",
          }}
        >
          <div className={`svara-box-transform ${isOpen ? 'svara-box-transform-open' : 'svara-box-transform-closed'}`}>
            <Box3D isOpen={isOpen} W={W} H={H} D={D} />
          </div>
        </div>
      </div>
    </div>
  );
}