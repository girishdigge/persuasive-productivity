import React from 'react';
import { Button } from '../ui/button';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const ProviderSignInBtn = ({ children, ...props }: Props) => {
  return (
    <Button {...props} variant={'secondary'} type='button'>
      {children}
    </Button>
  );
};
