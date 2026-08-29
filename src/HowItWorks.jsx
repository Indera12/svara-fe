import './HowItWorks.css';
import { useState, useEffect, useRef, useCallback } from 'react';

const AUTO_SWIPE_INTERVAL = 4000; // ms between auto-advances
const RESUME_AFTER_INTERACTION = 6000; // ms of inactivity before auto-swipe resumes
const SWIPE_THRESHOLD = 40; // px drag distance needed to register a swipe

function HowItWorks() {
  // Order here = visual stack order (left, center/active, right).
  // Note: the numbers are NOT sequential with position — 01 is the
  // active center card, 03 sits to its left, 02 to its right —
  // matching the reference deck-of-cards layout.
  const steps = [
    {
      number: '03',
      title: 'Made for You',
      description: 'Curated pieces that celebrate every vein of you.',
      illustration: 'portrait'
    },
    {
      number: '01',
      title: 'Wear Your Voice',
      description: "Svara is more than fashion—it's self-expression.",
      illustration: 'plant'
    },
    {
      number: '02',
      title: 'The Svara Box',
      description: 'Outfits. Accessories. Stories. All in one experience.',
      illustration: 'gift'
    }
  ];

  const values = [
    { label: 'Self-Expression', icon: 'heart' },
    { label: 'Thoughtful Curated', icon: 'leaf' },
    { label: 'Timeless Designs', icon: 'sparkle' },
    { label: 'The Svara Experience', icon: 'box' }
  ];

  const [active, setActive] = useState(1);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const autoTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const dragStartXRef = useRef(0);
  const stageRef = useRef(null);

  const goTo = useCallback(
    (index) => {
      const next = ((index % steps.length) + steps.length) % steps.length;
      setActive(next);
    },
    [steps.length]
  );

  const goToRelative = useCallback((delta) => goTo(active + delta), [active, goTo]);

  // --- Auto-advance ---
  const startAutoSwipe = useCallback(() => {
    clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, AUTO_SWIPE_INTERVAL);
  }, [steps.length]);

  const pauseAutoSwipe = useCallback(() => {
    clearInterval(autoTimerRef.current);
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(startAutoSwipe, RESUME_AFTER_INTERACTION);
  }, [startAutoSwipe]);

  useEffect(() => {
    startAutoSwipe();
    return () => {
      clearInterval(autoTimerRef.current);
      clearTimeout(resumeTimerRef.current);
    };
  }, [startAutoSwipe]);

  // --- Manual navigation (dots / click) ---
  const handleManualSelect = (index) => {
    goTo(index);
    pauseAutoSwipe();
  };

  // --- Swipe / drag handling (mouse + touch via Pointer Events) ---
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    pauseAutoSwipe();
    if (stageRef.current) stageRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartXRef.current);
  };

  const finishDrag = () => {
    if (!isDragging) return;
    if (dragOffset <= -SWIPE_THRESHOLD) {
      goToRelative(1); // swiped left -> next
    } else if (dragOffset >= SWIPE_THRESHOLD) {
      goToRelative(-1); // swiped right -> previous
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  const handlePointerUp = () => finishDrag();
  const handlePointerLeave = () => {
    if (isDragging) finishDrag();
  };

  // Position of each card relative to the active one: -1 (left), 0 (center), 1 (right)
  const getRelativePosition = (index) => {
    const diff = (index - active + steps.length) % steps.length;
    if (diff === 0) return 0;
    if (diff === 1) return 1;
    return -1;
  };

  const renderIllustration = (type) => {
    switch (type) {
      case 'portrait':
        return (
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M45 30c8-10 22-10 30-2 6 6 8 16 4 26-2 5-1 9 3 12 5 4 7 9 5 14-3 8-14 10-22 6-10-5-22-4-30 3-6 5-14 3-16-4-2-6 1-12 6-15 4-3 5-7 3-12-4-10-1-20 17-28z"
              stroke="var(--color-primary, #5a7b6d)"
              strokeWidth="1.5"
              opacity="0.55"
            />
          </svg>
        );
      case 'plant':
        return (
          <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 130V55c0-19.3 17.9-35 40-35s40 15.7 40 35v75"
              stroke="var(--color-accent-gold, #c9a17a)"
              strokeWidth="1.5"
            />
            <line x1="60" y1="50" x2="60" y2="120" stroke="var(--color-primary, #5a7b6d)" strokeWidth="1.5" />
            <path d="M60 78c0-14 12-22 22-24-2 12-8 22-22 24z" fill="var(--color-primary, #5a7b6d)" opacity="0.55" />
            <path d="M60 98c0-14-12-22-22-24 2 12 8 22 22 24z" fill="var(--color-primary, #5a7b6d)" opacity="0.4" />
            <path d="M60 62c0-10 8-16 16-18-1 9-6 16-16 18z" fill="var(--color-primary, #5a7b6d)" opacity="0.7" />
          </svg>
        );
      case 'gift':
        return (
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="50" width="70" height="50" rx="2" stroke="var(--color-accent-gold, #c9a17a)" strokeWidth="1.5" />
            <rect x="25" y="50" width="70" height="14" stroke="var(--color-accent-gold, #c9a17a)" strokeWidth="1.5" />
            <line x1="60" y1="50" x2="60" y2="100" stroke="var(--color-accent-gold, #c9a17a)" strokeWidth="1.5" />
            <path
              d="M60 50c0-14-10-24-20-24-8 0-12 6-8 12 4 6 16 12 28 12z"
              stroke="var(--color-primary, #5a7b6d)"
              strokeWidth="1.5"
              opacity="0.7"
            />
            <path
              d="M60 50c0-14 10-24 20-24 8 0 12 6 8 12-4 6-16 12-28 12z"
              stroke="var(--color-primary, #5a7b6d)"
              strokeWidth="1.5"
              opacity="0.7"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'heart':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 20s-7.5-4.7-10-9.3C.4 7.2 2 3.5 5.6 3.1c2-.2 3.8.8 4.9 2.5 1.1-1.7 2.9-2.7 4.9-2.5C19 3.5 20.6 7.2 19 10.7 16.5 15.3 12 20 12 20z"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        );
      case 'leaf':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 19c9 0 14-5 14-14 0 0-14-1-14 14z" stroke="currentColor" strokeWidth="1.4" />
            <path d="M5 19c2-6 6-10 12-12" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        );
      case 'sparkle':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'box':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8l9-4 9 4-9 4-9-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M3 8v8l9 4 9-4V8" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M12 12v8" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="cards" className="how-it-works">
      <div className="how-it-works-header">
        <span className="story-label">OUR STORY</span>
        <h2 className="story-title">
          Born to be <span className="highlight">You.</span>
        </h2>
      </div>

      <div
        className="how-it-works-stage"
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
      >
        {steps.map((step, index) => {
          const relativePosition = getRelativePosition(index);
          // stack-0 = left, stack-1 = center/active, stack-2 = right
          const stackClass = relativePosition === 0 ? 'stack-1' : relativePosition === -1 ? 'stack-0' : 'stack-2';
          const isActive = relativePosition === 0;
          const dragStyle =
            isActive && isDragging
              ? {
                  transform: `translate(-50%, -50%) translateX(${dragOffset}px) rotate(${dragOffset / 20}deg)`,
                  transition: 'none'
                }
              : undefined;

          return (
            <div
              key={index}
              className={`how-it-works-card ${stackClass}${isActive ? ' active' : ''}${isDragging && isActive ? ' dragging' : ''}`}
              style={dragStyle}
              onClick={() => !isDragging && handleManualSelect(index)}
            >
              <div className="card-number-badge">{step.number}</div>
              <div className="card-image-placeholder">{renderIllustration(step.illustration)}</div>
              <div className="card-content">
                <h3 className="card-title">{step.title}</h3>
                <p className="card-description">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="carousel-dots">
        {steps.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === active ? 'active' : ''}`}
            onClick={() => handleManualSelect(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="how-it-works-values">
        {values.map((value, index) => (
          <div key={index} className="value-item">
            <span className="value-icon">{renderIcon(value.icon)}</span>
            <p className="value-label">{value.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;