import { CATEGORIES, getItem, outfitTotal, inr } from './data';
import Reveal from './Reveal';

// Cart grouped by outfit, with line items, per-outfit and grand totals.
export default function CartSummary({ outfits, onContinueShopping, onCheckout }) {
  const grandTotal = outfits.reduce((sum, outfit) => sum + outfitTotal(outfit), 0);

  return (
    <section className="ob-cart">
      <Reveal className="ob-cart-head">
        <span className="ob-section-eyebrow">almost there</span>
        <h2 className="ob-moodboard-title">Your Cart (3 outfits)</h2>
        <p className="ob-moodboard-sub">Review your selected looks before check out.</p>
      </Reveal>

      <div className="ob-cart-groups">
        {outfits.map((outfit, outfitIndex) => (
          <Reveal key={outfitIndex} className="ob-cart-group" delay={outfitIndex * 120}>
            <div className="ob-cart-group-head">
              <span>outfit {outfitIndex + 1}</span>
              <span className="ob-cart-group-total">{inr(outfitTotal(outfit))}</span>
            </div>
            <div className="ob-cart-rows">
              {CATEGORIES.map((cat) => {
                const item = getItem(outfit, cat.key);
                return (
                  <div key={cat.key} className="ob-cart-row">
                    <span className="ob-cart-swatch" style={{ background: item ? item.color : '#e8e2d8' }}>
                      {item?.image && <img src={item.image} alt="" />}
                    </span>
                    <span className="ob-cart-row-meta">
                      <span className="ob-cart-row-name">{item ? item.name : cat.label}</span>
                      <span className="ob-cart-row-cat">{cat.label}</span>
                    </span>
                    <span className="ob-cart-row-price">{item ? inr(item.price) : '—'}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="ob-cart-total" delay={200}>
        <span>grand total</span>
        <span className="ob-cart-grand">{inr(grandTotal)}</span>
      </Reveal>

      <Reveal className="ob-cart-actions" delay={260}>
        <button type="button" className="ob-ghost-btn ob-ghost-btn--dark" onClick={onContinueShopping}>
          continue shopping
        </button>
        <button type="button" className="ob-primary-btn ob-primary-btn--large" onClick={onCheckout}>
          Checkout →
        </button>
      </Reveal>
    </section>
  );
}
