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
export default BrandCard;
