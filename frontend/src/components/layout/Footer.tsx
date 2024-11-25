import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
const Footer = () => {
  const { pathname } = useLocation();
  const isRoomPath =
    pathname.startsWith("/room") || pathname.startsWith("/user");
  return (
    <div
      className={`flex min-h-[40vh] flex-col bg-black text-white ${isRoomPath && "hidden"}`}
    >
      <div className="flex flex-1 justify-between p-10 max-md:flex-col">
        <div>
          <div className="hover:text-neutral-300">
            <HashLink
              smooth
              className="flex items-center justify-start"
              to="/#hero"
            >
              <img src="/assets/logo.png" alt="logo" height={80} width={80} />
              <h1 className="text-2xl font-bold underline">DevUnity</h1>
            </HashLink>
          </div>
          <div>
            <p className="ml-6 text-sm">
              A platform to collaborate with your team and work together
            </p>
          </div>
        </div>

        <br />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700 md:hidden" />
        <br />
        <div className="flex gap-4 space-x-4">
          <div className="flex flex-col">
            <HashLink
              className="line-clamp-1 hover:text-neutral-300"
              to="/#hero"
              smooth
            >
              Hero
            </HashLink>
            <HashLink
              className="line-clamp-1 hover:text-neutral-300"
              to="/#features"
              smooth
            >
              Features
            </HashLink>
            <HashLink
              className="line-clamp-1 hover:text-neutral-300"
              to="/#testimonials"
              smooth
            >
              Testimonials
            </HashLink>
            <HashLink
              className="line-clamp-1 hover:text-neutral-300"
              to="/#brands"
              smooth
            >
              Brands
            </HashLink>
            <HashLink
              className="line-clamp-1 hover:text-neutral-300"
              to="/#team"
              smooth
            >
              Team
            </HashLink>
            <HashLink
              className="line-clamp-1 hover:text-neutral-300"
              to="/#room-promo"
              smooth
            >
              RoomPromo
            </HashLink>
          </div>
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col">
              <Link
                className="line-clamp-1 hover:text-neutral-300"
                to="/room/create"
              >
                Create a Room
              </Link>
              <Link
                className="line-clamp-1 hover:text-neutral-300"
                to="/room/join"
              >
                Join a Room
              </Link>
            </div>
            <div className="flex flex-col ">
              <Link
                className="line-clamp-1 hover:text-neutral-300"
                to="/contact"
              >
                Get in touch
              </Link>
              <Link className="line-clamp-1 hover:text-neutral-300" to="/about">
                Know about us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      <div className="bottom-0 mx-6 flex justify-between p-3">
        <div className="flex gap-3 max-sm:hidden">
          <Link
            className="line-clamp-1 hover:text-neutral-300"
            to="/privacy-policy"
          >
            Privacy Policy
          </Link>
          <p className="text-xl font-bold">•</p>
          <Link
            className="line-clamp-1 hover:text-neutral-300"
            to="/terms-conditions"
          >
            Terms &amp; Conditions
          </Link>
        </div>
        <div className="flex gap-3">
          <Link
            className="line-clamp-1 hover:text-neutral-300"
            to="https://github.com/m4dd0c"
          >
            Github
          </Link>
          <p className="text-xl font-bold">•</p>
          <Link
            className="line-clamp-1 hover:text-neutral-300"
            to="https://linkedin.com/in/m4dd0c"
          >
            Linkedin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
