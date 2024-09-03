import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({
  children,
  auth,
  redirect,
}: {
  children: React.ReactNode;
  auth: boolean;
  redirect?: string;
}) => {
  const nav = useNavigate();

  // appending / in the redirect string if not available
  if (redirect && !redirect.startsWith("/")) redirect = `/${redirect}`;
  if (!redirect) redirect = "/auth/signup";

  // if authenticated is false then navigating
  useEffect(() => {
    if (!auth) {
      nav(redirect);
    }
  }, [redirect, nav, auth]);
  // otherwise rendering the children
  return children;
};

export default Protected;
