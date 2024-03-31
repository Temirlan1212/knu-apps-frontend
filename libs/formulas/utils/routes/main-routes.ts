import { IRouteProps } from '@/libs/formulas/utils/types';
import { RoutePath as DashboardRoutePath } from './dashboard-routes';

export enum AppRoutes {
  MAIN = 'main',
  DASHBOARD = 'dashboard',
  ABOUT = 'about',
  CONTACTS = 'contacts',
  SIGN_UP = 'sign-up',
  SIGN_IN = 'sign-in',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '',
  [AppRoutes.DASHBOARD]: 'dashboard',
  [AppRoutes.ABOUT]: 'about',
  [AppRoutes.CONTACTS]: 'contacts',
  [AppRoutes.SIGN_UP]: 'sign-up',
  [AppRoutes.SIGN_IN]: 'sign-in',
};

export const routesList: Partial<Record<AppRoutes, IRouteProps>> = {
  [AppRoutes.MAIN]: {
    title: 'Home page',
    path: RoutePath.main,
    type: 'link',
    role: 'CLIENT',
  },
  [AppRoutes.DASHBOARD]: {
    title: 'Dashboard',
    path: RoutePath.dashboard,
    type: 'link',
    role: 'ADMIN',
    activeRoutes: [
      ...Object.values(DashboardRoutePath).map((route) => `/${route}`),
      `${DashboardRoutePath['products-edit']}/*`,
    ],
  },
  [AppRoutes.ABOUT]: {
    title: 'About',
    path: RoutePath.about,
    type: 'link',
    role: 'CLIENT',
  },
  [AppRoutes.CONTACTS]: {
    title: 'Contacts',
    path: RoutePath.contacts,
    type: 'link',
    role: 'CLIENT',
  },
};

export const routes = Object.values(routesList);
