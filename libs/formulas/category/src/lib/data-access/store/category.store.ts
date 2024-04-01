import {
  Category,
  CategoryPaginationQuery,
  PaginationResponse,
} from '@/libs/formulas/utils/types';
import { create } from 'zustand';
import { categoryConroller } from '..';
import { ValueOf } from 'next/dist/shared/lib/constants';
import { RowSelectionState } from '@tanstack/react-table';

interface ICategoryStateProps {
  selectedCategoriesInIds: RowSelectionState;
  categories: Category[];
  loading: boolean;
  paginationMeta: PaginationResponse<Category[]>['meta'];
  label: string;
  query: CategoryPaginationQuery;
  fetchCategories: ({
    page,
    label,
  }: Partial<CategoryPaginationQuery>) => Promise<any>;
  nextPage: () => void;
  previousPage: () => void;
  deleteCategory: (id: Category['id']) => void;
  onDeleteSuccess: () => void;
  updatePaginationMeta: (
    key: keyof PaginationResponse<Category[]>['meta'],
    value: ValueOf<PaginationResponse<Category[]>['meta']>
  ) => void;
  updateQuery: (
    key: keyof CategoryPaginationQuery,
    value: ValueOf<CategoryPaginationQuery>
  ) => void;
  set: (
    partial:
      | ICategoryStateProps
      | Partial<ICategoryStateProps>
      | ((state: ICategoryStateProps) => ICategoryStateProps | Partial<any>),
    replace?: boolean | undefined
  ) => void;
}

const PER_PAGE = 10;

export const useCategoryState = create<ICategoryStateProps>((set, get) => ({
  selectedCategoriesInIds: {},
  categories: [],
  loading: false,
  label: '',
  query: {
    label: '',
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
  fetchCategories: async ({ page, label, perPage }) => {
    set({ loading: true });
    if (page) get().updateQuery('page', page);
    if (perPage) get().updateQuery('perPage', perPage);
    get().updateQuery('label', label ? label : '');

    const res = await categoryConroller.findAll({
      page: get().query.page,
      perPage: get().query.perPage,
      label: get().query.label,
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
    const { total, currentPage } = get().paginationMeta;
    const maxPage = Math.round((total - 1) / PER_PAGE);
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
