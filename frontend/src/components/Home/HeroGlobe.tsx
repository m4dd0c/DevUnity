import { globeConfig, sampleArcs } from "../../constants";
import { World } from "../ui/globe";

function HeroGlobe() {
  return (
    <div className="h-[60vh] w-[60vh] max-sm:h-[40vh] max-sm:w-[40vh]">
      <World data={sampleArcs} globeConfig={globeConfig} />;
    </div>
  );
}
export default HeroGlobe;
