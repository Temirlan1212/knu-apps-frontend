import {
  Formula,
  FormulaPaginationQuery,
  PaginationQuery,
  PaginationResponse,
} from '@/libs/formulas/utils/types';
import { create } from 'zustand';
import { formulaConroller } from '..';
import { ValueOf } from 'next/dist/shared/lib/constants';

interface IFormulaStateProps {
  formula: Formula[];
  loading: boolean;
  paginationMeta: PaginationResponse<Formula[]>['meta'];
  fetchFormula: ({
    page,
    title,
  }: Partial<FormulaPaginationQuery>) => Promise<any>;
  query: FormulaPaginationQuery;
  nextPage: () => void;
  previousPage: () => void;
  deleteFormula: (id: Formula['id']) => void;
  onDeleteSuccess: () => void;
  updatePaginationMeta: (
    key: keyof PaginationResponse<Formula[]>['meta'],
    value: ValueOf<PaginationResponse<Formula[]>['meta']>
  ) => void;
  updateQuery: (
    key: keyof FormulaPaginationQuery,
    value: ValueOf<FormulaPaginationQuery>
  ) => void;
}

const PER_PAGE = 10;

export const useFormulaState = create<IFormulaStateProps>((set, get) => ({
  formula: [],
  loading: false,
  query: {
    title: '',
    description: '',
    latex: '',
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
  updatePaginationMeta: (key, value) => {
    if (!value) return;
    set({ paginationMeta: { ...get().paginationMeta, [key]: value } });
  },
  updateQuery: (key, value) => {
    set({ query: { ...get().query, [key]: value } });
  },
  fetchFormula: async ({ page, title, description, latex, perPage }) => {
    set({ loading: true });
    if (page) get().updateQuery('page', page);
    if (perPage) get().updateQuery('perPage', perPage);
    get().updateQuery('latex', latex ? latex : '');
    get().updateQuery('description', description ? description : '');
    get().updateQuery('title', title ? title : '');

    const res = await formulaConroller.findAll({
      page: get().query.page,
      perPage: get().query.perPage,
      title: get().query.title,
      description: get().query.description,
      latex: get().query.latex,
    });

    if (res.ok) {
      set({ formula: res.result.data });
      set({ paginationMeta: res.result.meta });
    }
    set({ loading: false });
  },
  nextPage: async () => {
    const nextPage = get().paginationMeta.next;
    if (nextPage == null) return;
    get().fetchFormula({ page: nextPage });
  },
  previousPage: async () => {
    const prevPage = get().paginationMeta.prev;
    if (prevPage == null) return;
    get().fetchFormula({ page: prevPage });
  },
  onDeleteSuccess: () => {
    const { total, currentPage } = get().paginationMeta;
    const maxPage = Math.round((total - 1) / PER_PAGE);
    if (currentPage > maxPage && currentPage !== 1) get().previousPage();
    else get().fetchFormula({ page: get().paginationMeta.currentPage });
  },
  deleteFormula: async (id: any) => {
    const res = await formulaConroller.delete(id);
    if (res.ok) get().onDeleteSuccess();
    return res;
  },
}));

interface IFormulaCuStateProps {
  variant: 'create' | 'update';
  formula: Formula | null;
  dialog: boolean;
  setDialog: (value: boolean) => void;
  formulaUpdateDialogInit: (formula: Formula) => void;
  formulaCreateDialogInit: () => void;
}

export const useFormulaCuState = create<IFormulaCuStateProps>((set, get) => ({
  variant: 'create',
  formula: null,
  dialog: false,
  setDialog: (value) => set({ dialog: value }),
  formulaUpdateDialogInit: (formula) => {
    set({ variant: 'update' });
    set({ formula });
    get().setDialog(true);
  },
  formulaCreateDialogInit: () => {
    set({ variant: 'create' });
    set({ formula: null });
    get().setDialog(true);
  },
}));
