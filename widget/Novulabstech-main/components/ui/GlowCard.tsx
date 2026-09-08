"use client";

import React, { useRef } from 'react';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const GlowCard: React.FC<GlowCardProps> = ({ children, className = '', style = {} }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--gx', `${x}%`);
    card.style.setProperty('--gy', `${y}%`);
    card.style.setProperty('--go', '1');
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--go', '0');
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        // CSS custom props drive the gradient — avoids inline style re-renders
        ['--gx' as string]: '50%',
        ['--gy' as string]: '50%',
        ['--go' as string]: '0',
      }}
    >
      {children}
    </div>
  );
};

export default GlowCard;
