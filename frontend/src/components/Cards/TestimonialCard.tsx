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
export default TestimonialCard;
