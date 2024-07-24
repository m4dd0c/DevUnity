import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
      <div className="h-[5rem] fixed z-[1] text-white max-sm:hidden">
        <div className="flex justify-between items-center">
          <Link className="flex justify-start items-center" to="/#hero">
            <img src="/assets/logo.png" alt="logo" height={80} width={80} />
            <h1 className="font-bold text-2xl max-lg:hidden">Collabrite</h1>
          </Link>
        </div>
      </div>
      <Navbar />
    </>
  );
};
export default Header;
