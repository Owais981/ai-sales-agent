"use client";

import React, { useState, useEffect } from 'react';

const ScrollProgress: React.FC = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const scrolled = (window.scrollY / totalScroll) * 100;
        setWidth(scrolled);
      } else {
        setWidth(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      id="sp" 
      style={{ 
        width: `${width}%`,
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        zIndex: 99998,
        transition: 'width 0.1s ease-out'
      }}
    />
  );
};

export default ScrollProgress;
