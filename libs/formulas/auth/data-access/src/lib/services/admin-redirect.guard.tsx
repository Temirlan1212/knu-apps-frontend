import { authConroller } from '@/libs/formulas/auth/data-access/src';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export async function AdminRedirectGuard({ children }: PropsWithChildren) {
  const { data, status } = authConroller.getServerSession();
  if (data?.role !== 'ADMIN' || status === 'unauthenticated') {
    redirect('..');
  }
  return <>{children}</>;
}
