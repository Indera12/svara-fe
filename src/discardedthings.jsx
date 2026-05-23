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