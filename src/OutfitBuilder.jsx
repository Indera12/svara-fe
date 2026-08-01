import { useEffect, useRef, useState } from 'react';
import './OutfitBuilder.css';
import { CATEGORIES, emptyOutfit, isComplete } from './outfit/data';
import SelectionSection from './outfit/SelectionSection';
import CompleteCard from './outfit/CompleteCard';
import UpNextCard from './outfit/UpNextCard';
import MoodBoard from './outfit/MoodBoard';
import CartSummary from './outfit/CartSummary';

const NUM_OUTFITS = 3;

// Orchestrates the "Build Your Look" journey:
// guided progressive outfit building -> mood board -> cart summary.
export default function OutfitBuilder({ initialSection = 'dress', onExit }) {
  const [outfits, setOutfits] = useState(() =>
    Array.from({ length: NUM_OUTFITS }, () => emptyOutfit())
  );
  const [activeOutfit, setActiveOutfit] = useState(0);
  const [phase, setPhase] = useState('build'); // 'build' | 'moodboard' | 'cart'
  const outfitRefs = useRef({});
  const stepRefs = useRef({});
  const moodRef = useRef(null);

  // Start at the top of the journey.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Auto-scroll whenever the phase or active outfit changes.
  useEffect(() => {
    const id = setTimeout(() => {
      if (phase === 'moodboard') {
        moodRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (phase === 'build') {
        outfitRefs.current[activeOutfit]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 650);
    return () => clearTimeout(id);
  }, [phase, activeOutfit]);

  // A step is revealed when it is the first step, or every previous step is chosen.
  const stepRevealed = (outfit, catIndex) => {
    for (let i = 0; i < catIndex; i++) {
      const value = outfit[CATEGORIES[i].key];
      if (value === null || value === undefined) return false;
    }
    return true;
  };

  const select = (catKeyOrIndex, optionIndex) => {
    const catIndex =
      typeof catKeyOrIndex === 'number'
        ? catKeyOrIndex
        : CATEGORIES.findIndex((c) => c.key === catKeyOrIndex);
    const key = CATEGORIES[catIndex].key;
    const newOutfits = outfits.map((outfit, i) =>
      i === activeOutfit ? { ...outfit, [key]: optionIndex } : outfit
    );
    setOutfits(newOutfits);

    const outfitComplete = isComplete(newOutfits[activeOutfit]);

    if (!outfitComplete && catIndex + 1 < CATEGORIES.length) {
      // Guide the user to the next step after a short reveal pause.
      setTimeout(() => {
        stepRefs.current[activeOutfit]?.[catIndex + 1]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 520);
      return;
    }

    if (outfitComplete) {
      // Celebrate, collapse, then advance to the next outfit (or the mood board).
      setTimeout(() => {
        const next = newOutfits.findIndex((outfit, i) => i !== activeOutfit && !isComplete(outfit));
        if (next === -1) {
          setPhase('moodboard');
        } else {
          setActiveOutfit(next);
        }
      }, 1100);
    }
  };

  const change = (catIndex) => {
    const key = CATEGORIES[catIndex].key;
    setOutfits((prev) =>
      prev.map((outfit, i) => (i === activeOutfit ? { ...outfit, [key]: null } : outfit))
    );
  };

  const editOutfit = (index) => {
    setActiveOutfit(index);
    setPhase('build');
  };

  const doneEditing = () => {
    const next = outfits.findIndex((outfit, i) => i !== activeOutfit && !isComplete(outfit));
    if (next === -1) {
      setPhase('moodboard');
    } else {
      setActiveOutfit(next);
    }
  };

  const firstIncomplete = outfits.findIndex((outfit) => !isComplete(outfit));

  return (
    <div className="ob-wrap">
      {/* <header className="ob-brand">
        <p className="ob-brand-mark">SVARA</p>
        <p className="ob-brand-tagline">wear . your . voice</p>
      </header> */}

      <p className="ob-intro">
        Build your look, piece by piece. Choose the dress and your shoes, bag and finishing
        touches will follow — across three complete looks.
      </p>

      {phase === 'build' && (
        <>
          <div className="ob-outfits">
            {outfits.map((outfit, outfitIndex) => {
              const completed = isComplete(outfit);
              const active = outfitIndex === activeOutfit;

              if (active) {
                const editingDone = completed;
                return (
                  <div
                    key={outfitIndex}
                    className="ob-outfit ob-outfit--active"
                    ref={(el) => { outfitRefs.current[outfitIndex] = el; }}
                    data-outfit={outfitIndex + 1}
                  >
                    <div className="ob-thread" />

                    <div className="ob-outfit-head">
                      <div className="ob-outfit-title">
                        <span className="ob-outfit-num">outfit {outfitIndex + 1} of 3</span>
                        <span className="ob-outfit-sub">
                          {completed ? 'reviewing your look' : 'build this look'}
                        </span>
                      </div>

                      <div className="ob-outfit-progress">
                        {CATEGORIES.map((cat, catIndex) => {
                          const chosen = outfit[cat.key] !== null && outfit[cat.key] !== undefined;
                          const revealed = stepRevealed(outfit, catIndex);
                          return (
                            <span
                              key={cat.key}
                              className={`ob-progress-step ${chosen ? 'done' : ''} ${
                                revealed ? '' : 'locked'
                              }`}
                            >
                              <i className={'ti ' + (chosen ? 'ti-check' : cat.icon)} aria-hidden="true" />
                              <span className="ob-progress-label">{cat.label}</span>
                            </span>
                          );
                        })}
                      </div>

                      {editingDone && (
                        <button type="button" className="ob-ghost-btn ob-done-btn" onClick={doneEditing}>
                          ✓ done editing
                        </button>
                      )}
                    </div>

                    {CATEGORIES.map((cat, catIndex) => (
                      <div
                        key={cat.key}
                        ref={(el) => {
                          if (!stepRefs.current[outfitIndex]) stepRefs.current[outfitIndex] = {};
                          stepRefs.current[outfitIndex][catIndex] = el;
                        }}
                        className={
                          'ob-step-wrap' + (stepRevealed(outfit, catIndex) ? ' revealed' : '')
                        }
                      >
                        <SelectionSection
                          categoryKey={cat.key}
                          selectedIndex={outfit[cat.key]}
                          revealed={stepRevealed(outfit, catIndex)}
                          stepNumber={catIndex + 1}
                          onSelect={select}
                          onChange={() => change(catIndex)}
                        />
                      </div>
                    ))}
                  </div>
                );
              }

              if (completed) {
                return (
                  <CompleteCard
                    key={outfitIndex}
                    outfitNumber={outfitIndex + 1}
                    outfit={outfit}
                    onEdit={() => editOutfit(outfitIndex)}
                  />
                );
              }

              return <UpNextCard key={outfitIndex} outfitNumber={outfitIndex + 1} />;
            })}
          </div>

          {firstIncomplete !== -1 && (
            <p className="ob-hint">
              {firstIncomplete === 0
                ? 'Begin with outfit 1 — found your dress? We’ll guide you through the rest.'
                : `Outfit ${firstIncomplete + 1} awaits — keep styling.`}
            </p>
          )}
        </>
      )}

      {phase === 'moodboard' && (
        <div className="ob-moodboard-stage">
          <div className="ob-recap">
            {outfits.map((outfit, outfitIndex) => (
              <CompleteCard
                key={outfitIndex}
                outfitNumber={outfitIndex + 1}
                outfit={outfit}
                onEdit={() => editOutfit(outfitIndex)}
              />
            ))}
          </div>
          <div ref={moodRef}>
            <MoodBoard outfits={outfits} onAddToCart={() => setPhase('cart')} />
          </div>
        </div>
      )}

      {phase === 'cart' && (
        <CartSummary
          outfits={outfits}
          onContinueShopping={() => onExit?.()}
          onCheckout={() => {}}
        />
      )}
    </div>
  );
}
