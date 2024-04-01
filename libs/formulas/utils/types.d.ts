export type ServerTimestampt = { createdAt: string; updatedAt: string };
export type IRoles = 'CLIENT' | 'ADMIN';

export interface User {
  username: string;
}

export interface UserCredentials extends User {
  password: string;
}

export interface UserData extends User, ServerTimestampt {
  id: number;
  role: IRoles;
}

export type UserCookieData =
  | { status: 'authenticated'; data: UserData; token: string }
  | { status: 'unauthenticated'; data: undefined; token: undefined };

export interface IChildRouteData {
  icon: string;
  activeRoutes: string[];
}

export interface IChildRoute extends Partial<IChildRouteData> {
  title: string;
  path: string;
  role: IRoles;
}

export interface IChildRouteDefault extends IChildRoute {
  type: 'link';
}

export interface IChildRouteGroup extends IChildRoute {
  type: 'group';
  children: IChildRoute[];
  bottomDivider?: boolean;
}

export type IRouteProps = IChildRouteDefault | IChildRouteGroup;

export type Category = {
  label: string;
  id: string;
} & ServerTimestampt;

export type Formula = {
  title: string;
  latex: string;
  description: string;
  id: string;
  categoryIds: string[];
} & Partial<ServerTimestampt>;

export interface PaginationResponse<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}
export interface PaginationQuery<T extends number> {
  perPage: T;
  page: T;
}

export interface CategoryPaginationQuery extends PaginationQuery<number> {
  label: string;
}

export interface FormulaPaginationQuery extends PaginationQuery<number> {
  title: string;
  description: string;
  latex: string;
}
