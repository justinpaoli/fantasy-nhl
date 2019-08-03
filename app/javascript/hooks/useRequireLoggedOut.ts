import { useEffect, useContext } from 'react';
import useRouter from 'use-react-router';
import { UserContext } from '../components/User/UserProvider';

const useRequireLoggedOut = (): void => {
  //Redirect to Home if already logged in
  const { history } = useRouter();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user.username) history.push('/');
  }, []);
}

export default useRequireLoggedOut;