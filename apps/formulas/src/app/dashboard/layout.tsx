import { NavigationBar } from '@/libs/formulas/layouts/src';
import { AdminRedirectGuard } from '@/libs/formulas/auth/data-access/src/lib/services/admin-redirect.guard';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRedirectGuard>
      <div className="container py-3">
        <NavigationBar>{children}</NavigationBar>
      </div>
    </AdminRedirectGuard>
  );
}
