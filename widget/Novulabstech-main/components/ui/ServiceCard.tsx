import React from 'react';
import Link from 'next/link';
import GlowCard from './GlowCard';
import { ServiceItem } from '@/types';

interface ServiceCardProps {
  item: ServiceItem;
  index: number;
}

/**
 * Every card used to link straight to /contact with no page in between — a
 * visitor could not read a sentence about a service before being asked to
 * book a call. Each of the 22 now has a dedicated page (content/serviceSpokes.ts)
 * and the card links there; the page itself carries its own CTA once someone
 * has actually read what the service involves.
 */
const ServiceCard: React.FC<ServiceCardProps> = ({ item, index }) => {
  return (
    <div className="col" data-reveal="up">
      <GlowCard className="gcard">
        <div className="gcard-body p-uniform">
          <div className={`sico ${item.color}`}>
            <i className={`bi ${item.icon}`}></i>
          </div>
          <div className="ctitle">{item.title}</div>
          <div className="ctext">{item.desc}</div>
          <Link href={`/services/${item.slug}`} className="carr">
            <i className="bi bi-arrow-right-circle"></i>Learn more
          </Link>
        </div>
      </GlowCard>
    </div>
  );
};

export default ServiceCard;
