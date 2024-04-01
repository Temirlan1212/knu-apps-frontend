'use client';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/libs/core/ui/src/ui/form';
import { UseControllerProps } from 'react-hook-form';
import CategoryList from './category-list';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/ui/dialog';
import { PropsWithChildren } from 'react';

export interface CategoryFormListProps {
  formFieldProps: UseControllerProps<any>;
}

export function CategoryListForm({ formFieldProps }: CategoryFormListProps) {
  return (
    <div>
      <FormField
        {...formFieldProps}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <CategoryList
                props={{
                  dataTable: {
                    rowSelection: field.value as any,
                    onRowSelectionChange: (value) => {
                      field.onChange(value);
                    },
                  },
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export function CategoryListFormWithDialog({
  formFieldProps,
  children,
}: PropsWithChildren<CategoryFormListProps>) {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="w-[fit-content] bg-accent p-3 !rounded-[10px]">
          {children}
        </DialogTrigger>
        <DialogContent>
          <CategoryListForm formFieldProps={formFieldProps} />
          <div className="w-full flex justify-end">
            <DialogClose className="w-[fit-content] bg-accent py-3 px-5 !rounded-[10px]">
              Выбрать
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
