import { Link } from "react-router-dom";
import Heading from "../components/layout/Heading";
import SpotlightPreview from "../components/layout/SpotlightPreview";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import SEO from "../components/layout/SEO";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title="About | DevUnity"
        description="Learn more about DevUnity, our mission, and the team behind the platform."
        name="DevUnity"
        ogType="website"
        twitterCard="summary"
      />
      <SpotlightPreview
        heading={"Meet the Architects"}
        subheading={
          "Discover the visionaries behind DevUnity. We're shaping the future of collaborative coding with passion and innovation."
        }
      />
      <div className="mx-auto px-4 py-8 max-w-5xl">
        <section className="shadow-lg rounded-lg p-6 md:p-8">
          <Heading>Welcome to DevUnity</Heading>
          <h2 className="text-2xl font-semibold mb-4">
            Founder: <span className="text-4xl">Manish Suthar</span>
          </h2>
          <div className="flex gap-3 my-3">
            <Link
              className="hover:text-neutral-300 line-clamp-1"
              to="https://github.com/m4dd0c"
            >
              <IconBrandGithub color={"#a855f7"} />
            </Link>
            <p className="font-bold text-xl">•</p>
            <Link
              className="hover:text-neutral-300 line-clamp-1"
              to="https://linkedin.com/in/m4dd0c"
            >
              <IconBrandLinkedin color={"#a855f7"} />
            </Link>
          </div>
          <p className="text-lg mb-4">
            <strong>Founded in 2024,</strong> DevUnity is a groundbreaking
            platform designed to help developers forge meaningful connections
            and leverage these networks to create remarkable projects.
          </p>
          <p className="text-lg mb-4">
            Our primary mission is to empower developers and students by
            providing a real-time collaborative coding environment, coupled with
            discussion functionality, enabling seamless communication and
            teamwork.
          </p>
          <p className="text-lg mb-4">
            At DevUnity, we believe in the power of collaboration and
            innovation. Our platform is tailored to foster a community where
            developers can come together, share knowledge, and build something
            invincible.
          </p>
          <p className="text-lg">
            Join us on this exciting journey and be a part of the future of
            collaborative coding.
          </p>
          <footer className="mt-6 text-center">
            <p className="text-lg">
              For any inquiries or support, feel free to reach out to us at{" "}
              <a
                href="mailto:m4dd0x078@gmail.com"
                className="text-purple-500 hover:underline"
              >
                m4dd0x078@gmail.com
              </a>
              .
            </p>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default About;
