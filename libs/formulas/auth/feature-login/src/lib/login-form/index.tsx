'use client';
import { Button } from '@/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card';
import { Input } from '@/ui/input';
import Link from 'next/link';
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
import { useState } from 'react';
import { IUserFormSchema, userFormSchema } from './form.schema';
import { authConroller } from '@/libs/formulas/auth/data-access/src';
import { toast } from '@/ui/use-toast';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<IUserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { setError } = form;

  async function onSubmit(data: IUserFormSchema) {
    setLoading(true);
    const { ok, message, result } = await authConroller.loginWithCredentials(
      data
    );
    if (ok) {
      toast({
        variant: 'success',
        title: 'Пользователь найден',
        description: 'Вы успешно авторизовались!',
      });

      authConroller.loginWithCookie(result, router);
    } else {
      if (Array.isArray(message)) {
        message.map(({ property, message }) => {
          if (property && message) setError(property as any, { message });
        });
      } else {
        toast({
          variant: 'destructive',
          title: message,
        });
      }
    }
    setLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="p-[10px]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Авторизация</CardTitle>
              <CardDescription>
                Введите свое имя и пароль ниже, чтобы войти в свою учетную
                запись
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя</FormLabel>
                      <FormControl>
                        <Input placeholder="Имя" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          placeholder="Пароль"
                          type="password"
                          color="error"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" loading={loading}>
                Войти
              </Button>
            </CardFooter>

            {/* <p className="px-8 text-center text-sm text-muted-foreground">
              У вас нету учетной записи?{' '}
              <Link
                href="/sign-up"
                className="underline underline-offset-4 hover:text-primary"
              >
                Создать
              </Link>
            </p> */}
          </Card>
        </form>
      </Form>
    </>
  );
}
