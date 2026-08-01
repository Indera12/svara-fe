import { useEffect, useRef, useState } from 'react';

// Scroll-triggered reveal wrapper. Adds `in` class when scrolled into view.
export default function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  threshold = 0.15,
  y = 36,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(element);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`ob-reveal${vis ? ' in' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--ob-delay': `${delay}ms`,
        '--ob-y': `${y}px`,
        transitionDelay: delay ? `${delay}ms` : undefined,
        ...rest.style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
