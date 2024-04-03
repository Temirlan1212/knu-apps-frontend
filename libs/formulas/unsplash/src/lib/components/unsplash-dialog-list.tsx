'use client';
import {
  UnsplashList,
  UnsplashListProps,
  useUnsplashState,
} from '@/libs/formulas/unsplash/src';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/ui/sheet';
import { useEffect, useState } from 'react';
import { AdminClientWrapperGuard } from '@/libs/formulas/auth/data-access/src';

export function UnsplashDialogList(props: UnsplashListProps) {
  const [open, setOpen] = useState(false);
  const resetSearchQuery = useUnsplashState((state) => state.resetSearchQuery);
  useEffect(() => {
    return () => resetSearchQuery();
  }, []);

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <AdminClientWrapperGuard>
          <SheetTrigger className="w-[fit-content] bg-accent/70 hover:bg-accent px-4 py-2 !rounded-[10px] absolute top-3 right-3">
            Поменять
          </SheetTrigger>
        </AdminClientWrapperGuard>

        <SheetContent className="sm:!w-[75%] !w-full !max-w-full sm:max-w-full px-0">
          <UnsplashList
            {...props}
            onSelect={(imageData) => {
              props?.onSelect && props.onSelect(imageData);
              setOpen(false);
            }}
            props={{
              imageProps: {
                height: '300px',
                width: '320px',
              },
              wrapperProps: {
                className: 'overlow-scroll max-h-[600px]',
              },
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
