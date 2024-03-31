export type IRoles = 'CLIENT' | 'ADMIN';

export interface User {
  username: string;
}

export interface UserCredentials extends User {
  password: string;
}

export interface UserData extends User {
  createdAt: string;
  updatedAt: string;
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
