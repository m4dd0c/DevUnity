import Heading from "../layout/Heading";
import FeatureCard from "../Cards/FeatureCard";
import Working from "./Working";
import { features } from "../../constants";

function Features() {
  return (
    <div id="features">
      <Heading>Features</Heading>
      <div className="relative z-10 mx-auto grid max-w-7xl  grid-cols-1 bg-black py-10 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} {...feature} index={index} />
        ))}
      </div>
      <Working />
    </div>
  );
}

export default Features;
