import { CATEGORIES, getItem } from './data';

// Collapsed summary card for a finished outfit.
export default function CompleteCard({ outfitNumber, outfit, onEdit }) {
  return (
    <div className="ob-complete-card">
      <div className="ob-complete-top">
        <span className="ob-complete-label">outfit {outfitNumber} complete</span>
        <span className="ob-complete-check" aria-hidden="true">✓</span>
      </div>

      <div className="ob-complete-thumbs">
        {CATEGORIES.map((cat) => {
          const item = getItem(outfit, cat.key);
          return (
            <div key={cat.key} className="ob-complete-thumb" title={`${cat.label}: ${item.name}`}>
              <span
                className="ob-complete-swatch"
                style={{ background: item ? item.color : '#e8e2d8' }}
              >
                {item?.image && <img src={item.image} alt="" />}
              </span>
              <span className="ob-complete-thumb-name">{item ? item.name : cat.label}</span>
            </div>
          );
        })}
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
