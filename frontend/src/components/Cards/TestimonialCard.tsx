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
    <div className="my-10 w-fit rounded-lg border border-neutral-800 bg-neutral-950  p-4 text-white">
      <div className="flex items-center">
        <img
          alt={username}
          src={img}
          className="size-10 rounded-full object-cover"
        />
        <div className="ml-4">
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-neutral-400">@{username}</p>
        </div>
      </div>
      <p className="mt-4">{feedback}</p>
    </div>
  );
};
export default TestimonialCard;
