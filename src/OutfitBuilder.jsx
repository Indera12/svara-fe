import { useEffect, useRef, useState } from 'react';
import './OutfitBuilder.css';
import { CATEGORIES, emptyOutfit, isComplete } from './outfit/data';
import SelectionSection from './outfit/SelectionSection';
import CompleteCard from './outfit/CompleteCard';
import UpNextCard from './outfit/UpNextCard';
import MoodBoard from './outfit/MoodBoard';
import CartSummary from './outfit/CartSummary';

const NUM_OUTFITS = 1;

// Orchestrates the "Build Your Look" journey for a single outfit:
// dress -> bag -> accessory -> shoes -> cart summary.
export default function OutfitBuilder({ initialSection = 'dress', onExit, onTimerStateChange }) {
  const [outfits, setOutfits] = useState(() => [emptyOutfit()]);
  const [activeOutfit, setActiveOutfit] = useState(0);
  const [phase, setPhase] = useState('build'); // 'build' | 'moodboard' | 'cart'
  const outfitRefs = useRef({});
  const stepRefs = useRef({});
  const moodRef = useRef(null);

  // Start at the top of the journey.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Honor any initialSection passed from parent (e.g. open cart directly)
  useEffect(() => {
    if (initialSection === 'cart') {
      setPhase('cart');
    } else if (initialSection === 'moodboard') {
      setPhase('moodboard');
    }
  }, [initialSection]);

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
      setTimeout(() => {
        stepRefs.current[activeOutfit]?.[catIndex + 1]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 520);
      return;
    }

    if (outfitComplete) {
      onTimerStateChange?.({ active: true, timeLeft: 10 * 60 });
      setTimeout(() => {
        setPhase('cart');
      }, 700);
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
    setPhase('cart');
  };

  const handleContinueShopping = () => {
    setOutfits([emptyOutfit()]);
    setActiveOutfit(0);
    setPhase('build');
    onTimerStateChange?.({ active: false, timeLeft: 10 * 60 });
  };

  const handleAddToBag = () => {
    onTimerStateChange?.({ active: false, timeLeft: 0 });
    onExit?.();
  };

  const firstIncomplete = outfits.findIndex((outfit) => !isComplete(outfit));
  const outfitIsComplete = outfits.length > 0 && isComplete(outfits[0]);

  useEffect(() => {
    if (!outfitIsComplete) {
      if (initialSection === 'cart' || phase === 'cart') {
        return undefined;
      }
      onTimerStateChange?.({ active: false, timeLeft: 10 * 60 });
      return undefined;
    }

    onTimerStateChange?.({ active: true, timeLeft: 10 * 60 });
    return undefined;
  }, [outfitIsComplete, onTimerStateChange, initialSection, phase]);

  return (
    <div className="ob-wrap">
      {/* <header className="ob-brand">
        <p className="ob-brand-mark">SVARA</p>
        <p className="ob-brand-tagline">wear . your . voice</p>
      </header> */}

      <p className="ob-intro">
        Build your look one step at a time. Start with your dress, then move through bag,
        accessories and heels.
      </p>

      {phase === 'build' && (
        <>
          <div className="ob-outfits">
            {outfits.map((outfit, outfitIndex) => {
              const completed = isComplete(outfit);
              const active = outfitIndex === activeOutfit;

              if (!active) return null;

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
                      <span className="ob-outfit-num">your look</span>
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

                    {completed && (
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
            })}
          </div>

          {firstIncomplete !== -1 && (
            <p className="ob-hint">
              {firstIncomplete === 0
                ? 'Start with your dress — the next step unlocks automatically after you choose it.'
                : 'Keep going — the next styling step is ready.'}
            </p>
          )}
        </>
      )}

      {phase === 'moodboard' && (
        <div className="ob-moodboard-stage">
          <div className="ob-recap">
            <CompleteCard
              outfitNumber={1}
              outfit={outfits[0]}
              onEdit={() => editOutfit(0)}
            />
          </div>
          <div ref={moodRef}>
            <MoodBoard
              outfits={outfits}
              onAddToCart={() => {
                const count = CATEGORIES.reduce((total, cat) => {
                  const value = outfits[0]?.[cat.key];
                  return value !== null && value !== undefined ? total + 1 : total;
                }, 0);
                try { localStorage.setItem('svara-cart-count', String(count)); } catch (e) {}
                try { window.dispatchEvent(new CustomEvent('svaraCartUpdated', { detail: { count } })); } catch (e) {}
                setPhase('cart');
              }}
            />
          </div>
        </div>
      )}

      {phase === 'cart' && (
        <CartSummary
          outfits={outfits}
          onContinueShopping={handleContinueShopping}
          onCheckout={() => {}}
          onAddToBag={handleAddToBag}
        />
      )}
    </div>
  );
}
