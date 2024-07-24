import Heading from "../layout/Heading";
import { brands } from "./brands";

const BrandCard = ({
  img,
  label,
  pure = false,
}: {
  img: string;
  label: string;
  pure?: boolean;
}) => {
  return (
    <img
      src={img}
      alt={label}
      height={100}
      width={100}
      className={`${!pure && "invert"}`}
    />
  );
};
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
