import { useEffect } from 'react';
import useRouter from 'use-react-router';

const useRequireLoggedOut = (): void => {
  //Redirect to Login if not already logged in
  const { history } = useRouter();
  //Redirect to Home if already logged in
  useEffect(() => {
    // @ts-ignore
    if (gon.global.user) history.push('/');
  }, []);
}

export default useRequireLoggedOut;