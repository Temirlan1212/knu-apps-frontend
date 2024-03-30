'use client';
import { Button } from '@/ui/button';
import { LogOut } from 'lucide-react';
import { authConroller } from '@/libs/formulas/auth/data-access/src';
import { useRouter } from 'next/navigation';

export async function Logout() {
  const { logout } = authConroller();
  const router = useRouter();
  const handleLogout = async () => logout(router);
  return (
    <Button variant="ghost" onClick={handleLogout}>
      <LogOut className="text-destructive" />
    </Button>
  );
}
