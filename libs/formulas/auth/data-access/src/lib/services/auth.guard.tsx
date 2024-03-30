'use client';
import { PropsWithChildren, useEffect } from 'react';
import { authConroller } from '../conrollers/auth.conroller';
import { useRouter } from 'next/navigation';

export function AuthGuard({
  children,
  logout,
}: PropsWithChildren<{ logout: boolean }>) {
  const router = useRouter();
  useEffect(() => {
    if (logout) authConroller().logout(router);
  }, [logout]);
  return children;
}
