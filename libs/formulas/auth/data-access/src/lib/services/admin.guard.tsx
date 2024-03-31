import { authConroller } from '@/libs/formulas/auth/data-access/src';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function AdminGuard({ children }: PropsWithChildren) {
  const { data, status } = authConroller.getServerSession();
  if (data?.role !== 'ADMIN' || status === 'unauthenticated') {
    redirect('..');
  }
  return <>{children}</>;
}
