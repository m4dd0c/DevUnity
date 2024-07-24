import { FlipWords } from "../ui/flip-words";

function ContactHead() {
  const words = ["Thoughts", "Feedback", "Inquiries", "Suggestions"];

  return (
    <div className="h-[15rem] flex justify-center items-center px-4">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Share
        <FlipWords words={words} /> <br />
        Connect with Collabrite.
      </div>
    </div>
  );
}
export default ContactHead;
