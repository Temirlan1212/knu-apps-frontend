'use client';
import { PropsWithChildren } from 'react';
import { useFormulaCuState } from '../../data-access';
import { Sheet, SheetContent } from '@/ui/sheet';

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
      <SheetContent className="!w-full !max-w-full sm:max-w-full">
        {children}
      </SheetContent>
    </Sheet>
  );
}

export default FormulaCuDialog;
