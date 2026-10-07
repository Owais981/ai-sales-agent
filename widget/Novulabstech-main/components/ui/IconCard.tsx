import React from 'react';
import GlowCard from './GlowCard';

interface IconCardProps {
  icon: string;
  title: string;
  text?: string;
}

/** Icon + title + optional text card, on the shared glow-card style. */
const IconCard: React.FC<IconCardProps> = ({ icon, title, text }) => (
  <div className="col" data-reveal="up">
    <GlowCard className="gcard h-100">
      <div className="gcard-body p-uniform">
        <div className="sico i-b mb-3">
          <i className={`bi ${icon}`}></i>
        </div>
        <div className="ctitle">{title}</div>
        {text && <div className="ctext">{text}</div>}
      </div>
    </GlowCard>
  </div>
);

export default IconCard;
