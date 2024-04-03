'use client';
import {
  UnsplashList,
  UnsplashListProps,
  useUnsplashState,
} from '@/libs/formulas/unsplash/src';
import { Dialog, DialogContent, DialogTrigger } from '@/ui/dialog';
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
      <Dialog open={open} onOpenChange={setOpen}>
        <AdminClientWrapperGuard>
          <DialogTrigger className="w-[fit-content] bg-accent/70 hover:bg-accent px-4 py-2 !rounded-[10px] absolute top-3 right-3">
            Поменять
          </DialogTrigger>
        </AdminClientWrapperGuard>

        <DialogContent>
          <UnsplashList
            {...props}
            onSelect={(imageData) => {
              props?.onSelect && props.onSelect(imageData);
              setOpen(false);
            }}
            props={{
              imageProps: {
                height: '100px',
                width: '100px',
              },
              wrapperProps: {
                className: 'overlow-scroll max-h-[200px]',
              },
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
