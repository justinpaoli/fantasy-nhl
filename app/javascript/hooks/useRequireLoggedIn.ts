import { useEffect } from 'react';
import useRouter from 'use-react-router';

const useRequireLoggedIn = (): void => {
  //Redirect to Login if not already logged in
  const { history } = useRouter();
  useEffect(() => {
    // @ts-ignore
    if (!gon.global.user) history.push('/login');
  }, []);
}

export default useRequireLoggedIn;