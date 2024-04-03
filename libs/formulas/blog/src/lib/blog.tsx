'use client';
import { EditorProps } from '@/libs/formulas/ui/src/blocknote-view/blocknote-view';
import { blocknoteDocumentController, blogController } from './data-access';
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
    const title = (document[0] as any).content[0]?.text || '';
    const description = (document[1] as any).content[0]?.tex || '';
    updateBlog({
      document,
      title,
      description,
      id: '660d25ca43d2d72c772b702e',
    });
  };

  const handleImageSelect = async (imageData: UnsplashImage) => {
    updateBlog({
      coverImgUrl: imageData.urls.full,
      id: '660d25ca43d2d72c772b702e',
    });
  };

  const updateBlog = async (blog: Partial<Blog> & { id: string }) => {
    setLoading(true);

    let payload: Partial<Blog> = {};
    if (blog?.coverImgUrl) payload.coverImgUrl = blog.coverImgUrl;
    if (blog?.title) payload.title = blog.title;

    const res = await blogController.update(blog.id, payload);

    const id = res?.result?.blocknoteDocumentId;

    if (res.ok && id) {
      const res = await blocknoteDocumentController.update(id, {
        document: blog.document,
      });
      if (res.ok) setStatusText('Сохранено');
      else setStatusText('Ошибка');
    }

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
      <div className="mt-[40px]">
        <BlogBlocknoteView onDebounceChange={handleDebounceChangeHandler} />
      </div>
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
