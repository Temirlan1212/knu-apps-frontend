import { Button } from '@/ui/button';
// import { UserNav } from './user-nav';
import Link from 'next/link';
import { ArrowRightCircle } from 'lucide-react';
// import { getServerSession } from 'next-auth';
// import { options } from '@/app/api/auth/[...nextauth]/options';
import { LogoComponent } from './logo';

export async function Header() {
  // const session = await getServerSession(options);
  return (
    <div className="border-b">
      <div className="container flex items-center h-[4rem] py-1 justify-between">
        <LogoComponent />
        <div className="flex gap-3">
          {/* <ProfileCombox /> */}
          {/* {!!session ? (
            <UserNav {...session} />
          ) : (
            <Link href="sign-in">
              <Button variant="outline">
                <ArrowRightCircle />
              </Button>
            </Link>
          )} */}

          <Link href="sign-in">
            <Button variant="ghost">
              <ArrowRightCircle />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
