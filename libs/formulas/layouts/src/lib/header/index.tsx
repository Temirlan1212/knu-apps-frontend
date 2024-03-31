import { Button } from '@/ui/button';
import Link from 'next/link';
import { ArrowRightCircle } from 'lucide-react';
import { LogoComponent } from './logo';
import { authConroller } from '@/libs/formulas/auth/data-access/src';
import { UserNav } from './user-nav';

export async function Header() {
  const { getServerSession } = authConroller;
  const { status, data } = getServerSession();

  return (
    <div className="border-b">
      <div className="container flex items-center h-[4rem] py-1 justify-between">
        <LogoComponent />
        <div className="flex gap-3">
          {status === 'unauthenticated' && (
            <Link href="/login">
              <Button variant="ghost">
                <ArrowRightCircle />
              </Button>
            </Link>
          )}
          {status === 'authenticated' && <UserNav {...data} />}
        </div>
      </div>
    </div>
  );
}
