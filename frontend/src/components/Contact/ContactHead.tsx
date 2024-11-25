import { FlipWords } from "../ui/flip-words";

function ContactHead() {
  const words = ["Thoughts", "Feedback", "Inquiries", "Suggestions"];

  return (
    <div className="flex h-60 items-center justify-center px-4">
      <div className="mx-auto text-4xl font-normal text-neutral-600 dark:text-neutral-400">
        Share
        <FlipWords words={words} /> <br />
        Connect with DevUnity.
      </div>
    </div>
  );
}
export default ContactHead;
