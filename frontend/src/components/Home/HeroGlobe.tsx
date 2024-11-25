import { globeConfig, sampleArcs } from "../../constants";
import { World } from "../ui/globe";

function HeroGlobe() {
  return (
    <div className="size-[60vh] max-sm:size-[40vh]">
      <World data={sampleArcs} globeConfig={globeConfig} />;
    </div>
  );
}
export default HeroGlobe;
