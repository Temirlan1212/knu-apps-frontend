import { authConroller } from '@/libs/formulas/auth/data-access/src';
import { PropsWithChildren } from 'react';

export function AdminServerWrapperGuard({ children }: PropsWithChildren) {
  const { data, status } = authConroller.getServerSession();
  if (data?.role !== 'ADMIN' || status === 'unauthenticated') {
    return null;
  }
  return children;
}
