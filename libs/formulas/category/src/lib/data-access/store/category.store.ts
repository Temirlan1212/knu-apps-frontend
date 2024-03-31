import {
  Category,
  PaginationQuery,
  PaginationResponse,
} from '@/libs/formulas/utils/types';
import { create } from 'zustand';
import { categoryConroller } from '..';
import { ValueOf } from 'next/dist/shared/lib/constants';

interface ICategoryStateProps {
  categories: Category[];
  loading: boolean;
  paginationMeta: PaginationResponse<Category[]>['meta'];
  label: string;
  fetchCategories: ({
    page,
    label,
  }: Partial<PaginationQuery<number>>) => Promise<any>;
  nextPage: () => void;
  previousPage: () => void;
  deleteCategory: (id: Category['id']) => void;
  onDeleteSuccess: () => void;
  updatePaginationMeta: (
    key: keyof PaginationResponse<Category[]>['meta'],
    value: ValueOf<PaginationResponse<Category[]>['meta']>
  ) => void;
}

export const useCategoryState = create<ICategoryStateProps>((set, get) => ({
  categories: [],
  loading: false,
  label: '',
  paginationMeta: {
    total: 0,
    lastPage: 0,
    currentPage: 1,
    perPage: 10,
    prev: null,
    next: null,
  },
  updatePaginationMeta: (key, value) => {
    if (!value) return;
    set({ paginationMeta: { ...get().paginationMeta, [key]: value } });
  },
  fetchCategories: async ({ page, label, perPage }) => {
    set({ loading: true });
    set({ label });
    if (page) get().updatePaginationMeta('currentPage', page);
    if (perPage) get().updatePaginationMeta('perPage', perPage);

    const res = await categoryConroller.findAll({
      page: get().paginationMeta.currentPage,
      perPage: get().paginationMeta.perPage,
      label: get().label,
    });

    if (res.ok) {
      set({ categories: res.result.data });
      set({ paginationMeta: res.result.meta });
    }
    set({ loading: false });
  },
  nextPage: async () => {
    const nextPage = get().paginationMeta.next;
    if (nextPage == null) return;
    get().fetchCategories({ page: nextPage });
  },
  previousPage: async () => {
    const prevPage = get().paginationMeta.prev;
    if (prevPage == null) return;
    get().fetchCategories({ page: prevPage });
  },
  onDeleteSuccess: () => {
    const { total, perPage, currentPage } = get().paginationMeta;
    const maxPage = Math.round((total - 1) / perPage);
    if (currentPage > maxPage && currentPage !== 1) get().previousPage();
    else get().fetchCategories({ page: get().paginationMeta.currentPage });
  },
  deleteCategory: async (id) => {
    const res = await categoryConroller.delete(id);
    if (res.ok) get().onDeleteSuccess();
    return res;
  },
}));

interface ICategoryCuStateProps {
  variant: 'create' | 'update';
  category: Category | null;
  dialog: boolean;
  setDialog: (value: boolean) => void;
  categoryUpdateDialogInit: (category: Category) => void;
  categoryCreateDialogInit: () => void;
}

export const useCategoryCuState = create<ICategoryCuStateProps>((set, get) => ({
  variant: 'create',
  category: null,
  dialog: false,
  setDialog: (value) => set({ dialog: value }),
  categoryUpdateDialogInit: (category) => {
    set({ variant: 'update' });
    set({ category });
    get().setDialog(true);
  },
  categoryCreateDialogInit: () => {
    set({ variant: 'create' });
    set({ category: null });
    get().setDialog(true);
  },
}));
