import { useTranslations } from 'next-intl';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import Link from 'next/link';
import SignUpCardContent from './SignUpCardContent';
import SignInCardContent from './SignInCardContent';

interface Props {
  signInCard?: boolean;
}
const AuthCard = ({ signInCard }: Props) => {
  const t = useTranslations('AUTH');
  return (
    <>
      <Card className='w-full sm:min-w-[28rem] sm:w-auto'>
        <CardHeader>
          <Image
            alt='profile pic'
            className='rounded-full object-cover self-center'
            width={50}
            height={50}
            src='https://yt3.googleusercontent.com/ytc/AIdro_nYQVuucs7GFhF6DAWYt8lDkXuQSLhh19ibdJUjIhzYcWU=s900-c-k-c0x00ffffff-no-rj'
          />
          <CardTitle className='pt-2'>
            {signInCard ? t('SIGN_IN.TITLE') : t('SIGN_UP.TITLE')}
          </CardTitle>
          <CardDescription>
            {signInCard ? t('SIGN_IN.DESC') : t('SIGN_UP.DESC')}
          </CardDescription>
        </CardHeader>
        {signInCard ? <SignInCardContent /> : <SignUpCardContent />}
      </Card>
      <p className='text-sm'>
        {' '}
        {signInCard
          ? t('SIGN_IN.DONT_HAVE_ACCOUNT.FIRST')
          : t('SIGN_UP.HAVE_ACCOUNT.FIRST')}{' '}
        <Link
          className='text-primary'
          href={signInCard ? '/sign-up' : '/sign-in'}
        >
          {' '}
          {signInCard
            ? t('SIGN_IN.DONT_HAVE_ACCOUNT.SECOND')
            : t('SIGN_UP.HAVE_ACCOUNT.SECOND')}{' '}
        </Link>
      </p>
    </>
  );
};

export default AuthCard;
