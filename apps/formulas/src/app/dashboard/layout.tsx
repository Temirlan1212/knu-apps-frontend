import { NavigationBar } from '@/libs/formulas/layouts/src';
import { authConroller } from '@/libs/formulas/auth/data-access/src';
import { notFound } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, data } = authConroller.getServerSession();
  if (status === 'authenticated' && data?.role === 'ADMIN') {
    return (
      <div className="container py-3">
        <NavigationBar>{children}</NavigationBar>
      </div>
    );
  } else {
    return notFound();
  }
}
