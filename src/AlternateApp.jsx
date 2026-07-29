import { useEffect, useRef, useState } from "react";
import SvaraBox from "./SvaraBox";
import HowItWorks from "./HowItWorks";

function Navbar({ theme, toggleTheme }) {
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
    { name: "Contact", id: "Contact" }
  ];

  return (
    <>
      <nav className={`sv-nav${scrolled ? " scrolled" : ""}`}>
        <div className="sv-nav-logo">Svara</div>
        <div className="sv-nav-links">
          {links.map(l => <a key={l.id} href={`#${l.id.toLowerCase().replace(" ", "-")}`}>{l.name}</a>)}
        </div>
        <div className="sv-nav-actions">
          <button className="sv-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button className="sv-hamburger" onClick={() => setOpen(p => !p)}>
            {[0, 1, 2].map(i => <span key={i} />)}
          </button>
        </div>
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
        background: "var(--gradient-offcanvas)",
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
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "20px", color: "#f0eee9", letterSpacing: "0.06em" }}>
            {l.name}
          </a>
        ))}
        <button className="sv-theme-toggle sv-theme-toggle--offcanvas" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </>
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
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [contactRef, contactVis] = useReveal(0.25);


  const handleKey = (e) => { if (e.key === "Enter") handleJoin(); };
  return (
    <>
    <HowItWorks />
      {/* CTA */}
      <section id="contact" ref={ctaRef} className="cta-section">
        <div className={`cta-inner reveal${ctaVis ? " in" : ""}`}>

          {/* Ornament + label */}


          <div className="contact-card">
            <div className="contact-label">
              Join the <span className="brand-script">Svara</span> Circle
            </div>


            <div className="contact-label-row contact-label-row--onteal">
              <span className="contact-divider-line contact-divider-line--onteal" />
              <span className="contact-divider-diamond contact-divider-diamond--onteal" />
              <span className="contact-divider-line contact-divider-line--onteal" />
            </div>

            <a href="mailto:hello@svara.co" className="contact-cta">
              <span className="contact-cta-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5.5C2 4.12 3.12 3 4.5 3h15c1.38 0 2.5 1.12 2.5 2.5v13c0 1.38-1.12 2.5-2.5 2.5h-15C3.12 21 2 19.88 2 18.5v-13Zm2.5-.5L12 11.5 19.5 5H4.5Zm0 2.08V18.5h15V7.08l-7.5 5.64L4.5 7.08Z" fill="currentColor" />
                </svg>
              </span>
              <span className="contact-cta-text">Email Us</span>
              <span className="contact-cta-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>

            <a href="https://www.instagram.com/svara_ig/" className="contact-cta" target="_blank" rel="noopener noreferrer">
              <span className="contact-cta-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.75 2a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm-4.25 1.25a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" fill="currentColor" />
                </svg>
              </span>
              <span className="contact-cta-text">Interact With Us</span>
              <span className="contact-cta-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>

            <div className="contact-socials">
              <a href="https://www.linkedin.com/company/svarabengaluru/" aria-label="LinkedIn" className="contact-social-icon" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.94 5a2 2 0 1 1-4-.002A2 2 0 0 1 6.94 5ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" fill="currentColor" />
                </svg>
              </a>
              <span className="contact-social-divider" />
              <a href="https://pin.it/6EOBLEcXI" aria-label="Pinterest" className="contact-social-icon" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.498 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.564 0-2.387-1.715-4.057-4.163-4.057-2.836 0-4.498 2.126-4.498 4.323 0 .856.33 1.773.741 2.273a.3.3 0 0 1 .069.286c-.076.312-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.967-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2Z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      

      <footer style={{ background: "var(--color-primary)", padding: "60px 5% 38px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", borderTop: "1px solid var(--color-accent-gold-bright)" }}>
          <div style={{ paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.72rem", color: "var(--color-accent-gold-bright)" }}>© 2026 <span style={{ fontFamily: "'Brittany Signature', cursive" }}>Svara</span>. All rights reserved.</div>
            <div style={{ fontFamily: "Montserrat, sans-serif", fontStyle: "italic", fontSize: "0.88rem", color: "var(--color-accent-gold-bright)" }}>Wear Your Voice.</div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function AlternateApp() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("svara-theme");
    return saved || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("svara-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <br />
      <div style={{ background: "var(--gradient-body)" }}>
        <SvaraBox />
        <Footer />
      </div>
    </>
  );
}