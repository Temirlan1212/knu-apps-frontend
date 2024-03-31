'use client';
import { Button } from '@/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/card';
import { Input } from '@/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form';
import { toast } from '@/ui/use-toast';
import { useState } from 'react';
import { ICategoryCuSchema, categoryCuSchema } from './category-cu.schema';
import CategoryCuDialog from './category-cu-dialog';
import {
  categoryConroller,
  useCategoryCuState,
  useCategoryState,
} from '../../data-access';
import { ApiResponse } from '@/http';

const variantTextContentSchema = {
  title: { update: 'Редактировать', create: 'Создать' },
  description: {
    update: 'Можете отредактировать название категории',
    create: 'Введите название категории чтобы создать',
  },
  submit: {
    update: 'Сохранить изменения',
    create: 'Создать',
  },
  success: {
    update: 'Вы успешно обновили данные!',
    create: 'Критерия создана!',
  },
};
const { title, description, submit, success } = variantTextContentSchema;

type CategoryCuFormProps = {};

export function CategoryCuForm({}: CategoryCuFormProps) {
  const variant = useCategoryCuState().variant;
  const label = useCategoryCuState().category?.label;
  const id = useCategoryCuState().category?.id;
  const setDialog = useCategoryCuState().setDialog;
  const revalidateCategoryList = useCategoryState().fetchCategories;
  const [loading, setLoading] = useState(false);

  const form = useForm<ICategoryCuSchema>({
    resolver: zodResolver(categoryCuSchema),
    defaultValues: {
      label: '',
    },
    values: { label: variant === 'update' && label ? label : '' },
  });

  async function onSubmit({ label }: ICategoryCuSchema) {
    setLoading(true);

    if (variant === 'create') {
      let res = await categoryConroller['create']({ label });
      reponseHandler(res);
    }

    if (variant === 'update' && id) {
      let res = await categoryConroller['update'](id, label);
      reponseHandler(res);
    }

    function reponseHandler({ ok, message }: ApiResponse<any>) {
      if (ok) {
        revalidateCategoryList({});
        setDialog(false);
        form.reset();
        toast({
          variant: 'success',
          description: success[variant],
        });
      } else {
        if (!Array.isArray(message)) {
          toast({
            variant: 'destructive',
            description: message,
          });
        }
      }
    }
    setLoading(false);
  }

  return (
    <>
      <CategoryCuDialog>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="p-[10px] border-none px-[0] shadow-none">
              <CardHeader className="space-y-1 px-[10px]">
                <CardTitle className="text-2xl">{title[variant]}</CardTitle>
                <CardDescription>{description[variant]}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 px-[10px]">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Название</FormLabel>
                        <FormControl>
                          <Input placeholder="Название категории" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" loading={loading}>
                  {submit[variant]}
                </Button>
              </CardContent>
            </Card>
          </form>
        </Form>
      </CategoryCuDialog>
    </>
  );
}
