import { IRouteProps } from '@/libs/formulas/utils/types';

export enum AppRoutes {}

export const RoutePath: Record<AppRoutes, string> = {};

export const routesList: Partial<Record<AppRoutes, IRouteProps>> = {};

export const routes = Object.values(routesList);
