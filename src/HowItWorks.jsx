import './HowItWorks.css';
import { useState } from 'react';

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Story',
      description: 'Browse curated boxes designed for every mood, occasion, and personality.'
    },
    {
      number: '02',
      title: 'See It On You',
      description: 'Virtually try on your complete look before it reaches your doorstep.'
    },
    {
      number: '03',
      title: 'Wear & Repeat',
      description: 'Mix pieces across your SVARA boxes to create endless new looks and new stories.'
    }
  ];

  const [active, setActive] = useState(null);
  const [flipped, setFlipped] = useState(false);

  return (
    <section className="how-it-works">
      <div className={`how-it-works-stage${active !== null ? ' has-active' : ''}`}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`how-it-works-card stack-${index}${active === index ? ' active' : ''}${active === index && flipped ? ' flipped' : ''}`}
            onClick={() => {
              if (active === index) {
                if (!flipped) {
                  setFlipped(true);
                } else {
                  setActive(null);
                  setFlipped(false);
                }
              } else {
                setActive(index);
                setFlipped(false);
              }
            }}
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="card-number">{step.number}</div>
                <h3 className="card-title">{step.title}</h3>
              </div>
              <div className="card-back">
                <div className="card-number">{step.number}</div>
                <p className="card-description">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;