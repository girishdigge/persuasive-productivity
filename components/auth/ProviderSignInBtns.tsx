'use client';
import { useTranslations } from 'next-intl';
import { ProviderSignInBtn } from './ProviderSignInBtn';

export const ProviderSignInBtns = ({
  signInCard,
}: {
  signInCard?: boolean;
}) => {
  const t = useTranslations('AUTH');
  return (
    <div className='flex flex-col gap-2'>
      <ProviderSignInBtn className='w-full rouded-[1.9rem] border'>
        {signInCard
          ? t('SIGN_IN.PROVIDERS.GOOGLE')
          : t('SIGN_UP.PROVIDERS.GOOGLE')}
      </ProviderSignInBtn>
      <ProviderSignInBtn className='w-full bg-black/90 text-white dark:bg-black/70 hover:bg-black/80 dark:hover:bg-black/50 rouded-[1.9rem] border'>
        {signInCard
          ? t('SIGN_IN.PROVIDERS.APPLE')
          : t('SIGN_UP.PROVIDERS.APPLE')}
      </ProviderSignInBtn>
      <ProviderSignInBtn className='w-full rouded-[1.9rem] border'>
        {signInCard
          ? t('SIGN_IN.PROVIDERS.GITHUB')
          : t('SIGN_UP.PROVIDERS.GITHUB')}
      </ProviderSignInBtn>
    </div>
  );
};
