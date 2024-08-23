import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({
  children,
  auth,
  redirect,
}: {
  children: React.ReactNode;
  auth: boolean;
  redirect: string;
}) => {
  const nav = useNavigate();

  if (redirect && !redirect.startsWith("/")) redirect = `/${redirect}`;
  if (!redirect) redirect = "/auth/signup";

  useEffect(() => {
    if (!auth) {
      nav(redirect);
    }
  }, [redirect, nav, auth]);
  return children;
};

export default Protected;
