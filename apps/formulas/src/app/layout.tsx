import './global.css';
import { Header } from '@/libs/formulas/layouts/src';

export const metadata = {
  title: 'Welcome to apps/frontend/formulas',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
