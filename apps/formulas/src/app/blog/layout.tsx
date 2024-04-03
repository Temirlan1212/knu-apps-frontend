import { Header, NavigationBar } from '@/libs/formulas/layouts/src';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
