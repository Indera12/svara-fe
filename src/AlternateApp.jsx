import { useEffect, useRef, useState } from "react";
import SvaraBox from "./SvaraBox";

// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);
//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", fn, { passive:true });
//     return () => window.removeEventListener("scroll", fn);
//   }, []);
// //   const links = ["Collections","Philosophy","The Box","Stories","Contact"];
// const links = [{
//     name:"Book Your Box", id:"Book"
// },
// {
//     name:"Contact", id:"Contact"
// }];
//   return (
//     <nav className={`sv-nav${scrolled ? " scrolled" : ""}`}>
//       <div className="sv-nav-logo">Svara</div>
//       <div className="sv-nav-links">
//         {links.map(l => <a key={l.id} href={`#${l.id.toLowerCase().replace(" ","-")}`}>{l.name}</a>)}
//         {/* <button className="sv-nav-btn">Shop Now</button> */}
//       </div>
//       <button className="sv-hamburger" onClick={() => setOpen(p => !p)}>
//         {[0,1,2].map(i => <span key={i} />)}
//       </button>
//       {open && (
//         <div style={{ position:"fixed",inset:0,background:"#0a1208",zIndex:300,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:40 }}>
//           <button onClick={() => setOpen(false)} style={{ position:"absolute",top:24,right:24,background:"none",border:"none",color:"#e8dcc8",fontSize:"1.5rem",cursor:"pointer" }}>✕</button>
//           {links.map(l => (
//             <a key={l.id} href={`#${l.id.toLowerCase().replace(" ","-")}`} onClick={() => setOpen(false)}
//               style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"2.8rem",fontStyle:"italic",color:"#e8dcc8",letterSpacing:"0.06em" }}>
//               {l.name}
//             </a>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// }
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { name: "Book Your Box", id: "Book" },
    { name: "Contact", id: "Contact" }
  ];

  return (
    <>
      <nav className={`sv-nav${scrolled ? " scrolled" : ""}`}>
        <div className="sv-nav-logo">Svara</div>
        <div className="sv-nav-links">
          {links.map(l => <a key={l.id} href={`#${l.id.toLowerCase().replace(" ", "-")}`}>{l.name}</a>)}
        </div>
        <button className="sv-hamburger" onClick={() => setOpen(p => !p)}>
          {[0, 1, 2].map(i => <span key={i} />)}
        </button>
      </nav>

      {/* Backdrop — outside nav */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 300
          }}
        />
      )}

      {/* Offcanvas — outside nav */}
      <div style={{
        position: "fixed", top: 0, right: 0,
        width: "min(300px, 80vw)", height: "100%",
        background: "#0a1208",
        zIndex: 350,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 40,
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)"
      }}>
        <button
          onClick={() => setOpen(false)}
          style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: "#e8dcc8", fontSize: "1.5rem", cursor: "pointer" }}
        >✕</button>
        {links.map(l => (
          <a key={l.id} href={`#${l.id.toLowerCase().replace(" ", "-")}`} onClick={() => setOpen(false)}
            style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontStyle: "italic", color: "#e8dcc8", letterSpacing: "0.06em" }}>
            {l.name}
          </a>
        ))}
      </div>
    </>
  );
}
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  return (
    <section id="hero" style={{ minHeight: "100vh", background: `radial-gradient(ellipse 85% 85% at 50% 58%, #0d2e33 0%, #071a1e 55%, #030a0b 100%)`, position: "relative", overflow: "hidden", paddingTop: 70 }}>
      <div>
        {/* LEFT */}
        <div className="d-flex justify-content-center pt-2">
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(3.7rem,5.5vw,6rem)", lineHeight: 0.92, color: "#e8dcc8", marginTop: 32, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(40px)", transition: "all 1s ease 0.2s" }}>
            Wear.
            <em className="mx-3" style={{ fontStyle: "italic", color: "#5f9ea0" }}>Your.</em>
            Voice.
          </h1>
        </div>

        {/* RIGHT — 3D Box + cards */}
        <SvaraBox />

      </div>
    </section>
  );
}
function Marquee() {
  const words = ["Complete Wardrobes", "Wear Your Voice", "Intentional Living", "Ready Always", "The Box Experience", "Curated Confidence"];
  const items = [...words, ...words, ...words];
  return (
    <div style={{ background: "#c5ac6e", padding: "13px 0", overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 56, width: "max-content", animation: "marqueeScroll 22s linear infinite" }}>
        {items.map((w, i) => (
          <span key={i} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.05rem", fontStyle: "italic", color: "#0a1208", whiteSpace: "nowrap", letterSpacing: "0.04em" }}>
            {w} <span style={{ opacity: 0.35 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); io.disconnect(); }
    }, { threshold });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, vis];
}
function Footer() {
  const [ctaRef, ctaVis] = useReveal();
  const [contactRef, contactVis] = useReveal();
  const [email, setEmail] = useState("");
  const handleJoin = async () => {
    try {
      const response = await fetch("https://svara-be.onrender.com/book-box", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);

        alert(data.message);

        setEmail("");
      }

    } catch (err) {
      console.log(err);

      alert("Something went wrong");
    }
  };
  return (
    <>
      {/* CTA */}
      <section id="book" ref={ctaRef} style={{ background: "#080f10", padding: "130px 5%", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(95,158,160,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div className={`reveal${ctaVis ? " in" : ""}`} style={{ maxWidth: 660, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "#c5ac6e", marginBottom: 22 }}>Join the SVARA Circle</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,4.5vw,4.8rem)", fontWeight: 300, color: "#e8dcc8", lineHeight: 1.05, marginBottom: 22 }}>
            Be the first to<br /><em style={{ color: "#c5ac6e" }}>step forward.</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", lineHeight: 1.85, color: "rgba(232,220,200,0.4)", marginBottom: 44 }}>
            Early access to new edits. Stories behind the curation. The life of SVARA — delivered to you.
          </p>
          <div style={{ display: "flex", maxWidth: 460, margin: "0 auto", border: "1px solid rgba(95,158,160,0.35)", borderRadius: 50, overflow: "hidden" }}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address"
              style={{ flex: 1, padding: "15px 22px", background: "transparent", border: "none", outline: "none", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#e8dcc8" }} />
            <button style={{ padding: "15px 26px", background: "#5f9ea0", border: "none", color: "#e8dcc8", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, transition: "background 0.3s", whiteSpace: "nowrap" }}
              onMouseEnter={e => e.target.style.background = "#4a8a6e"}
              onMouseLeave={e => e.target.style.background = "#5f9ea0"}
              onClick={handleJoin}>
              Join
            </button>
          </div>
        </div>
      </section>
      <section id="contact" ref={contactRef} className="contact-section">
        <div className="contact-bg-radial" />

        <div className={`contact-grid reveal${contactVis ? " in" : ""}`}>
          <div>
            <div className="contact-label">Contact</div>
            <h2 className="contact-heading">
              Let's build your<br />
              <em>SVARA experience.</em>
            </h2>
            <p className="contact-description">
              Reach out for bespoke wardrobe curation, press inquiries, or custom
              styling. We respond to every note with the same care we put into our
              packaging.
            </p>
          </div>

          <div className="contact-card">
            <div className="contact-card-title">Join the Experience</div>

            <a href="mailto:hello@svara.co" className="contact-cta">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8 }}>
                <path d="M2 5.5C2 4.12 3.12 3 4.5 3h15c1.38 0 2.5 1.12 2.5 2.5v13c0 1.38-1.12 2.5-2.5 2.5h-15C3.12 21 2 19.88 2 18.5v-13Zm2.5-.5L12 11.5 19.5 5H4.5Zm0 2.08V18.5h15V7.08l-7.5 5.64L4.5 7.08Z" fill="currentColor" />
              </svg>
              <span className="mx-1">Email Us</span>
            </a>
            <a href="https://www.instagram.com/svara_ig/" className="contact-cta" target="_blank" rel="noopener noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.75 2a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm-4.25 1.25a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" fill="currentColor" />
              </svg>
              <span className="mx-2">Interact With Us</span>
            </a>

            <div className="contact-socials">
              {[
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/company/svarabengaluru/",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.94 5a2 2 0 1 1-4-.002A2 2 0 0 1 6.94 5ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" fill="currentColor" />
                    </svg>
                  ),
                },
                {
                  label: "Pinterest",
                  href: " https://pin.it/6EOBLEcXI",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.498 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.564 0-2.387-1.715-4.057-4.163-4.057-2.836 0-4.498 2.126-4.498 4.323 0 .856.33 1.773.741 2.273a.3.3 0 0 1 .069.286c-.076.312-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.967-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2Z" fill="currentColor" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <a key={item.label} href={item.href} aria-label={item.label} className="contact-social-icon" target="_blank" rel="noopener noreferrer">
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: "#060c0d", padding: "60px 5% 38px", borderTop: "1px solid rgba(95,158,160,0.1)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ borderTop: "1px solid rgba(232,220,200,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "rgba(232,220,200,0.2)" }}>© 2026 SVARA. All rights reserved.</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "0.88rem", color: "rgba(197,172,110,0.35)" }}>Wear Your Voice.</div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ─── APP ─────────────────────────────────────────────────────────── */
export default function AlternateApp() {
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <Footer />
    </>
  );
}