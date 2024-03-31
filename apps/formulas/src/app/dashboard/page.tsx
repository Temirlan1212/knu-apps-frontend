import { routes } from '@/libs/formulas/utils/routes/dashboard-routes';
import { redirect } from 'next/navigation';

export default async function Page() {
  redirect(`/${routes[0].path}`);
}
