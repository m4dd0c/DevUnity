import { useEffect } from "react";
import { team } from "../../constants";
import Heading from "../layout/Heading";
import { StickyScroll } from "../ui/sticky-scroll-reveal";

const preloadImages = () => {
  team.forEach((member) => {
    // Extract the `src` from the `content` property
    const imgElement = member.content?.props?.children?.props;
    if (imgElement?.src) {
      const img = new Image();
      img.src = imgElement.src;
    }
  });
};

function Team() {
  useEffect(() => {
    preloadImages();
  }, []);
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
