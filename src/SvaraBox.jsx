import { useState, useEffect, useRef } from "react";
import { earrings, shoes, rings, dress, bag } from "./assets";

const FONT_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');
  @font-face {
    font-family: 'Brittany Signature';
    src: url('/BrittanySignature.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

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
  const faceBase = {
    position: "absolute",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    boxSizing: "border-box",
  };

  return (
    <div style={{ position: "relative", width: W, height: H + D, transformStyle: "preserve-3d" }}>
      {/* BODY */}
      <div style={{ position: "absolute", top: D, width: W, height: H, transformStyle: "preserve-3d" }}>
        {/* Front */}
        <div style={{
          ...faceBase, width: W, height: H,
          background: `linear-gradient(160deg, ${G.boxFront}, #4c7071)`,
          border: `1px solid rgba(214,177,91,0.35)`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
          transform: `translateZ(${D / 2}px)`,
          display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"
        }}>
          <span style={{ fontFamily: 'Brittany Signature', color: G.gold, fontSize: W * 0.082 }}>Svara</span>
          <span style={{ fontFamily: "Montserrat, sans-serif", fontStyle: "italic", color: G.goldDim, fontSize: W * 0.036, letterSpacing: 5, marginTop: 4 }}>wear your voice</span>
          <div style={{ position: "absolute", bottom: 14, width: 34, height: 9, background: `linear-gradient(135deg,#e0b85a,${G.gold},#b08038)`, borderRadius: 3, boxShadow: "0 2px 6px rgba(0,0,0,0.5)" }} />
        </div>
        {/* Back */}
        <div style={{ ...faceBase, width: W, height: H, background: `linear-gradient(160deg, ${G.boxSide}, #4c7071)`, border: `1px solid rgba(214,177,91,0.2)`, transform: `rotateY(180deg) translateZ(${D / 2}px)` }} />
        {/* Left */}
        <div style={{ ...faceBase, width: D, height: H, background: `linear-gradient(160deg, ${G.boxSide}, #4c7071)`, border: `1px solid rgba(214,177,91,0.25)`, transform: `rotateY(-90deg) translateZ(${W / 2}px)` }} />
        {/* Right */}
        <div style={{ ...faceBase, width: D, height: H, background: `linear-gradient(160deg, ${G.boxSide}, #4c7071)`, border: `1px solid rgba(214,177,91,0.25)`, transform: `rotateY(90deg) translateZ(${W / 2}px)` }} />
        {/* Bottom */}
        <div style={{ ...faceBase, width: W, height: D, background: G.boxBottom, transform: `rotateX(-90deg) translateZ(${H}px)` }} />
        {/* Inner floor */}
        <div style={{ ...faceBase, width: W, height: D, background: `linear-gradient(180deg,#0f3028,#0a2018)`, transform: `rotateX(90deg) translateZ(0px)` }} />
      </div>

      {/* LID */}
      <div style={{
        position: "absolute", top: 0, width: W, height: D,
        transformStyle: "preserve-3d",
        transformOrigin: `center ${D}px`,
        transform: isOpen ? `rotateX(115deg)` : `rotateX(0deg)`,
        transition: "transform 1.6s cubic-bezier(0.4,0,0.15,1), opacity 0.3s ease 1.3s",
        opacity: isOpen ? 0 : 1,
      }}>
        <div style={{
          ...faceBase, width: W, height: D,
          background: `linear-gradient(160deg,${G.boxTop},#4c7071)`,
          border: `1px solid rgba(214,177,91,0.4)`,
          transform: `rotateX(90deg) translateZ(${D / 2}px)`,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ position: "absolute", width: "100%", height: 2, background: `linear-gradient(90deg,transparent,rgba(214,177,91,0.5),transparent)`, top: "50%", transform: "translateY(-50%)" }} />
          <div style={{ position: "absolute", height: "100%", width: 2, background: `linear-gradient(180deg,transparent,rgba(214,177,91,0.5),transparent)`, left: "50%", transform: "translateX(-50%)" }} />
          <svg width="56" height="30" viewBox="0 0 56 30" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
            <path d="M28 15 Q20 4 8 7 Q2 8 4 15 Q6 21 15 19 Q22 18 28 15 Z" fill="rgba(214,177,91,0.6)" stroke="rgba(214,177,91,0.8)" strokeWidth="0.8" />
            <path d="M28 15 Q36 4 48 7 Q54 8 52 15 Q50 21 41 19 Q34 18 28 15 Z" fill="rgba(214,177,91,0.6)" stroke="rgba(214,177,91,0.8)" strokeWidth="0.8" />
            <ellipse cx="28" cy="15" rx="4" ry="4" fill="rgba(214,177,91,0.9)" />
          </svg>
        </div>
        <div style={{
          ...faceBase, width: W, height: D * 0.12,
          background: `linear-gradient(160deg,${G.boxFront}, #4c7071)`,
          border: `1px solid rgba(214,177,91,0.3)`, borderTop: "none",
          transform: `translateZ(${D / 2}px)`, bottom: 0, position: "absolute"
        }}>
          <span style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", fontFamily: "Brittany Signature", fontStyle: "italic", color: "rgba(214,177,91,0.6)", fontSize: 9, letterSpacing: 4, whiteSpace: "nowrap" }}>✦ svara ✦</span>
        </div>
        <div style={{ ...faceBase, width: W, height: D * 0.12, background: G.boxSide, position: "absolute", bottom: 0, transform: `rotateY(180deg) translateZ(${D / 2}px)` }} />
        <div style={{ ...faceBase, width: D, height: D * 0.12, background: G.boxSide, position: "absolute", bottom: 0, transform: `rotateY(-90deg) translateZ(${W / 2}px)` }} />
        <div style={{ ...faceBase, width: D, height: D * 0.12, background: G.boxSide, position: "absolute", bottom: 0, transform: `rotateY(90deg) translateZ(${W / 2}px)` }} />
      </div>
    </div>
  );
}

function ProductImage({ src, alt, width, height, style = {} }) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      style={{
        width,
        height,
        objectFit: "contain",
        objectPosition: "center bottom",
        display: "block",
        userSelect: "none",
        WebkitUserSelect: "none",
        filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.55))",
        ...style,
      }}
    />
  );
}

function ItemCard({ isOpen, label, delay, targetX, targetY, children }) {
  return (
    <div style={{
      position: "absolute",
      left: "50%", top: "50%",
      transform: isOpen
        ? `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) scale(1)`
        : `translate(-50%, -50%) scale(0.05)`,
      opacity: isOpen ? 1 : 0,
      transition: `transform 1.1s cubic-bezier(0.15,0.9,0.3,1.05) ${delay}s, opacity 0.7s ease ${delay}s`,
      zIndex: 15,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      pointerEvents: "none",
    }}>
      {children}
      <span style={{
        fontFamily: "Montserrat, sans-serif",
        fontStyle: "italic",
        color: "rgba(22,63,67,0.85)",
        fontSize: 9,
        letterSpacing: 2,
        whiteSpace: "nowrap",
        opacity: isOpen ? 1 : 0,
        transition: `opacity 0.5s ease ${delay + 0.3}s`,
        textTransform: "uppercase",
        fontWeight: 500,
      }}>
        {label}
      </span>
    </div>
  );
}

function Particle({ x, y, size, duration, delay, drift }) {
  return (
    <div style={{
      position: "absolute", left: x, top: y,
      width: size, height: size, borderRadius: "50%",
      background: G.sparkle,
      animation: `svaraFloat ${duration}s ease-in ${delay}s infinite`,
      "--drift": `${drift}px`,
      opacity: 0, pointerEvents: "none",
    }} />
  );
}

const surroundStyles = `
  @keyframes svaraFloat {
    0%   { opacity:0; transform:translateY(0) translateX(0) scale(1); }
    15%  { opacity:0.85; }
    80%  { opacity:0.15; }
    100% { opacity:0; transform:translateY(-130px) translateX(var(--drift,0px)) scale(0.2); }
  }
  @keyframes svaraHeadlineIn {
    from { opacity:0; transform:translateY(-16px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes svaraSubIn {
    from { opacity:0; letter-spacing:0.5em; }
    to   { opacity:1; letter-spacing:0.35em; }
  }
`;

export default function SvaraBox() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [particles, setParticles] = useState([]);
  const particleId = useRef(0);
  const cardRef = useRef(null);
  // Track scroll position to determine direction reliably
  const lastScrollY = useRef(0);
  const isFirstIntersect = useRef(true);

  const W = isMobile ? 150 : 220;
  const H = isMobile ? 105 : 160;
  const D = isMobile ? 150 : 220;

  const imgSizes = isMobile
    ? { dress: [75, 95], bag: [70, 70], earrings: [55, 55], shoes: [82, 55], rings: [65, 54] }
    : { dress: [110, 140], bag: [100, 100], earrings: [80, 80], shoes: [120, 80], rings: [100, 84] };

  const items = isMobile
    ? [
        { key: "dress",    label: "dress",    delay: 0.55, tx:  -95, ty: -155, src: dress,    w: imgSizes.dress[0],    h: imgSizes.dress[1] },
        { key: "rings",    label: "rings",    delay: 0.62, tx:   -5, ty: -168, src: rings,    w: imgSizes.rings[0],    h: imgSizes.rings[1] },
        { key: "earrings", label: "earrings", delay: 0.70, tx:   95, ty: -145, src: earrings, w: imgSizes.earrings[0], h: imgSizes.earrings[1] },
        { key: "bag",      label: "bag",      delay: 0.85, tx:  -95, ty:  165, src: bag,      w: imgSizes.bag[0],      h: imgSizes.bag[1] },
        { key: "shoes",    label: "footwear", delay: 1.00, tx:   95, ty:  165, src: shoes,    w: imgSizes.shoes[0],    h: imgSizes.shoes[1] },
      ]
    : [
        { key: "dress",    label: "dress",    delay: 0.55, tx: -190, ty: -140, src: dress,    w: imgSizes.dress[0],    h: imgSizes.dress[1] },
        { key: "earrings", label: "earrings", delay: 0.70, tx:  190, ty: -150, src: earrings, w: imgSizes.earrings[0], h: imgSizes.earrings[1] },
        { key: "bag",      label: "bag",      delay: 0.85, tx: -200, ty:  100, src: bag,      w: imgSizes.bag[0],      h: imgSizes.bag[1] },
        { key: "shoes",    label: "footwear", delay: 1.00, tx:  195, ty:  115, src: shoes,    w: imgSizes.shoes[0],    h: imgSizes.shoes[1] },
        { key: "rings",    label: "rings",    delay: 0.62, tx:    0, ty: -180, src: rings,    w: imgSizes.rings[0],    h: imgSizes.rings[1] },
      ];

  useEffect(() => {
    if (!document.querySelector("#svara-fonts")) {
      const s = document.createElement("style");
      s.id = "svara-fonts"; s.textContent = FONT_CSS;
      document.head.appendChild(s);
    }
    if (!document.querySelector("#svara-kf")) {
      const s = document.createElement("style");
      s.id = "svara-kf"; s.textContent = surroundStyles;
      document.head.appendChild(s);
    }
  }, []);

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

  useEffect(() => {
    if (!isMobile) return;
    const onScroll = () => {
      setIsOpen(true);
      burst();
      window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  return (
    <div style={{
      width: "100vw",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      fontFamily: "Montserrat, sans-serif",
      touchAction: "manipulation",
      gap: 0,
      paddingTop: 80,
      paddingBottom: isMobile ? 32 : 48,
      boxSizing: "border-box",
    }}>

      {/* Radial light bloom */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "80%", height: "55%",
        background: "radial-gradient(ellipse at 50% 0%, rgba(255,245,200,0.42) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "80%", height: "40%",
        background: "radial-gradient(ellipse at 50% 100%, rgba(140,90,0,0.2) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Watermark */}
      <div style={{
        position: "absolute", fontSize: isMobile ? "28vw" : "20vw",
        color: "rgba(160,100,0,0.06)", top: "60%", left: "50%",
        transform: "translate(-50%,-50%)", pointerEvents: "none",
        userSelect: "none", whiteSpace: "nowrap", zIndex: 0,
      }}>SVARA</div>

      {/* Particles */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
        {particles.map(p => <Particle key={p.id} {...p} />)}
      </div>

      {/* Headline */}
      <div style={{
        position: "relative", zIndex: 20, width: "100%",
        textAlign: "center", whiteSpace: "nowrap",
        animation: "svaraHeadlineIn 1s cubic-bezier(0.2,0.8,0.3,1) 0.1s both",
        flexShrink: 0, pointerEvents: "none",
      }}>
        <div style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: isMobile ? "clamp(18px,5.5vw,26px)" : "clamp(24px,3vw,38px)",
          fontWeight: 400, color: "#1a3c3f",
          letterSpacing: "0.08em", lineHeight: 1.3,
          position: "relative", height: "1.6em", overflow: "visible",
          whiteSpace: "nowrap",
          width: isMobile ? "100%" : "min(900px, 60vw)", margin: "0 auto",
        }}>
          <div style={{
            position: "absolute", width: "100%", top: 0, left: "50%", textAlign: "center",
            transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease",
            transform: isOpen ? "translateX(calc(-50% - 120%))" : "translateX(-50%)",
            opacity: isOpen ? 0 : 1, pointerEvents: "none",
          }}>
            YOU{" "}
            <span style={{ fontStyle: "italic", fontWeight: 300, fontSize: "1.22em", letterSpacing: "0.02em" }}>×</span>
            {" "}
            <span style={{ fontFamily: "Brittany Signature", fontStyle: "italic", fontWeight: 300, fontSize: "1.22em", letterSpacing: "0.02em" }}>Svara</span>
          </div>
          <div style={{
            position: "absolute", width: "100%", top: 0, left: "50%", textAlign: "center",
            transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease",
            transform: isOpen ? "translateX(-50%)" : "translateX(calc(-50% + 120%))",
            opacity: isOpen ? 1 : 0, pointerEvents: "none",
          }}>
            <span style={{ fontFamily: "Brittany Signature", fontStyle: "italic", fontWeight: 300, fontSize: "1.22em", letterSpacing: "0.02em" }}>Svara</span>
            {" "}
            <span style={{ fontStyle: "italic", fontWeight: 300, fontSize: "1.22em", letterSpacing: "0.02em" }}>×</span>
            {" "}YOU
          </div>
        </div>
        <div style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: isMobile ? 9 : 11, letterSpacing: "0.35em", color: "#2a5254",
          marginTop: 10,
          animation: "svaraSubIn 1.2s cubic-bezier(0.2,0.8,0.3,1) 0.3s both",
        }}>WEAR YOUR VOICE</div>
      </div>

      {/* Stage */}
      <div style={{
        position: "relative", flexShrink: 0, zIndex: 10,
        width: isMobile ? "100vw" : 600,
        height: isMobile ? 600 : 520,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: isMobile ? 120 : 0,
        boxSizing: "border-box",
      }}>
        {/* Glow bloom */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: isOpen ? "translate(-50%,-50%) scale(1)" : "translate(-50%,-50%) scale(0)",
          width: isMobile ? 300 : 480, height: isMobile ? 300 : 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,210,80,0.55) 0%, rgba(214,177,91,0.25) 40%, transparent 70%)",
          opacity: isOpen ? 1 : 0,
          transition: "transform 1.2s cubic-bezier(0.2,0.8,0.3,1) 0.3s, opacity 1s ease 0.3s",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* Product items */}
        {items.map(item => (
          <ItemCard key={item.key} isOpen={isOpen} label={item.label} delay={item.delay} targetX={item.tx} targetY={item.ty}>
            <ProductImage src={item.src} alt={item.label} width={item.w} height={item.h} />
          </ItemCard>
        ))}

        {/* 3D Box — ref is here so observer watches the box itself */}
        <div
          ref={cardRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "relative", zIndex: 10,
            perspective: isMobile ? 600 : 900,
            perspectiveOrigin: "50% 40%",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <div style={{
            transformStyle: "preserve-3d",
            transform: isOpen
              ? `rotateX(14deg) rotateY(-22deg) scale(${isMobile ? 1.05 : 1.03})`
              : `rotateX(12deg) rotateY(-18deg)`,
            transition: "transform 0.5s ease",
          }}>
            <Box3D isOpen={isOpen} W={W} H={H} D={D} />
          </div>
        </div>
      </div>
    </div>
  );
}