import { IRouteProps } from '@/libs/formulas/utils/types';

export enum AppRoutes {
  MAIN = 'dashboard',
  CATEGORIES = 'categories',
  USERS = 'users',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: 'dashboard',
  [AppRoutes.CATEGORIES]: 'dashboard/category',
  [AppRoutes.USERS]: 'dashboard/users',
};

export const routesList: Partial<Record<AppRoutes, IRouteProps>> = {
  [AppRoutes.CATEGORIES]: {
    title: 'Категории',
    path: RoutePath.categories,
    type: 'link',
    role: 'ADMIN',
  },
  [AppRoutes.USERS]: {
    title: 'Пользователи',
    path: RoutePath.users,
    type: 'link',
    role: 'ADMIN',
  },
};

export const routes = Object.values(routesList);
