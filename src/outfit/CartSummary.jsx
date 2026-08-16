import { CATEGORIES, getItem } from './data';
import Reveal from './Reveal';

// Cart grouped by outfit, with line items, per-outfit and grand totals.
export default function CartSummary({ outfits, onContinueShopping, onCheckout }) {
  return (
    <section className="ob-cart">
      <Reveal className="ob-cart-head ob-cart-head--summary">
        <span className="ob-section-eyebrow">build this look</span>
        <h2 className="ob-moodboard-title">Your Look</h2>
      </Reveal>

      <div className="ob-cart-groups ob-cart-groups--summary">
        {outfits.map((outfit, outfitIndex) => (
          <Reveal key={outfitIndex} className="ob-cart-group ob-cart-group--summary" delay={outfitIndex * 120}>
            <div className="ob-cart-rows ob-cart-rows--summary">
              {CATEGORIES.map((cat) => {
                const item = getItem(outfit, cat.key);
                return (
                  <div key={cat.key} className="ob-cart-row ob-cart-row--summary">
                    <span className="ob-cart-swatch" style={{ background: item ? item.color : '#e8e2d8' }}>
                      {item?.image && <img src={item.image} alt="" />}
                    </span>
                    <span className="ob-cart-row-meta">
                      <span className="ob-cart-row-name">{item ? item.name : cat.label}</span>
                      <span className="ob-cart-row-cat">{cat.label}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="ob-cart-actions ob-cart-actions--summary" delay={260}>
        <button type="button" className="ob-primary-btn ob-primary-btn--large ob-primary-btn--full" onClick={onCheckout}>
          Add look to bag
        </button>
        <button type="button" className="ob-ghost-btn ob-ghost-btn--dark ob-ghost-btn--link" onClick={onContinueShopping}>
          Continue shopping
        </button>
      </Reveal>
    </section>
  );
}
