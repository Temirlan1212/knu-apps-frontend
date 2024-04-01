'use client';
import { authConroller } from '@/libs/formulas/auth/data-access/src';
import { PropsWithChildren } from 'react';

export function AdminClientWrapperGuard({ children }: PropsWithChildren) {
  const { data, status } = authConroller.getClientSession();
  if (data?.role !== 'ADMIN' || status === 'unauthenticated') {
    return null;
  }
  return <>{children}</>;
}
