import React from 'react';

/**
 * Word-by-word kinetic headline.
 *
 * Splitting happens here, at render time on the server, rather than by a
 * runtime text-splitting library. That means no layout thrash on mount, no
 * dependency, and the split markup is present in the HTML source — which
 * matters because a headline assembled by client JS is a headline a non-JS
 * crawler may not see.
 *
 * Accessibility: the readable phrase is kept intact on the wrapper via
 * `aria-label`, and the per-word spans are hidden from assistive technology.
 * Without that, a screen reader announces a split headline one word per item,
 * which is how most "kinetic text" implementations quietly break the page for
 * their least-served users.
 *
 * `delayStep` staggers the words. Total run is capped so a long headline never
 * leaves the last word arriving after the reader has already moved on.
 */
export default function KineticHeading({
  text,
  className = '',
  delayStep = 55,
  maxDelay = 500,
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  delayStep?: number;
  maxDelay?: number;
  as?: 'span' | 'h1' | 'h2';
}) {
  const words = text.split(' ');

  return (
    <Tag className={`kinetic ${className}`.trim()} aria-label={text}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span
            className="kinetic-word"
            aria-hidden="true"
            style={{ animationDelay: `${Math.min(i * delayStep, maxDelay)}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </Tag>
  );
}
