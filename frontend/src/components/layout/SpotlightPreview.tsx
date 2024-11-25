import { Spotlight } from "../ui/Spotlight";

function SpotlightPreview({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) {
  return (
    <div className="bg-grid-white/[0.02] relative flex h-screen w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div className=" relative z-10  mx-auto w-full max-w-7xl  p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          {heading}
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
          {subheading}
        </p>
      </div>
    </div>
  );
}
export default SpotlightPreview;
