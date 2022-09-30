import './styles.css';

import { useState } from 'react';

export default function Collapsible({
  children,
  label,
  badge,
  initialState = true
}) {
  const [isOpen, setIsOpen] = useState(initialState);

  const onClick = (e) => setIsOpen(!isOpen);

  return (
    <article className={`accordion ${isOpen && 'accordion-active'}`}>
      <section onClick={onClick} className="accordion-button">
        {badge && (
          <img
            src={badge}
            alt={label ? label : 'Badge of the area'}
            className="accordion-badge"
          />
        )}
        {label && <span className="accordion-label">{label}</span>}
      </section>
      <section className="accordion-panel">{children}</section>
    </article>
  );
}
