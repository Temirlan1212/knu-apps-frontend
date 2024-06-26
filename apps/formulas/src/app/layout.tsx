import './global.css';
import { Toaster } from '@/ui/toaster';
import { CheckAuth } from '@/libs/formulas/auth/data-access/src';
import NextTopLoader from 'nextjs-toploader';

export const metadata = {
  title: 'Welcome to apps/frontend/formulas',
  description: 'Generated by create-nx-workspace',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CheckAuth>
          <NextTopLoader color="black" />
          {children}
          <Toaster />
        </CheckAuth>
      </body>
    </html>
  );
}
