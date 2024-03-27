'use client';
import { SiWolframmathematica } from 'react-icons/si';
import Link from 'next/link';

export function LogoComponent() {
  return (
    <Link href="/">
      <SiWolframmathematica size={'30px'} />
    </Link>
  );
}
