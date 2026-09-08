import React from 'react';
import Button from './Button';
import { IndustryItem } from '@/types';

interface IndustryCardProps {
  item: IndustryItem;
  index: number;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ item, index }) => {
  return (
    <div className="col" data-reveal="up">
      <Button href="/industries" variant="none" className="icard" style={{ textAlign: 'left', display: 'flex', textDecoration: 'none' }}>
        <div className={`iico ${item.color}`}>
          <i className={`bi ${item.icon}`}></i>
        </div>
        <div>
          <h3 className="industry-card-title">{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      </Button>
    </div>
  );
};

export default IndustryCard;
