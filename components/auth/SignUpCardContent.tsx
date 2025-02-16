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
import { signUpSchema } from '@/schema/signUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProviderSignInBtns } from './ProviderSignInBtns';
import { useTranslations } from 'next-intl';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
const SignUpCardContent = () => {
  const t = useTranslations('AUTH');
  const form = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  const onSubmit = async (data: signUpSchema) => {
    console.log(data);
  };
  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
          <ProviderSignInBtns />
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
              className='w-full font-bold text-white dark:bg-gray-800 dark:hover:bg-gray-700'
              type='submit'
            >
              {t('SIGN_UP.SUBMIT_BTN')}
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
