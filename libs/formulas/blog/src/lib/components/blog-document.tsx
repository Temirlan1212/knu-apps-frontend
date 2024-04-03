'use client';
import { EditorProps } from '@/libs/formulas/ui/src/blocknote-view/blocknote-view';
import { useBlogDocumentState } from '../data-access';
import { BlogBlocknoteView, initBlock } from './blog-blocknote-view';
import { BlogCoverImage } from './blog-cover-image';
import { UnsplashImage } from '@/libs/formulas/unsplash/src/lib/data-access/services/services';
import { AdminClientWrapperGuard } from '@/libs/formulas/auth/data-access/src';
import { BlogDocumentInfoBar } from './blog-document-info-bar';
import { useEffect } from 'react';
import { Skeleton } from '@/libs/core/ui/src/ui/skeleton';
import { RecatangleSkeleton } from '@/libs/core/ui/src/ui/skeletons/rectangle-skeleton';

export interface BlogDocumentProps {
  blogDocumentSlug: string;
  blogSlug: string;
}

const defaultImageUrl =
  'https://images.unsplash.com/photo-1705518072779-eaf101a185a4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8JUQwJUI2JUQwJUI1JUQwJUJCJUQxJTgyJUQxJThCJUQwJUI5fGVufDB8fDB8fHww';

export function BlogDocument(props: BlogDocumentProps) {
  const {
    loading,
    updateStatus,
    document,
    blog,
    blogLoading,
    documentLoading,
    updateBlogDocument,
    getDocument,
    getBlog,
  } = useBlogDocumentState();

  const ids = { blogId: props.blogSlug, documentId: props.blogDocumentSlug };

  const handleDebounceChangeHandler = async (
    document: EditorProps['document']
  ) => {
    const title = (document[0] as any).content[0]?.text || '';
    const description = (document[1] as any).content[0]?.text || '';
    updateBlogDocument(ids, {
      document,
      title,
      description,
    });
  };

  const handleImageSelect = async (imageData: UnsplashImage) => {
    updateBlogDocument(ids, {
      coverImgUrl: imageData.urls.full,
    });
  };

  useEffect(() => {
    getDocument(ids.documentId);
    getBlog(ids.blogId);
  }, []);

  return (
    <div className="py-4 h-full">
      <div className="flex flex-col gap-3">
        <AdminClientWrapperGuard>
          <BlogDocumentInfoBar statusText={updateStatus} loading={loading} />
        </AdminClientWrapperGuard>

        {blogLoading === 'unloading' ? (
          <BlogCoverImage
            onSelect={handleImageSelect}
            defaultImageUrl={blog?.coverImgUrl || defaultImageUrl}
          />
        ) : (
          <Skeleton className="w-full h-[400px] rounded-[10px]" />
        )}
      </div>
      <div className="mt-[40px]">
        {documentLoading === 'unloading' ? (
          <BlogBlocknoteView
            initialContent={
              (Array.isArray(document) && document.length > 0 && document) ||
              initBlock({ descr: 'Заголовок', title: 'Описание' })
            }
            onDebounceChange={handleDebounceChangeHandler}
          />
        ) : (
          <RecatangleSkeleton className="w-full h-[40px] rounded-[10px]" />
        )}
      </div>
    </div>
  );
}
