import { HashLink } from "react-router-hash-link";
import GradientBorderButton from "../components/ui/gradient-border-button";
import { BackgroundBeams } from "../components/ui/background-beams";
import SEO from "../components/layout/SEO";

const NotFound = () => {
  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title="Not Found | DevUnity"
        description="The page you are looking for does not exist on DevUnity."
        name="DevUnity"
        ogType="website"
        twitterCard="summary"
      />

      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400  font-bold py-4 mb-4">
          Oops! You ran out of oxygen.
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg font-semibold my-2 text-sm relative z-10">
          The page you are looking for is beyond our planet.
          <br /> Let's get you..
        </p>
        <div className="my-4">
          <GradientBorderButton>
            <HashLink to="/#hero" smooth={true}>
              back to Home
            </HashLink>
          </GradientBorderButton>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};
export default NotFound;
