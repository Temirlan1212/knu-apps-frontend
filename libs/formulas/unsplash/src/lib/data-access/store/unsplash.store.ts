import { UnplashSearchQuery } from '@/libs/formulas/utils/types';
import { create } from 'zustand';

interface IUnsplashStateProps {
  searchQuery: UnplashSearchQuery;
  set: (
    partial:
      | IUnsplashStateProps
      | Partial<IUnsplashStateProps>
      | ((state: IUnsplashStateProps) => IUnsplashStateProps | Partial<any>),
    replace?: boolean | undefined
  ) => void;
  resetSearchQuery: () => void;
}

const INITIAL_SEARCH_QUERY = {
  page: 1,
  per_page: 10,
  searchValue: '',
};

export const useUnsplashState = create<IUnsplashStateProps>((set, get) => ({
  searchQuery: INITIAL_SEARCH_QUERY,
  set: (partial, replace) => set(partial, replace),
  resetSearchQuery: () => set({ searchQuery: INITIAL_SEARCH_QUERY }),
}));
