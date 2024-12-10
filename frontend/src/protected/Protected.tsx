import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({
  children,
  auth,
  redirect = "/auth/signin",
}: {
  children: React.ReactNode;
  auth: boolean;
  redirect?: string;
}) => {
  const navigate = useNavigate();

  // if authenticated is false then navigating
  useEffect(() => {
    if (!auth) {
      const redirectPath = redirect.startsWith("/") ? redirect : `/${redirect}`;
      navigate(redirectPath);
    }
  }, [redirect, navigate, auth]);

  return auth ? children : null;
};

export default Protected;
