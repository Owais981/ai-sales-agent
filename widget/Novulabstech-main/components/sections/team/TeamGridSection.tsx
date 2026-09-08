import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { teamMembers } from '@/content/siteData';
import GlowCard from '@/components/ui/GlowCard';
import JsonLd from '@/components/seo/JsonLd';
import { personSchema } from '@/lib/schema';

const TeamGridSection: React.FC = () => {
  return (
    <section className="sec bg-w" id="team-grid">
      {/* Person schema for each named individual. Blog bylines link to these
          anchors, which is what turns an author name from an unresolvable
          string into an entity Google and LLM retrieval can key on. */}
      <JsonLd
        data={teamMembers.map((m) =>
          personSchema({
            name: m.name,
            jobTitle: m.role,
            path: `/team/${m.slug}`,
            description: m.longBio,
            knowsAbout: m.knowsAbout,
            image: m.img,
            sameAs: m.linkedin ? [m.linkedin] : undefined,
          })
        )}
      />
      <div className="container">
        <div className="row justify-content-center g-4">
          {teamMembers.map((member, i) => (
            <div className="col-md-6 col-lg-4" data-reveal="up" key={member.slug}>
              {/* id anchor so /team/slug from a byline lands on the right person */}
              <GlowCard className="gcard h-100">
                <div className="gcard-body text-center p-4" id={member.slug}>
                  <div className="mb-4" style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
                    <Image
                      src={member.img}
                      alt={member.imgAlt}
                      width={120}
                      height={120}
                      className="rounded-circle"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', border: '3px solid var(--p1)' }}
                    />
                  </div>
                  {/* Links to the profile page. Without this the /team/[slug]
                      pages would be reachable only from bylines and the sitemap
                      — indexable but orphaned in the navigation graph, which is
                      exactly the shape that gets a page crawled rarely and
                      ranked poorly. */}
                  <h2 className="ctitle mb-1 team-name" style={{ fontSize: '1.15rem' }}>
                    <Link href={`/team/${member.slug}`}>{member.name}</Link>
                  </h2>
                  <div className="mb-3" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--p1)' }}>{member.role}</div>
                  <p className="ctext mb-3" style={{ fontSize: '0.85rem' }}>{member.longBio}</p>
                  <Link
                    href={`/team/${member.slug}`}
                    className="d-inline-block mb-3 team-profile-link"
                    style={{ fontSize: '0.82rem', fontWeight: 600 }}
                  >
                    Profile &amp; published work <i className="bi bi-arrow-right ms-1"></i>
                  </Link>
                  {member.credentials.length > 0 && (
                    <div className="d-flex gap-2 justify-content-center flex-wrap mb-3">
                      {member.credentials.map((c) => (
                        <span className="tbadge" key={c} style={{ background: 'rgba(201,168,76,.10)' }}>{c}</span>
                      ))}
                    </div>
                  )}
                  <div className="d-flex gap-2 justify-content-center flex-wrap">
                    {member.skills.map((skill) => (
                      <span className="tbadge" key={skill} style={{ background: 'rgba(93, 224, 230, 0.08)', color: 'var(--tx3)' }}>{skill}</span>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGridSection;
