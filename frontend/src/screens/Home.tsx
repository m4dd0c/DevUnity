import React, { Suspense } from "react";
import { TracingBeam } from "../components/ui/tracing-beam.tsx";
import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import Testimonials from "../components/Home/Testimonials";
import Brands from "../components/Home/Brands.tsx";
import RoomPromo from "../components/Home/RoomPromo.tsx";
import SEO from "../components/layout/SEO.tsx";

const Team = React.lazy(
  () => import(/* webpackPrefetch: true */ "../components/Home/Team.tsx"),
);

function Home() {
  return (
    <>
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title="Home | DevUnity"
        description="DevUnity is a platform for developers to connect, collaborate, and share knowledge."
        name="DevUnity"
        ogType="website"
        twitterCard="summary_large_image"
      />

      <Hero />
      <div className="bg-black">
        <TracingBeam>
          <Features />
          <Testimonials />
          <Brands />
        </TracingBeam>
        <Suspense fallback={<div>Loading Team...</div>}>
          <Team />
        </Suspense>
        <RoomPromo />
      </div>
    </>
  );
}

export default Home;
