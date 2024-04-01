export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container py-3">{children}</div>;
}
