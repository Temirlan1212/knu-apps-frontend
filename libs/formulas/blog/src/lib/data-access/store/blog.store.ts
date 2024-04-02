import {
  Blog,
  BlogPaginationQuery,
  PaginationResponse,
} from '@/libs/formulas/utils/types';
import { create } from 'zustand';
import { blogController } from '..';
import { ValueOf } from 'next/dist/shared/lib/constants';
import { RowSelectionState } from '@tanstack/react-table';

interface IBlogStateProps {
  selectedBlogsInIds: RowSelectionState;
  blogs: Blog[];
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
}

const PER_PAGE = 10;

export const useBlogState = create<IBlogStateProps>((set, get) => ({
  selectedBlogsInIds: {},
  blogs: [],
  loading: false,
  title: '',
  query: {
    title: '',
    perPage: PER_PAGE,
    page: 0,
  },
  paginationMeta: {
    total: 0,
    lastPage: 0,
    currentPage: 1,
    perPage: PER_PAGE,
    prev: null,
    next: null,
  },
  set: (partial, replace) => set(partial, replace),
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
      page: get().query.page,
      perPage: get().query.perPage,
      title: get().query.title,
    });

    if (res.ok) {
      set({ blogs: res.result.data });
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
