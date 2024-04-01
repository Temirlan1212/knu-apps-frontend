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
import { Textarea } from '@/ui/textarea';
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
import { IFormulaCuSchema, formulaCuSchema } from './formula-cu.schema';
import FormulaCuDialog from './formula-cu-dialog';
import {
  formulaConroller,
  useFormulaState,
  useFormulaCuState,
} from '../../data-access';
import { ApiResponse } from '@/http';
import MathKeyboard from '@/libs/formulas/ui/src/math-keyboard';
import { CategoryListFormWithDialog } from '@/libs/formulas/category/src';
import { primitiveArrToObjBooleanValueAsKey } from '@/libs/formulas/utils/helpers';

const variantTextContentSchema = {
  title: { update: 'Редактировать', create: 'Создать' },
  description: {
    update: 'Можете отредактировать',
    create: 'Заполните форму чтобы создать формулу',
  },
  submit: {
    update: 'Сохранить изменения',
    create: 'Создать',
  },
  success: {
    update: 'Вы успешно обновили данные!',
    create: 'Формула создана!',
  },
};
const { title, description, submit, success } = variantTextContentSchema;

type FormulaCuFormProps = {};

export function FormulaCuForm({}: FormulaCuFormProps) {
  const variant = useFormulaCuState().variant;
  const formulaValueState = useFormulaCuState().formula;
  const id = useFormulaCuState().formula?.id;
  const setDialog = useFormulaCuState().setDialog;
  const revalidateformulaList = useFormulaState().fetchFormula;
  const [loading, setLoading] = useState(false);

  const form = useForm<IFormulaCuSchema>({
    resolver: zodResolver(formulaCuSchema),
    defaultValues: {
      title: '',
      latex: '',
      categories: {},
    },
    values: {
      ...formulaValueState,
      categories: primitiveArrToObjBooleanValueAsKey(
        formulaValueState.categoryIds,
        true
      ),
    },
  });

  async function onSubmit({
    latex,
    title,
    description,
    categories,
  }: IFormulaCuSchema) {
    const isValidFormState = await form.trigger();
    if (!isValidFormState) return;
    const categoryIds = Object.keys(categories || {});
    if (categoryIds.length < 1) {
      toast({ variant: 'destructive', title: 'Выберите категорию' });
      return;
    }
    setLoading(true);

    if (variant === 'create') {
      let res = await formulaConroller['create']({
        latex,
        title,
        description,
        categoryIds,
      });
      reponseHandler(res);
    }

    if (variant === 'update' && id) {
      let res = await formulaConroller['update'](id, {
        latex,
        title,
        description,
        categoryIds,
      });
      reponseHandler(res);
    }

    function reponseHandler({ ok, message }: ApiResponse<any>) {
      if (ok) {
        revalidateformulaList({});
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
      <FormulaCuDialog>
        <Form {...form}>
          <Card className="p-[10px] border-none px-[0] shadow-none">
            <CardHeader className="space-y-1 px-[10px]">
              <CardTitle className="text-2xl">{title[variant]}</CardTitle>
              <CardDescription>{description[variant]}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 px-[10px]">
              <div className="flex justify-end">
                <CategoryListFormWithDialog
                  formFieldProps={{
                    name: 'categories',
                    control: form.control,
                  }}
                >
                  Список категорий
                </CategoryListFormWithDialog>
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="latex"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Формула</FormLabel>
                      <FormControl>
                        <MathKeyboard
                          onChangeLatexChange={(value) => field.onChange(value)}
                          initialLatex={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название</FormLabel>
                      <FormControl>
                        <Input placeholder="Название формулы" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Описание</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Описание" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                onClick={() => onSubmit(form.getValues())}
                loading={loading}
              >
                {submit[variant]}
              </Button>
            </CardContent>
          </Card>
        </Form>
      </FormulaCuDialog>
    </>
  );
}
