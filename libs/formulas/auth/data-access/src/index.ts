// Use this file to export React client components (e.g. those with 'use client' directive) or other non-server utilities

import { loginService } from './lib/services/login.service';
// import { authConroller } from './lib/conrollers/auth.conroller';

export * from './lib/conrollers/auth.conroller';
export * from './lib/services/auth.guard';
export const loginWithCredentials = loginService().loginWithCredentials;
// export const verifyTokenValidity = authConroller().verifyToken;
