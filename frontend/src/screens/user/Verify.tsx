import { useEffect } from "react";
import { Spotlight } from "../../components/ui/Spotlight";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { verificationAction } from "../../lib/actions/userAction";
import { KEYS } from "../../lib/utils";
import toast from "react-hot-toast";

function Verify() {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: [KEYS.VERIFY],
    queryFn: async () => {
      if (token) {
        return await verificationAction(token);
      }
    },
  });
  // if token in found initially
  useEffect(() => {
    if (token) refetch();
  }, [token, refetch]);

  // when request completed w/ error or success
  useEffect(() => {
    if (isError) {
      toast.error("Account verification failed.");
    }
    if (data && data.data === true) {
      toast.success(data.message);
      nav("/");
    }
  }, [isError, error, data, nav]);

  return (
    <div className="h-screen w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-32 md:pt-0">
        <h1 className="text-xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Verifying your account.
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Please be patient.
        </p>
        <img
          src="/assets/logo.png"
          alt="logo"
          className={`h-56 w-56 mx-auto ${isPending && "animate-pulse"}`}
        />
      </div>
    </div>
  );
}
export default Verify;
