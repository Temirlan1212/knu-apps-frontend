import { NavigationBar } from '@/libs/formulas/layouts/src';
import AdminGuard from '@/libs/formulas/auth/data-access/src/lib/services/admin.guard';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="container py-3">
        <NavigationBar>{children}</NavigationBar>
      </div>
    </AdminGuard>
  );
}
