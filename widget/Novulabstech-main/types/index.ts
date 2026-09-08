export interface ServiceItem {
  icon: string;
  title: string;
  desc: string;
  color: string;
  /** Slug of the dedicated page in content/serviceSpokes.ts this card links to.
   *  Every card here is one of the 22 services NovuLabs lists on the homepage,
   *  and each now has its own indexable page rather than linking straight to
   *  /contact with no detail in between. */
  slug: string;
}

export interface WhyUsItem {
  num: string;
  icon: string;
  title: string;
  desc: string;
  color: string;
}

export interface IndustryItem {
  icon: string;
  title: string;
  desc: string;
  color: string;
}

export interface TechStackItem {
  icon: string;
  name: string;
}

export interface PortfolioItem {
  img: string;
  tags: string;
  title: string;
  desc: string;
  tech: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface TeamMember {
  name: string;
  role: string;
  img: string;
  bio: string;
}

export interface BlogPost {
  slug: string;
  /** Full H1 / display title. May exceed the SERP budget. */
  title: string;
  /**
   * Title used in <title>, kept under 49 chars so that with the " | NovuLabs"
   * suffix the rendered title stays inside Google's ~60-char budget. Falls back
   * to `title` when omitted.
   */
  seoTitle?: string;
  description: string;
  content: string;
  coverImage: string;
  /** Descriptive alt text for the cover image (accessibility + image search). */
  coverAlt: string;
  category: string;
  /** Human-readable display date. */
  date: string;
  /** ISO 8601 — required by BlogPosting schema and article:published_time. */
  publishedISO: string;
  /** ISO 8601 — drives sitemap lastmod and article:modified_time. */
  modifiedISO: string;
  author: string;
  /** Team-page anchor slug so bylines resolve to a real Person entity. */
  authorSlug: string;
  readTime: string;
  tags: string[];
  /** Slugs of related posts, rendered as in-content links so posts are not
   *  crawl dead-ends. */
  related?: string[];
  /** Service pages this article should pass internal link equity to. */
  relatedServices?: { label: string; href: string }[];
  /** Primary-source citations. Regulatory content without them reads as
   *  unverified to quality raters and to LLM retrieval pipelines. */
  sources?: { label: string; href: string }[];
}

export interface TeamMemberProfile {
  slug: string;
  name: string;
  role: string;
  img: string;
  /** Descriptive alt text — never the filename. */
  imgAlt: string;
  /** Short card bio. */
  bio: string;
  /** Longer bio used for author boxes and Person schema. */
  longBio: string;
  skills: string[];
  /** Verifiable credentials. Leave empty rather than inventing any. */
  credentials: string[];
  knowsAbout: string[];
  linkedin?: string;
}

export interface InquiryFormData {
  full_name: string;
  work_email: string;
  service_needed: string;
  message: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
