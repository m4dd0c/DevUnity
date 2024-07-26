export const handleCopy = async () => {
  window.location.pathname;
  const pathname = window.location.pathname;
  const id = pathname.split("/")[2];
  // TODO: add toaster
  try {
    await navigator.clipboard.writeText(id);
    return "Text copied to clipboard!";
  } catch (err) {
    return "Failed to copy text.";
  }
};
export const runCode = () => {
  // TODO: complete this later
  console.log("code is running...");
};
