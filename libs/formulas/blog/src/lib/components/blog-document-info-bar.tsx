'use client';

import { MoveLeft } from 'lucide-react';
import { Button } from '@/ui/button';
import Link from 'next/link';
import { BlogUpdateStatusText } from '../data-access';

export function BlogDocumentInfoBar({
  statusText,
  loading,
}: {
  loading: boolean;
  statusText: BlogUpdateStatusText;
}) {
  return (
    <div className="flex gap-5 flex-wrap justify-between border rounded-[20px] p-2 sticky top-2 bg-white dark:bg-black z-[1]">
      <Link href="..">
        <Button variant="ghost" className="rounded-[10px]">
          <MoveLeft />
        </Button>
      </Link>

      <Button variant="ghost" loading={loading} className="rounded-[10px]">
        {statusText}
      </Button>
    </div>
  );
}
