'use client';
import { useEffect } from 'react';
import { BlogCard } from './blog-card';
import { useBlogState } from '../data-access';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button } from '@/libs/core/ui/src/ui/button';
import { DebounceSearch } from '@/libs/core/ui/src/ui/data-table/debounce-search';
import { useRouter } from 'next/navigation';

export interface BlogListProps {}
export function BlogList({}: BlogListProps) {
  const router = useRouter();
  const {
    blogs,
    fetchBlogs,
    set,
    resetQuery,
    query,
    nextPage,
    loading,
    paginationMeta,
  } = useBlogState();

  useEffect(() => {
    fetchBlogs({ page: 1 });
  }, []);

  return (
    <div className="py-5 flex flex-col gap-5">
      <DebounceSearch
        loading={loading}
        placeholder="Поиск темы"
        onDebounceChange={(text) => {
          set({ blogs: [] });
          resetQuery();
          fetchBlogs({ ...query, title: text, page: 1 });
        }}
      />
      <InfiniteScroll
        dataLength={paginationMeta.total} //This is important field to render the next data
        next={nextPage}
        hasMore={true}
        loader={
          loading && (
            <div className="w-full flex justify-center">
              <Button variant="ghost" loading>
                Загрузка данных
              </Button>
            </div>
          )
        }
        className="flex gap-4 flex-wrap"
      >
        {paginationMeta.total === 0 && !loading && (
          <div className="w-full flex justify-center">
            <Button variant="ghost" disabled>
              {!!query.title ? 'Ничего не найдено' : 'Данных нет'}
            </Button>
          </div>
        )}
        {blogs.map((item, index) => (
          <BlogCard
            key={index}
            description={item.description || '_____'}
            title={item.title || '_____'}
            coverImgUrl={item.coverImgUrl}
            props={{
              button: {
                onClick: () => {
                  router.push(
                    '/blog/' + item.id + '/' + item.blocknoteDocumentId
                  );
                },
              },
            }}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
