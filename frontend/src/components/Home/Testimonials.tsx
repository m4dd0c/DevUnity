import { useEffect, useRef } from "react";
import Heading from "../layout/Heading";
import TestimonialCard from "../Cards/TestimonialCard";
import { testimonials } from "../../constants";

const Testimonials = () => {
  const slowScrollerRef = useRef<HTMLDivElement>(null);
  const fastScrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slowScrollerRef.current) {
      slowScrollerRef.current.style.setProperty("--animation-duration", "50s");
    }
    if (fastScrollerRef.current) {
      fastScrollerRef.current.style.setProperty("--animation-duration", "30s");
    }
  }, [slowScrollerRef, fastScrollerRef]);
  return (
    <div id="testimonials">
      <Heading subtext={"Here is what they want to say about Collabrite"}>
        Loved by thousands of people
      </Heading>
      <div className="flex justify-evenly bg-transparent rounded-lg overflow-hidden h-[80vh] [mask-image:linear-gradient(to_top,transparent,white_20%,white_80%,transparent)]">
        <div className="max-lg:hidden animate-scroll" ref={fastScrollerRef}>
          {[...testimonials.slice(0, 15), ...testimonials.slice(0, 15)].map(
            (testimonial, idx) => (
              <TestimonialCard
                key={idx}
                img={testimonial.img}
                name={testimonial.name}
                username={testimonial.username}
                feedback={testimonial.feedback}
              />
            ),
          )}
        </div>
        <div className="animate-scroll" ref={slowScrollerRef}>
          {[...testimonials.slice(15, 30), ...testimonials.slice(15, 30)].map(
            (testimonial, idx) => (
              <TestimonialCard
                key={idx}
                img={testimonial.img}
                name={testimonial.name}
                username={testimonial.username}
                feedback={testimonial.feedback}
              />
            ),
          )}
        </div>
        <div className="max-sm:hidden animate-scroll" ref={fastScrollerRef}>
          {[...testimonials.slice(30), ...testimonials.slice(30)].map(
            (testimonial, idx) => (
              <TestimonialCard
                key={idx}
                img={testimonial.img}
                name={testimonial.name}
                username={testimonial.username}
                feedback={testimonial.feedback}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
