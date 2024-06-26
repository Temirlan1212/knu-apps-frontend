import { authConroller } from '@/libs/formulas/auth/data-access/src';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function AuthGuard({ children }: PropsWithChildren) {
  const { status } = authConroller.getServerSession();
  if (status === 'unauthenticated') {
    redirect('..');
  }
  return <>{children}</>;
}
