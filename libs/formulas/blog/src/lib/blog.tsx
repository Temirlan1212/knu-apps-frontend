'use client';
import { EditorProps } from '@/libs/formulas/ui/src/blocknote-view/blocknote-view';
import { blogController } from './data-access';
import { BlogBlocknoteView } from './components/blog-blocknote-view';
import { MoveLeft } from 'lucide-react';
import { Button } from '@/ui/button';
import Link from 'next/link';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface BlogPageProps {}

type BlogUpdateStatusText = 'Сохранено' | 'Ошибка' | 'Нету изменений';

export function BlogPage(props: BlogPageProps) {
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] =
    useState<BlogUpdateStatusText>('Нету изменений');
  const debounceChangeHandler = async (document: EditorProps['document']) => {
    setLoading(true);
    const res = await blogController.update('660c11d129aa6436cf344496', {
      document,
      title: '',
      coverImgUrl: '',
    });
    if (res.ok) setStatusText('Сохранено');
    else setStatusText('Ошибка');
    setLoading(false);
  };

  return (
    <div className="py-6 relative h-full">
      <div className="flex gap-5 flex-wrap justify-between border rounded-[20px] p-2 sticky top-0 z-[1000]">
        <Link href="..">
          <Button variant="ghost" className="rounded-[10px]">
            <MoveLeft />
          </Button>
        </Link>

        <Button variant="ghost" loading={loading} className="rounded-[10px]">
          {statusText}
        </Button>
      </div>
      <BlogBlocknoteView onDebounceChange={debounceChangeHandler} />
    </div>
  );
}

export default BlogPage;
