import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { blogPosts } from '@/content/blogPosts';
import { webPageSchema, ORG_ID } from '@/lib/schema';
import { canonical } from '@/lib/seo';
import BlogHero from '@/components/sections/blog/BlogHero';
import BlogGrid from '@/components/sections/blog/BlogGrid';
import PageFaq from '@/components/sections/shared/PageFaq';
import { blogFaqs } from '@/content/pageFaqs';

export const metadata: Metadata = {
  title: 'Insights: AML, Fintech & Healthcare IT',
  description:
    'Technical guides on goAML integration, STR/CTR reporting, FMU and SBP requirements, HL7 FHIR interoperability and enterprise architecture decisions.',
  keywords: [
    'enterprise software articles',
    'AML compliance blog Pakistan',
    'HIPAA healthcare IT articles',
    'fintech blog Pakistan',
    'software architecture guides',
    'enterprise development insights',
    'GOAML compliance guide',
    'payment gateway articles',
    'cloud architecture enterprise',
    'NovuLabs blog',
  ],
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Insights & Technical Articles | NovuLabs',
    description: 'Deep technical articles on AML compliance, HIPAA healthcare IT, enterprise architecture, and fintech from NovuLabs engineers.',
    url: 'https://www.novulabs.net/blog',
    images: [{ url: '/hero/blog.jpg', width: 1920, height: 1080, alt: 'NovuLabs Insights' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights & Technical Articles | NovuLabs',
    description: 'AML compliance, HIPAA, fintech, and enterprise architecture guides from our engineering team.',
    images: ['/hero/blog.jpg'],
  },
};


export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            name: 'NovuLabs Insights',
            description:
              'Technical guides on goAML integration, STR/CTR reporting, HL7 FHIR interoperability and enterprise architecture.',
            path: '/blog',
            type: 'CollectionPage',
          }),
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            '@id': `${canonical('/blog')}#blog`,
            name: 'NovuLabs Insights',
            url: canonical('/blog'),
            publisher: { '@id': ORG_ID },
            inLanguage: 'en',
            blogPost: blogPosts.map((p) => ({
              '@type': 'BlogPosting',
              '@id': `${canonical(`/blog/${p.slug}`)}#article`,
              headline: p.title,
              url: canonical(`/blog/${p.slug}`),
              datePublished: p.publishedISO,
              dateModified: p.modifiedISO,
              author: { '@type': 'Person', name: p.author, url: canonical(`/team/${p.authorSlug}`) },
            })),
          },
        ]}
      />
      <BlogHero />
      <div className="divider"></div>
      <BlogGrid />
      <PageFaq items={blogFaqs} path="/blog" />
    </>
  );
}
