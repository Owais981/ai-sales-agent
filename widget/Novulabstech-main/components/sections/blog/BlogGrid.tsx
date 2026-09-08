"use client";

import React, { useState } from 'react';
import { blogPosts } from '@/content/blogPosts';
import BlogCard from '@/components/ui/BlogCard';

const BlogGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Compliance', 'Healthcare', 'Enterprise'];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === selectedCategory);

  return (
    <section className="sec bg-g" id="blog-grid">
      <div className="container">
        {/* Categories filters */}
        <div className="pfilter justify-content-center mb-5" data-reveal="up">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pfbtn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        {filteredPosts.length > 0 ? (
          <div className="row g-4">
            {filteredPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-5" data-reveal="up">
            <i className="bi bi-journal-x" style={{ fontSize: '3rem', color: 'var(--tx4)', opacity: 0.5 }}></i>
            <h4 className="mt-3" style={{ color: 'var(--tx2)' }}>No posts found in this category.</h4>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;
