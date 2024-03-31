'use client';

import { Dialog, DialogContent } from '@/ui/dialog';
import { PropsWithChildren } from 'react';
import { useCategoryCuState } from '../../data-access';

export interface CategoryCuDialogProps {
  slots?: { trigger: React.ReactNode };
}
export function CategoryCuDialog({
  children,
  slots,
}: PropsWithChildren<CategoryCuDialogProps>) {
  const dialog = useCategoryCuState().dialog;
  const setDialog = useCategoryCuState().setDialog;

  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
      <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
    </Dialog>
  );
}

export default CategoryCuDialog;
