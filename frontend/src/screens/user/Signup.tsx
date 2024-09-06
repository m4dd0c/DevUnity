import { LampContainer } from "../../components/ui/lamp";
import { motion } from "framer-motion";
import SignupForm from "../../components/user/SignupForm";
import { Dispatch, SetStateAction } from "react";
import SEO from "../../components/layout/SEO";

const Signup = ({
  setAuth,
}: {
  setAuth: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="bg-slate-950">
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title="Signup | DevUnity"
        description="Create a DevUnity account to join the developer community."
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
          <SignupForm setAuth={setAuth} />
        </motion.div>
      </LampContainer>
    </div>
  );
};

export default Signup;
