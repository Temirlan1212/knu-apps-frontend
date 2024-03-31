import { authConroller } from '@/libs/formulas/auth/data-access/src';
import './global.css';
import { Header } from '@/libs/formulas/layouts/src';
import { Toaster } from '@/ui/toaster';
import { AuthGuard } from '@/libs/formulas/auth/data-access/src';
export const metadata = {
  title: 'Welcome to apps/frontend/formulas',
  description: 'Generated by create-nx-workspace',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ok } = await authConroller.verifyToken();

  return (
    <html lang="en">
      <body>
        <AuthGuard logout={!ok}>
          <Header />
          {children}
          <Toaster />
        </AuthGuard>
      </body>
    </html>
  );
}
