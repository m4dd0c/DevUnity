import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
const Footer = () => {
  const { pathname } = useLocation();
  const isRoomPath =
    pathname.startsWith("/room") || pathname.startsWith("/user");
  return (
    <div
      className={`min-h-[40vh] bg-black text-white flex flex-col ${isRoomPath && "hidden"}`}
    >
      <div className="flex justify-between p-10 max-md:flex-col flex-1">
        <div>
          <div className="hover:text-neutral-300">
            <HashLink
              smooth
              className="flex justify-start items-center"
              to="/#hero"
            >
              <img src="/assets/logo.png" alt="logo" height={80} width={80} />
              <h1 className="font-bold text-2xl underline">DevUnity</h1>
            </HashLink>
          </div>
          <div>
            <p className="text-sm ml-6">
              A platform to collaborate with your team and work together
            </p>
          </div>
        </div>

        <br />
        <div className="md:hidden bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
        <br />
        <div className="flex space-x-4 gap-4">
          <div className="flex flex-col">
            <HashLink
              className="hover:text-neutral-300 line-clamp-1"
              to="/#hero"
              smooth
            >
              Hero
            </HashLink>
            <HashLink
              className="hover:text-neutral-300 line-clamp-1"
              to="/#features"
              smooth
            >
              Features
            </HashLink>
            <HashLink
              className="hover:text-neutral-300 line-clamp-1"
              to="/#testimonials"
              smooth
            >
              Testimonials
            </HashLink>
            <HashLink
              className="hover:text-neutral-300 line-clamp-1"
              to="/#brands"
              smooth
            >
              Brands
            </HashLink>
            <HashLink
              className="hover:text-neutral-300 line-clamp-1"
              to="/#team"
              smooth
            >
              Team
            </HashLink>
            <HashLink
              className="hover:text-neutral-300 line-clamp-1"
              to="/#room-promo"
              smooth
            >
              RoomPromo
            </HashLink>
          </div>
          <div className="flex max-md:flex-col gap-5">
            <div className="flex flex-col">
              <Link
                className="hover:text-neutral-300 line-clamp-1"
                to="/room/create"
              >
                Create a Room
              </Link>
              <Link
                className="hover:text-neutral-300 line-clamp-1"
                to="/room/join"
              >
                Join a Room
              </Link>
            </div>
            <div className="flex flex-col ">
              <Link
                className="hover:text-neutral-300 line-clamp-1"
                to="/contact"
              >
                Get in touch
              </Link>
              <Link className="hover:text-neutral-300 line-clamp-1" to="/about">
                Know about us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
      <div className="flex p-3 bottom-0 mx-6 justify-between">
        <div className="flex gap-3 max-sm:hidden">
          <Link
            className="hover:text-neutral-300 line-clamp-1"
            to="/privacy-policy"
          >
            Privacy Policy
          </Link>
          <p className="font-bold text-xl">•</p>
          <Link
            className="hover:text-neutral-300 line-clamp-1"
            to="/terms-conditions"
          >
            Terms &amp; Conditions
          </Link>
        </div>
        <div className="flex gap-3">
          <Link
            className="hover:text-neutral-300 line-clamp-1"
            to="https://github.com/m4dd0c"
          >
            Github
          </Link>
          <p className="font-bold text-xl">•</p>
          <Link
            className="hover:text-neutral-300 line-clamp-1"
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
