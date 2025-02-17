'use client';
import { CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { signUpSchema, SignUpSchema } from '@/schema/signUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProviderSignInBtns } from './ProviderSignInBtns';
import { useTranslations } from 'next-intl';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { LoadingState } from '../ui/loadingState';
const SignUpCardContent = () => {
  const t = useTranslations('AUTH');
  const m = useTranslations('MESSAGES');
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (data: SignUpSchema) => {
    console.log(isLoading);

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Some went wrong');
      const signUpInfo = await res.json();
      if (res.status === 200) {
        toast.success(m('SUCCESS.SIGN_UP'));
        await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        router.push('/');
      } else {
        throw new Error(signUpInfo);
      }
    } catch (error) {
      let errMsg = m('DEFAULT.MESSAGE');
      if (typeof error === 'string') {
        errMsg = error;
      } else if (error instanceof Error) {
        errMsg = m(error.message);
      }
      toast.error(errMsg);
    }
    setIsLoading(false);
  };
  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
          <ProviderSignInBtns disabled={isLoading} />
          <div className='space-y-1.5'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t('EMAIL')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t('USERNAME')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder={t('PASSWORD')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='space-y-2'>
            <Button
              disabled={isLoading}
              className='w-full font-bold text-white dark:bg-gray-800 dark:hover:bg-gray-700'
              type='submit'
            >
              {isLoading ? (
                <LoadingState loadingText={m('PENDING.LOADING')} />
              ) : (
                t('SIGN_UP.SUBMIT_BTN')
              )}
            </Button>
            <p className='text-sx text-center text-muted-foreground'>
              {t('SIGN_UP.TERMS.FIRST')}{' '}
              <Link className='font-bold' href={'/'}>
                {t('SIGN_UP.TERMS.SECOND')}
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </CardContent>
  );
};
export default SignUpCardContent;
