// Use this file to export React client components (e.g. those with 'use client' directive) or other non-server utilities

import { loginService } from './lib/services/login.service';

export * from './lib/conrollers/auth.conroller';
export const loginWithCredentials = loginService().loginWithCredentials;
