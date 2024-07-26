import Heading from "../layout/Heading";
import FeatureCard from "../Cards/FeatureCard";
import Working from "./Working";
import { features } from "../../constants";

function Features() {
  return (
    <div id="features">
      <Heading>Features</Heading>
      <div className="bg-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} {...feature} index={index} />
        ))}
      </div>
      <Working />
    </div>
  );
}

export default Features;
