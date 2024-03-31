'use client';
import { PropsWithChildren, useEffect } from 'react';
import { authConroller } from '../conrollers/auth.conroller';
import { useRouter } from 'next/navigation';

export function CheckAuth({ children }: PropsWithChildren) {
  const router = useRouter();
  const verifyToken = async () => {
    const { ok } = await authConroller().verifyToken();
    if (!ok) authConroller().logout(router);
  };
  useEffect(() => {
    verifyToken();
  }, []);
  return children;
}
