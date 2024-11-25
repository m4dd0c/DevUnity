import { HashLink } from "react-router-hash-link";
import GradientBorderButton from "../components/ui/gradient-border-button";
import { BackgroundBeams } from "../components/ui/background-beams";
import SEO from "../components/layout/SEO";

const NotFound = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-neutral-950 antialiased">
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title="Not Found | DevUnity"
        description="The page you are looking for does not exist on DevUnity."
        name="DevUnity"
        ogType="website"
        twitterCard="summary"
      />

      <div className="mx-auto max-w-2xl p-4">
        <h1 className="relative z-10 mb-4 bg-gradient-to-b from-neutral-100 to-neutral-400 bg-clip-text py-4 text-lg  font-bold text-transparent md:text-5xl">
          Oops! You ran out of oxygen.
        </h1>
        <p></p>
        <p className="relative z-10 my-2 max-w-lg text-sm font-semibold text-neutral-500">
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
