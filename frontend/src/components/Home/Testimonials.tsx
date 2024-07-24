import { useEffect, useRef } from "react";
import Heading from "../layout/Heading";
import { testimonials } from "./testimonials";

const TestimonialCard = ({
  img,
  username,
  name,
  feedback,
}: {
  img: string;
  name: string;
  username: string;
  feedback: string;
}) => {
  return (
    <div className="rounded-lg bg-neutral-950 text-white my-10 p-4 w-fit  border border-neutral-800">
      <div className="flex items-center">
        <img
          alt={username}
          src={img}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="ml-4">
          <p className="font-semibold text-lg">{name}</p>
          <p className="text-neutral-400">@{username}</p>
        </div>
      </div>
      <p className="mt-4">{feedback}</p>
    </div>
  );
};
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
