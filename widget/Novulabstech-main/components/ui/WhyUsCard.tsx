import React from 'react';
import { WhyUsItem } from '@/types';

interface WhyUsCardProps {
  item: WhyUsItem;
  index: number;
}

const WhyUsCard: React.FC<WhyUsCardProps> = ({ item, index }) => {
  return (
    <div className="col" data-reveal="up">
      <div className="wcard">
        <div className="wnum">{item.num}</div>
        <div className={`sico ${item.color} mb-3`}>
          <i className={`bi ${item.icon}`}></i>
        </div>
        <h3 className="ctitle">{item.title}</h3>
        <p className="ctext">{item.desc}</p>
      </div>
    </div>
  );
};

export default WhyUsCard;
