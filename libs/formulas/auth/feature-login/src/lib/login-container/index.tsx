import { redirect } from 'next/navigation';
import { LoginForm } from '../login-form';
import { authConroller } from '@/libs/formulas/auth/data-access/src';

export function LoginContainer() {
  const { status } = authConroller().getServerSession();
  if (status === 'authenticated') redirect('..');
  return (
    <div className="h-[80dvh] flex justify-center items-center">
      <LoginForm />
    </div>
  );
}
