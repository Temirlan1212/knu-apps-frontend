'use client';
import { authConroller } from '@/libs/formulas/auth/data-access/src';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

export function Logout({ children }: PropsWithChildren) {
  const { logout } = authConroller;
  const router = useRouter();
  const handleLogout = async () => logout(router);
  return <div onClick={handleLogout}>{children}</div>;
}
