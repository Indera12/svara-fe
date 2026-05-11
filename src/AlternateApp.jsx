import SvaraBox from "./SvaraBox";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
//   const links = ["Collections","Philosophy","The Box","Stories","Contact"];
const links = [{
    name:"Book Your Box", id:"Book"
},
{
    name:"Contact", id:"Contact"
}];
  return (
    <nav className={`sv-nav${scrolled ? " scrolled" : ""}`}>
      <div className="sv-nav-logo">Svara</div>
      <div className="sv-nav-links">
        {links.map(l => <a key={l.id} href={`#${l.id.toLowerCase().replace(" ","-")}`}>{l.name}</a>)}
        {/* <button className="sv-nav-btn">Shop Now</button> */}
      </div>
      <button className="sv-hamburger" onClick={() => setOpen(p => !p)}>
        {[0,1,2].map(i => <span key={i} />)}
      </button>
      {open && (
        <div style={{ position:"fixed",inset:0,background:"#0a1208",zIndex:300,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:40 }}>
          <button onClick={() => setOpen(false)} style={{ position:"absolute",top:24,right:24,background:"none",border:"none",color:"#e8dcc8",fontSize:"1.5rem",cursor:"pointer" }}>✕</button>
          {links.map(l => (
            <a key={l.id} href={`#${l.id.toLowerCase().replace(" ","-")}`} onClick={() => setOpen(false)}
              style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"2.8rem",fontStyle:"italic",color:"#e8dcc8",letterSpacing:"0.06em" }}>
              {l.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  return (
    <section id="hero" style={{ minHeight:"100vh",background: `radial-gradient(ellipse 85% 85% at 50% 58%, #102419 0%, #071410 55%, #030908 100%)`,position:"relative",overflow:"hidden",paddingTop:70 }}>    
      <div>
        {/* LEFT */}
        <div className="d-flex justify-content-center pt-2">
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:"clamp(3.7rem,5.5vw,6rem)",lineHeight:0.92,color:"#e8dcc8",marginTop:32,opacity:loaded?1:0,transform:loaded?"none":"translateY(40px)",transition:"all 1s ease 0.2s" }}>
            Wear.
            <em className="mx-3" style={{ fontStyle:"italic",color:"#c5ac6e" }}>Your.</em>
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
  const words = ["Complete Wardrobes","Wear Your Voice","Intentional Living","Ready Always","The Box Experience","Curated Confidence"];
  const items = [...words,...words,...words];
  return (
    <div style={{ background:"#c5ac6e",padding:"13px 0",overflow:"hidden" }}>
      <div style={{ display:"flex",gap:56,width:"max-content",animation:"marqueeScroll 22s linear infinite" }}>
        {items.map((w,i) => (
          <span key={i} style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.05rem",fontStyle:"italic",color:"#0a1208",whiteSpace:"nowrap",letterSpacing:"0.04em" }}>
            {w} <span style={{ opacity:0.35 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
function Footer() {
  const [ctaRef, ctaVis] = useReveal();
  const [contactRef, contactVis] = useReveal();
  const [email, setEmail] = useState("");
  const handleJoin = async() => {
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
      <section id="book" ref={ctaRef} style={{ background:"#0a1208",padding:"130px 5%",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(61,122,94,0.08) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div className={`reveal${ctaVis?" in":""}`} style={{ maxWidth:660,margin:"0 auto",textAlign:"center" }}>
          <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"0.68rem",letterSpacing:"0.45em",textTransform:"uppercase",color:"#c5ac6e",marginBottom:22 }}>Join the SVARA Circle</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.2rem,4.5vw,4.8rem)",fontWeight:300,color:"#e8dcc8",lineHeight:1.05,marginBottom:22 }}>
            Be the first to<br /><em style={{ color:"#c5ac6e" }}>step forward.</em>
          </h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"0.9rem",lineHeight:1.85,color:"rgba(232,220,200,0.4)",marginBottom:44 }}>
            Early access to new edits. Stories behind the curation. The life of SVARA — delivered to you.
          </p>
          <div style={{ display:"flex",maxWidth:460,margin:"0 auto",border:"1px solid rgba(61,122,94,0.35)",borderRadius:50,overflow:"hidden" }}>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email address"
              style={{ flex:1,padding:"15px 22px",background:"transparent",border:"none",outline:"none",fontFamily:"'DM Sans',sans-serif",fontSize:"0.85rem",color:"#e8dcc8" }} />
            <button style={{ padding:"15px 26px",background:"#3d7a5e",border:"none",color:"#e8dcc8",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"0.72rem",letterSpacing:"0.2em",textTransform:"uppercase",fontWeight:500,transition:"background 0.3s",whiteSpace:"nowrap" }}
              onMouseEnter={e=>e.target.style.background="#4a8a6e"}
              onMouseLeave={e=>e.target.style.background="#3d7a5e"}
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
      <div className="contact-card-title">Say hello</div>
      <div className="contact-card-email">hello@svara.co</div>

      <a href="mailto:hello@svara.co" className="contact-cta">
        Email Us
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
            label: "Email",
            href: "mailto:hello@svara.co",
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6.5C4 5.67 4.67 5 5.5 5h13c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-11Zm1.33.5L12 12.05l6.67-5.05H5.33Zm12.17 9.5V8.42l-6.17 4.67a.75.75 0 0 1-.84 0L6.5 8.42V16.5h11Zm-11.34 0V8.42l5.17 3.92 5.17-3.92V16.5h-10.34Z" fill="currentColor" />
              </svg>
            ),
          },
        ].map((item) => (
          <a key={item.label} href={item.href} aria-label={item.label} className="contact-social-icon">
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  </div>
</section>

      <footer style={{ background:"#060c05",padding:"60px 5% 38px",borderTop:"1px solid rgba(61,122,94,0.1)" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <div style={{ borderTop:"1px solid rgba(232,220,200,0.06)",paddingTop:28,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12 }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"0.72rem",color:"rgba(232,220,200,0.2)" }}>© 2026 SVARA. All rights reserved.</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"0.88rem",color:"rgba(197,172,110,0.35)" }}>Wear Your Voice.</div>
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