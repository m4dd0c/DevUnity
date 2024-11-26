import { useEffect } from "react";
import { Spotlight } from "../../components/ui/Spotlight";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { verificationAction } from "../../lib/actions/userAction";
import { KEYS, showToast } from "../../lib/utils";
import SEO from "../../components/layout/SEO";

function Verify() {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: [KEYS.VERIFY, token],
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
      showToast({ message: "Account verification failed.", type: "error" });
    }
    if (data && data.data === true) {
      showToast({ message: data.message });
      nav("/");
    }
  }, [isError, error, data, nav]);

  return (
    <div className="bg-grid-white/[0.02] relative flex h-screen w-full overflow-hidden bg-black/[0.96] antialiased md:items-center md:justify-center">
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title="Verify | DevUnity"
        description="Verify your email address to activate your DevUnity account."
        name="DevUnity"
        ogType="website"
        twitterCard="summary"
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-32 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-xl font-bold text-transparent md:text-4xl">
          Verifying your account.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
          Please be patient.
        </p>
        <img
          src="/assets/logo.png"
          alt="logo"
          className={`mx-auto size-56 ${isPending && "animate-pulse"}`}
        />
      </div>
    </div>
  );
}
export default Verify;
