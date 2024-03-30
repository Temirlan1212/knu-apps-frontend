export interface User {
  username: string;
  id: number;
}

export interface UserData extends User {
  createdAt: string;
  updatedAt: string;
}

export type UserCookieData =
  | { status: 'authenticated'; data: UserData; token: string }
  | { status: 'unauthenticated'; data: undefined; token: undefined };
