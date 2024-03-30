// Use this file to export React client components (e.g. those with 'use client' directive) or other non-server utilities

import { authConroller as authConrollerLocal } from './lib/conrollers/auth.conroller';
const authConroller = authConrollerLocal();

export * from './lib/services/auth.guard';
export { authConroller };
