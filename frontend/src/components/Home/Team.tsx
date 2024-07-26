import { team } from "../../constants";
import Heading from "../layout/Heading";
import { StickyScroll } from "../ui/sticky-scroll-reveal";

function Team() {
  return (
    <div id="team">
      <Heading subtitle={"The brains powering our Technology"}>
        Meet Our Team
      </Heading>
      <div className="p-10">
        <StickyScroll content={team} />
      </div>
    </div>
  );
}
export default Team;
