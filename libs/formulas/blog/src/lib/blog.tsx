'use client';
import { EditorProps } from '@/libs/formulas/ui/src/blocknote-view/blocknote-view';
import { blogController } from './data-access';
import { BlogBlocknoteView } from './components/blog-blocknote-view';
import { MoveLeft } from 'lucide-react';
import { Button } from '@/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { BlogCoverImage } from './components/blog-cover-image';
import { Blog } from '@/libs/formulas/utils/types';
import { UnsplashImage } from '@/libs/formulas/unsplash/src/lib/data-access/services/services';
import { AdminClientWrapperGuard } from '@/libs/formulas/auth/data-access/src';

export interface BlogPageProps {}

type BlogUpdateStatusText = 'Сохранено' | 'Ошибка' | 'Нету изменений';

export function BlogPage(props: BlogPageProps) {
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] =
    useState<BlogUpdateStatusText>('Нету изменений');

  const handleDebounceChangeHandler = async (
    document: EditorProps['document']
  ) => {
    updateBlog({ document });
  };

  const handleImageSelect = async (imageData: UnsplashImage) => {
    updateBlog({ coverImgUrl: imageData.urls.full });
  };

  const updateBlog = async (blog: Partial<Blog>) => {
    setLoading(true);
    let payload: typeof blog = {};
    if (blog?.coverImgUrl) payload.coverImgUrl = blog.coverImgUrl;
    if (blog?.document) payload.document = blog.document;
    const res = await blogController.update(
      '660c11d129aa6436cf344496',
      payload
    );
    if (res.ok) setStatusText('Сохранено');
    else setStatusText('Ошибка');
    setLoading(false);
  };

  return (
    <div className="py-4 h-full">
      <div className="flex flex-col gap-3">
        <AdminClientWrapperGuard>
          <InfoBar statusText={statusText} loading={loading} />
        </AdminClientWrapperGuard>
        <BlogCoverImage onSelect={handleImageSelect} />
      </div>

      <BlogBlocknoteView onDebounceChange={handleDebounceChangeHandler} />
    </div>
  );
}

export function InfoBar({
  statusText,
  loading,
}: {
  loading: boolean;
  statusText: BlogUpdateStatusText;
}) {
  return (
    <div className="flex gap-5 flex-wrap justify-between border rounded-[20px] p-2 sticky top-2 bg-white dark:bg-black z-[1]">
      <Link href="..">
        <Button variant="ghost" className="rounded-[10px]">
          <MoveLeft />
        </Button>
      </Link>

      <Button variant="ghost" loading={loading} className="rounded-[10px]">
        {statusText}
      </Button>
    </div>
  );
}
