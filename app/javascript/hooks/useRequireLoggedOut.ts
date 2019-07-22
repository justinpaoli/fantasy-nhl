import { useEffect } from "react";
import { RouteComponentProps } from "react-router";

const useRequireLoggedOut = (props: RouteComponentProps) => {
  //Redirect to Home if already logged in
  useEffect(() => {
    // @ts-ignore
    if (gon.global.user) props.history.push('/');
  }, []);
}

export default (useRequireLoggedOut);