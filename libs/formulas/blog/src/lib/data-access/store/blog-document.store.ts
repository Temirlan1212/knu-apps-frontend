import { BlocknoteDocument, Blog } from '@/libs/formulas/utils/types';
import { create } from 'zustand';
import { blocknoteDocumentController, blogController } from '../../data-access';

export interface IBlogDocumentStateProps {
  document: BlocknoteDocument['document'] | null;
  blog: Blog | null;
  loading: boolean;
  blogLoading: 'loading' | 'unmounted' | 'unloading';
  documentLoading: 'loading' | 'unmounted' | 'unloading';
  updateStatus: BlogUpdateStatusText;
  updateBlogDocument: (
    { blogId, documentId }: { blogId: string; documentId: string },
    blog: Partial<BlocknoteDocument & Blog>
  ) => void;
  getDocument: (id: BlocknoteDocument['id']) => void;
  getBlog: (id: Blog['id']) => void;
}

export type BlogUpdateStatusText = 'Сохранено' | 'Ошибка' | 'Нету изменений';

export const useBlogDocumentState = create<IBlogDocumentStateProps>(
  (set, get) => ({
    document: null,
    loading: false,
    blogLoading: 'unmounted',
    documentLoading: 'unmounted',
    blog: null,
    updateStatus: 'Нету изменений',
    updateBlogDocument: async ({ blogId, documentId }, blog) => {
      set({ loading: true });

      let payload: Partial<Blog> = {};
      if (blog?.coverImgUrl) payload.coverImgUrl = blog.coverImgUrl;
      if (blog?.title) payload.title = blog.title;

      const res = await blogController.update(blogId, payload);

      if (res.ok && documentId) {
        const res = await blocknoteDocumentController.update(documentId, {
          document: blog.document,
        });
        if (res.ok) set({ updateStatus: 'Сохранено' });
        else set({ updateStatus: 'Ошибка' });
      }

      set({ loading: false });
    },
    getDocument: async (id: BlocknoteDocument['id']) => {
      set({ documentLoading: 'loading' });
      const res = await blocknoteDocumentController.findOne(id);
      if (res.ok) set({ document: res.result.document || null });
      set({ documentLoading: 'unloading' });
    },
    getBlog: async (id) => {
      set({ blogLoading: 'loading' });
      const res = await blogController.findOne(id);
      if (res.ok) set({ blog: res.result || null });
      set({ blogLoading: 'unloading' });
    },
  })
);
