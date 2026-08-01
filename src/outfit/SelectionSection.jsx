import { CATEGORIES } from './data';

// One guided step in an outfit: a category whose options are revealed,
// then collapsed into a summary strip once chosen.
export default function SelectionSection({
  categoryKey,
  selectedIndex,
  revealed,
  stepNumber,
  onSelect,
  onChange,
}) {
  const cat = CATEGORIES.find((c) => c.key === categoryKey);
  const isChosen = selectedIndex !== null && selectedIndex !== undefined;
  const chosen = isChosen ? cat.options[selectedIndex] : null;

  return (
    <section
      className={`ob-section ${revealed ? 'revealed' : ''} ${isChosen ? 'chosen' : ''}`}
      data-step={`0${stepNumber}`}
    >
      <div className="ob-section-rail">
        <span className="ob-section-num">
          <i className={'ti ' + (chosen ? 'ti-check' : cat.icon)} />
        </span>
        <span className="ob-section-line" />
      </div>

      <div className="ob-section-body">
        <div className="ob-section-head">
          <div>
            <span className="ob-section-eyebrow">step 0{stepNumber} · {cat.sub}</span>
            <h3 className="ob-section-title">{chosen ? 'Your ' : 'Choose your '}{cat.label}</h3>
          </div>
          {isChosen && <span className="ob-chosen-badge">✓ selected</span>}
        </div>

        {isChosen ? (
          <div className="ob-chosen-strip">
            <div className="ob-swatch ob-swatch-sm" style={{ background: chosen.color }}>
              <img src={chosen.image} alt="" />
            </div>
            <div className="ob-chosen-info">
              <span className="ob-chosen-name">{chosen.name}</span>
            </div>
            <button type="button" className="ob-change-btn" onClick={onChange}>
              change
            </button>
          </div>
        ) : (
          <div className="ob-grid">
            {cat.options.map((option, index) => (
              <button
                type="button"
                key={option.name}
                className={`ob-card ${selectedIndex === index ? 'selected' : ''}`}
                style={{ '--ob-item-delay': `${index * 90}ms` }}
                onClick={() => onSelect(categoryKey, index)}
              >
                <span className="ob-card-swatch" style={{ background: option.color + '22' }}>
                  <img src={option.image} alt="" />
                  <span className="ob-card-check">
                    <i className="ti ti-check" aria-hidden="true" />
                  </span>
                </span>
                <span className="ob-card-meta">
                  <span className="ob-card-name">{option.name}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
