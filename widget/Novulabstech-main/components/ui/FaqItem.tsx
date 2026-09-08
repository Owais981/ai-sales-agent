"use client";

import React from 'react';
import { FaqItem as FaqItemType } from '@/types';

interface FaqItemProps {
  faq: FaqItemType;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ faq, index, isOpen, onToggle }) => {
  return (
    <div className={`fitem ${isOpen ? 'open' : ''}`}>
      <div className="fq" onClick={onToggle}>
        <span className="fq-text">{faq.q}</span>
        <div className="ftog">
          <i className={`bi ${isOpen ? 'bi-dash' : 'bi-plus'}`}></i>
        </div>
      </div>
      <div 
        className="fans" 
        style={{ 
          maxHeight: isOpen ? '200px' : '0', 
          overflow: 'hidden', 
          transition: 'max-height 0.3s ease-out' 
        }}
      >
        <div className="fans-in">
          {faq.a}
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
