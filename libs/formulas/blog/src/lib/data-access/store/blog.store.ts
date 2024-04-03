import {
  Blog,
  BlogPaginationQuery,
  PaginationResponse,
} from '@/libs/formulas/utils/types';
import { create } from 'zustand';
import { blocknoteDocumentController, blogController } from '..';
import { ValueOf } from 'next/dist/shared/lib/constants';
import { RowSelectionState } from '@tanstack/react-table';

interface IBlogStateProps {
  selectedBlogsInIds: RowSelectionState;
  selectedBlog: Blog | null;
  blogs: Record<string, Blog[]>;
  loading: boolean;
  paginationMeta: PaginationResponse<Blog[]>['meta'];
  title: string;
  query: BlogPaginationQuery;
  fetchBlogs: ({ page, title }: Partial<BlogPaginationQuery>) => Promise<any>;
  nextPage: () => void;
  previousPage: () => void;
  deleteBlog: (id: Blog['id']) => void;
  onDeleteSuccess: () => void;
  updatePaginationMeta: (
    key: keyof PaginationResponse<Blog[]>['meta'],
    value: ValueOf<PaginationResponse<Blog[]>['meta']>
  ) => void;
  updateQuery: (
    key: keyof BlogPaginationQuery,
    value: ValueOf<BlogPaginationQuery>
  ) => void;
  set: (
    partial:
      | IBlogStateProps
      | Partial<IBlogStateProps>
      | ((state: IBlogStateProps) => IBlogStateProps | Partial<any>),
    replace?: boolean | undefined
  ) => void;
  resetQuery: () => void;
  createBlog: (blog?: Partial<Blog>) => void;
}

const PER_PAGE = 10;

const INITIAL_QUERY = {
  title: '',
  perPage: PER_PAGE,
  page: 0,
};

export const useBlogState = create<IBlogStateProps>((set, get) => ({
  selectedBlogsInIds: {},
  selectedBlog: null,
  blogs: {},
  loading: false,
  title: '',
  query: INITIAL_QUERY,
  paginationMeta: {
    total: 0,
    lastPage: 0,
    currentPage: 1,
    perPage: PER_PAGE,
    prev: null,
    next: null,
  },
  set: (partial, replace) => set(partial, replace),
  resetQuery: () => set({ query: INITIAL_QUERY }),
  updatePaginationMeta: (key, value) => {
    if (!value) return;
    set({ paginationMeta: { ...get().paginationMeta, [key]: value } });
  },
  updateQuery: (key, value) => {
    set({ query: { ...get().query, [key]: value } });
  },
  fetchBlogs: async ({ page, title, perPage }) => {
    set({ loading: true });
    if (page) get().updateQuery('page', page);
    if (perPage) get().updateQuery('perPage', perPage);
    get().updateQuery('title', title ? title : '');

    const res = await blogController.findAll({
      page: get().query.page || 1,
      perPage: get().query.perPage,
      title: get().query.title,
    });

    if (res.ok) {
      set({ blogs: { [String(get().query.page)]: res.result.data } });
      set({ paginationMeta: res.result.meta });
    }
    set({ loading: false });
  },
  nextPage: async () => {
    const nextPage = get().paginationMeta.next;
    if (nextPage == null) return;
    get().fetchBlogs({ page: nextPage });
  },
  previousPage: async () => {
    const prevPage = get().paginationMeta.prev;
    if (prevPage == null) return;
    get().fetchBlogs({ page: prevPage });
  },
  onDeleteSuccess: () => {
    const { total, currentPage } = get().paginationMeta;
    const maxPage = Math.round((total - 1) / PER_PAGE);
    if (currentPage > maxPage && currentPage !== 1) get().previousPage();
    else get().fetchBlogs({ page: get().paginationMeta.currentPage });
  },
  deleteBlog: async (id) => {
    const res = await blogController.delete(id);
    if (res.ok) get().onDeleteSuccess();
    return res;
  },
  createBlog: async (blog) => {
    set({ loading: true });
    const res = await blocknoteDocumentController.create({ document: '[]' });
    const id = res?.result?.id;

    if (res.ok && id) {
      let payload: typeof blog = {
        coverImgUrl:
          'https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b25lJTIwY29sb3J8ZW58MHx8MHx8fDA%3D',
      };
      if (blog?.coverImgUrl) payload.coverImgUrl = blog.coverImgUrl;
      const res = await blogController.create({
        ...payload,
        blocknoteDocumentId: id,
      });
      if (res.ok) {
        get().fetchBlogs({ ...get().query, page: 0 });
      }
    }
    set({ loading: false });
  },
}));

interface IBlogCuStateProps {
  variant: 'create' | 'update';
  blog: Blog | null;
  dialog: boolean;
  setDialog: (value: boolean) => void;
  categoryUpdateDialogInit: (category: Blog) => void;
  categoryCreateDialogInit: () => void;
}

export const useBlogCuState = create<IBlogCuStateProps>((set, get) => ({
  variant: 'create',
  blog: null,
  dialog: false,
  setDialog: (value) => set({ dialog: value }),
  categoryUpdateDialogInit: (blog) => {
    set({ variant: 'update' });
    set({ blog });
    get().setDialog(true);
  },
  categoryCreateDialogInit: () => {
    set({ variant: 'create' });
    set({ blog: null });
    get().setDialog(true);
  },
}));
