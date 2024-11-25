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
      <Heading subtext={"Here is what they want to say about DevUnity"}>
        Loved by thousands of people
      </Heading>
      <div className="flex h-[80vh] justify-evenly overflow-hidden rounded-lg bg-transparent [mask-image:linear-gradient(to_top,transparent,white_20%,white_80%,transparent)]">
        <div className="animate-scroll max-lg:hidden" ref={fastScrollerRef}>
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
        <div className="animate-scroll max-sm:hidden" ref={fastScrollerRef}>
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
