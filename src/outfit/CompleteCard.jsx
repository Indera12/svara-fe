import { CATEGORIES, getItem } from './data';

// Flat-lay preview for a finished outfit, styled to resemble a styled editorial board.
export default function CompleteCard({ outfitNumber, outfit, onEdit }) {
  const pieces = CATEGORIES.map((cat) => ({
    cat,
    item: getItem(outfit, cat.key),
  })).filter(({ item }) => item);

  return (
    <div className="ob-complete-card">
      <div className="ob-complete-top">
        <span className="ob-complete-label">your look</span>
        <span className="ob-complete-check" aria-hidden="true">✓</span>
      </div>

      <div className="ob-flatlay" aria-label="Selected outfit preview">
        {pieces.map(({ cat, item }) => (
          <div key={cat.key} className={`ob-flat-item ob-flat-item--${cat.key}`}>
            {item.image && <img src={item.image} alt={item.name} />}
          </div>
        ))}
      </div>

      <div className="ob-complete-foot">
        <div className="ob-complete-actions">
          <button type="button" className="ob-ghost-btn" onClick={() => onEdit(outfitNumber - 1)}>
            view / edit
          </button>
        </div>
      </div>
    </div>
  );
}
