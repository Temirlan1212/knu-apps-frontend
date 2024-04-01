'use client';
import { PropsWithChildren } from 'react';
import { useFormulaCuState } from '../../data-access';
import { Sheet, SheetContent } from '@/ui/sheet';
import { useCategoryState } from '@/libs/formulas/category/src/lib/data-access';

export interface FormulaCuDialogProps {
  slots?: { trigger: React.ReactNode };
}
export function FormulaCuDialog({
  children,
  slots,
}: PropsWithChildren<FormulaCuDialogProps>) {
  const dialog = useFormulaCuState().dialog;
  const setDialog = useFormulaCuState().setDialog;

  return (
    <Sheet modal={false} open={dialog} onOpenChange={setDialog}>
      <SheetContent className="sm:!w-[75%] !w-full !max-w-full sm:max-w-full">
        {children}
      </SheetContent>
    </Sheet>
  );
}

export default FormulaCuDialog;
