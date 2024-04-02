import { Header } from '@/libs/formulas/layouts/src';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="container py-3">{children}</div>
    </>
  );
}
