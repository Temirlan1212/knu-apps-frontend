import { AdminRedirectGuard } from '@/libs/formulas/auth/data-access/src/lib/services/admin-redirect.guard';
import { CategoryPage } from '@/libs/formulas/category/src';
export default async function Page() {
  return (
    <>
      <AdminRedirectGuard />
      <CategoryPage />
    </>
  );
}
