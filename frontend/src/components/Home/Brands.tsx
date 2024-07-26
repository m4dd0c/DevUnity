import Heading from "../layout/Heading";
import BrandCard from "../Cards/BrandCard";
import { brands } from "../../constants";

const Brands = () => {
  return (
    <div className="mt-10" id="brands">
      <Heading subtext={"Trusted by world's leading platforms."}>
        Brands
      </Heading>
      <div className="bg-transparent rounded-lg overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] h-[30vh]">
        <div className="animate-scroll-x gap-10 flex justify-evenly">
          {[...brands, ...brands].map((brand, idx) => (
            <BrandCard
              key={idx}
              pure={brand?.pure}
              img={brand.img}
              label={brand.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
