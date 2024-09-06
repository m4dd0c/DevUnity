import { TracingBeam } from "../components/ui/tracing-beam.tsx";
import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import Testimonials from "../components/Home/Testimonials";
import Brands from "../components/Home/Brands.tsx";
import Team from "../components/Home/Team.tsx";
import RoomPromo from "../components/Home/RoomPromo.tsx";
import SEO from "../components/layout/SEO.tsx";

function Home() {
  return (
    <>
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title="Home | DevUnity"
        description="DevUnity is a platform for developers to connect, collaborate, and share knowledge."
        name="DevUnity"
        ogType="website"
        twitterCard="summery_large_image"
      />

      <Hero />
      <div className="bg-black">
        <TracingBeam>
          <Features />
          <Testimonials />
          <Brands />
        </TracingBeam>
        <Team />
        <RoomPromo />
      </div>
    </>
  );
}

export default Home;
