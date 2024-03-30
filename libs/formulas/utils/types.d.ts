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
  role: string;
}

export type UserCookieData =
  | { status: 'authenticated'; data: UserData; token: string }
  | { status: 'unauthenticated'; data: undefined; token: undefined };
