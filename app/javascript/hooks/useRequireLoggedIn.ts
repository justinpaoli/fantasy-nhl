import { useEffect, useContext } from 'react';
import useRouter from 'use-react-router';
import { UserContext } from '../components/User/UserProvider';

const useRequireLoggedIn = (): void => {
  //Redirect to Login if not already logged in
  const { history } = useRouter();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user.username) history.push(`/login?redirect_url=${encodeURIComponent(location.pathname)}`);
  }, []);
}

export default useRequireLoggedIn;