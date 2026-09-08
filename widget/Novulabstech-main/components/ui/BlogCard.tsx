import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  return (
    <div className="col-md-6 col-lg-4" data-reveal="up">
      <div className="pcard h-100" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="pimg-wrap" style={{ height: '200px' }}>
          <Image
            className="pimg"
            src={post.coverImage}
            alt={post.coverAlt}
            width={1200}
            height={630}
            sizes="(max-width: 768px) 100vw, 33vw"
            loading={index < 3 ? 'eager' : 'lazy'}
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="pbody" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="ptag" style={{ margin: 0 }}>{post.category}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--tx4)' }}>{post.readTime}</span>
          </div>
          <h2 className="ptitle" style={{ fontSize: '1.15rem', lineHeight: '1.4', marginBottom: '10px' }}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <p className="pdesc" style={{ fontSize: '0.85rem', flex: 1 }}>{post.description}</p>
          <div style={{ fontSize: '0.78rem', color: 'var(--tx4)', marginBottom: '15px' }}>
            <span>By {post.author}</span> • <time dateTime={post.publishedISO}>{post.date}</time>
          </div>
          <div>
            <Button href={`/blog/${post.slug}`} variant="glass" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
              Read Article <i className="bi bi-arrow-right ms-1"></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
