import { LampContainer } from "../../components/ui/lamp";
import { motion } from "framer-motion";
import SigninForm from "../../components/user/SigninForm";
import { Dispatch, SetStateAction } from "react";
import SEO from "../../components/layout/SEO";

const Login = ({ setAuth }: { setAuth: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <div className="bg-slate-950">
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title="Signin | DevUnity"
        description="Sign in to access DevUnity, a platform for developers to connect and collaborate."
        name="DevUnity"
        ogType="website"
        twitterCard="summery"
      />

      <LampContainer>
        <motion.div
          initial={{ opacity: 0.5, y: 400 }}
          whileInView={{ opacity: 1, y: 200 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 rounded-2xl max-lg:w-full w-96"
        >
          <SigninForm setAuth={setAuth} />
        </motion.div>
      </LampContainer>
    </div>
  );
};

export default Login;
