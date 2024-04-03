'use client';
import { useEffect } from 'react';
import { BlogCard } from './blog-card';
import { blogController } from '../data-access';

export interface BlogListProps {}
export function BlogList({}: BlogListProps) {
  return (
    <div className="py-5">
      <BlogCard description="sdfas" title="sdfas" coverImgUrl="" />
    </div>
  );
}
