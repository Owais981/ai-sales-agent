import React from 'react';

interface SectionHeadingProps {
  tag: string;
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
}

/** Tag + title + optional subtitle block used at the top of page sections. */
const SectionHeading: React.FC<SectionHeadingProps> = ({ tag, title, subtitle, className = 'mb-5' }) => (
  <div className={className} data-reveal="up">
    <span className="stag">{tag}</span>
    <h2 className="stitle mt-3">{title}</h2>
    {subtitle && <p className="ssub mb-0">{subtitle}</p>}
  </div>
);

export default SectionHeading;
