import { CATEGORIES, getItem } from './data';
import Reveal from './Reveal';

// Gallery-style presentation of all three completed looks.
export default function MoodBoard({ outfits, onAddToCart }) {
  return (
    <section className="ob-moodboard">
      <Reveal className="ob-moodboard-head">
        <span className="ob-section-eyebrow">the finale</span>
        <h2 className="ob-moodboard-title">Your Style Mood Board</h2>
        <p className="ob-moodboard-sub">Three looks, one you. Which is your favorite?</p>
      </Reveal>

      <div className="ob-moodboard-grid">
        {outfits.map((outfit, index) => (
          <Reveal key={index} className="ob-mood-card" delay={index * 120}>
            <div className="ob-mood-label">outfit {index + 1}</div>
            <div className="ob-mood-collection">
              {CATEGORIES.map((cat) => {
                const item = getItem(outfit, cat.key);
                return (
                  <div key={cat.key} className="ob-mood-piece">
                    <span
                      className="ob-mood-piece-swatch"
                      style={{ background: item ? item.color : '#e8e2d8' }}
                    >
                      {item?.image && <img src={item.image} alt="" />}
                    </span>
                    <span className="ob-mood-piece-meta">
                      <span className="ob-mood-piece-name">{item ? item.name : cat.label}</span>
                    </span>
                  </div>
                );
              })}
            </div>
            {/* look total removed per request */}
          </Reveal>
        ))}
      </div>

      <Reveal className="ob-moodboard-cta" delay={200}>
        <button type="button" className="ob-primary-btn ob-primary-btn--large" onClick={onAddToCart}>
          Love the looks? → Add to box
        </button>
      </Reveal>
    </section>
  );
}
