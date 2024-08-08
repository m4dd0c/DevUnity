import { LampContainer } from "../../components/ui/lamp";
import { motion } from "framer-motion";
import SignupForm from "../../components/user/SignupForm";

const Signup = () => {
  return (
    <div className="bg-slate-950">
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
          <SignupForm />
        </motion.div>
      </LampContainer>
    </div>
  );
};

export default Signup;
