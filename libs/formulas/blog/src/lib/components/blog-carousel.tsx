'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/ui/carousel';
import { useBlogState } from '../data-access';
import { useEffect } from 'react';
import { Skeleton } from '@/ui/skeleton';
import { BlogCard } from './blog-card';
import { redirect, useRouter } from 'next/navigation';

export function BlogCarousel() {
  const router = useRouter();
  const fetchBlog = useBlogState((state) => state.fetchBlogs);
  const blogs = useBlogState((state) => state.blogs);
  const loading = useBlogState((state) => state.loading);

  useEffect(() => {
    fetchBlog({ page: 1, perPage: 10 });
  }, []);

  return (
    <div>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full min-h-[340px]"
      >
        <CarouselContent>
          {loading &&
            Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <Skeleton className="h-[300px] rounded-[20px]" />
              </CarouselItem>
            ))}
          {!loading &&
            Object.values(blogs)
              .flat(1)
              .map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <BlogCard
                    {...item}
                    props={{
                      card: {
                        className: 'h-[340px] w-full',
                      },
                      button: {
                        onClick: () => {
                          router.push(
                            '/blog/' + item.id + '/' + item.blocknoteDocumentId
                          );
                        },
                      },
                    }}
                  />
                </CarouselItem>
              ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </div>
  );
}
