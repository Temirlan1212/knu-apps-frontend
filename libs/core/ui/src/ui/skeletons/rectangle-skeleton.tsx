import { Skeleton } from '@/ui/skeleton';
import { cn } from '@/libs/core/ui/src/utils';

export function RecatangleSkeleton({
  rows = 5,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-[15px]">
      <div className="rounded-md">
        {[...Array(rows)].map((_, index) => (
          <div className={`flex items-center space-x-4 py-2`} key={index}>
            <Skeleton className={cn('h-[60px] w-full', className ?? '')} />
          </div>
        ))}
      </div>
    </div>
  );
}
