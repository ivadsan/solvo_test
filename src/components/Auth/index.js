import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Loading from '@/components/Loading/Loading.component';

export const Auth = ({ children }) => {
  const router = useRouter();
  const { data: session, status, token } = useSession();

  const isUser = !!session?.id;
  useEffect(() => {
    if (status === 'loading') return; 
    if (!isUser) router.push('/'); 
  }, [isUser, router, status]);

  if (isUser) {
    return children;
  }
  
  return <Loading />;
};
