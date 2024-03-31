import AdminGuard from '@/libs/formulas/auth/data-access/src/lib/services/admin.guard';
import { CategoryPage } from '@/libs/formulas/category/src';
export default async function Page() {
  return (
    <>
      <AdminGuard />
      <CategoryPage />
    </>
  );
}
