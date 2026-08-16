import { CATEGORIES, getItem } from './data';
import Reveal from './Reveal';

// Cart grouped by outfit, with line items, per-outfit and grand totals.
export default function CartSummary({ outfits, onContinueShopping, onCheckout, onAddToBag }) {
  const hasSelection = outfits.some((outfit) => CATEGORIES.some((cat) => getItem(outfit, cat.key)));

  return (
    <section className="ob-cart">
      <Reveal className="ob-cart-head ob-cart-head--summary">
        <span className="ob-section-eyebrow">build this look</span>
        <h2 className="ob-moodboard-title">Your Look</h2>
      </Reveal>

      {!hasSelection ? (
        <Reveal className="ob-cart-empty" delay={80}>
          <div className="ob-cart-empty__box">
            <p>Choose your outfit</p>
          </div>
        </Reveal>
      ) : (
        <div className="ob-cart-groups ob-cart-groups--summary">
          {outfits.map((outfit, outfitIndex) => {
            const pieces = CATEGORIES.map((cat) => ({ cat, item: getItem(outfit, cat.key) }))
              .filter(({ item }) => item);

            return (
              <Reveal key={outfitIndex} className="ob-cart-group ob-cart-group--summary" delay={outfitIndex * 120}>
                <div className="ob-flatlay ob-flatlay--cart" aria-label="Selected outfit preview">
                  {pieces.map(({ cat, item }) => (
                    <div key={cat.key} className={`ob-flat-item ob-flat-item--${cat.key}`}>
                      {item.image && <img src={item.image} alt={item.name} />}
                    </div>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      )}

      <Reveal className="ob-cart-actions ob-cart-actions--summary" delay={260}>
        {hasSelection && (
          <button type="button" className="ob-primary-btn ob-primary-btn--large ob-primary-btn--full" onClick={onAddToBag || onCheckout}>
            Add look to bag
          </button>
        )}
        <button type="button" className="ob-ghost-btn ob-ghost-btn--dark ob-ghost-btn--link" onClick={onContinueShopping}>
          Continue shopping
        </button>
      </Reveal>
    </section>
  );
}
