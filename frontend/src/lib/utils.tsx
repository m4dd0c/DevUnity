import toast from "react-hot-toast";
import { langs } from "../constants";

export const isValidUsername = (username: string) => {
  // Check if the username length is between 3 and 32 characters
  if (username.length < 3 || username.length > 32) {
    return "Username length must be 3-32 characters.";
  }

  // Check if the username starts with a letter or an underscore
  if (!/^[a-zA-Z_]/.test(username)) {
    return "Username can only start with a letter or an underscore.";
  }

  // Check for invalid characters
  if (!/^[a-zA-Z0-9._]+$/.test(username)) {
    return "Username contains invalid characters. Use only letters, numbers, underscores, and periods.";
  }

  // Check for consecutive periods
  if (/[.]{2,}/.test(username)) {
    return "Consecutive periods are not allowed.";
  }

  // Check if the username ends with a period
  if (/[.]$/.test(username)) {
    return "Username can't end with a period.";
  }

  return null;
};

// format date chatgpt
export const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const [month, day] = formattedDate.split(" ");
  return `${month}, ${day}`;
};

// timeAgo chatgpt
export const timeAgo = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();

  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    if (seconds >= value || unit === "second") {
      const count = Math.floor(seconds / value);
      const data = new Intl.RelativeTimeFormat("en", {
        numeric: "auto",
      }).format(-count, unit as Intl.RelativeTimeFormatUnit);
      if (!data) return dateString;
      else return data;
    }
  }

  return "just now";
};

// get lang color
export const getLangColor = (lang: string) => {
  const result = langs.find((item) => item.value === lang);
  return result?.color;
};
// get lang.value to lang.label
export const getLangLabel = (lang: string) => {
  const result = langs.find((item) => item.value === lang);
  return result?.label;
};
// get lang id
export const getLangId = (lang: string) => {
  const result = langs.find((item) => item.value === lang);
  return result?.id;
};
// get lang default-code
export const getLangDefaultCode = (lang: string) => {
  const result = langs.find((item) => item.value === lang);
  return result?.defaultCode;
};
// get lang mode
export const getLangMode = (lang: string) => {
  const result = langs.find((item) => item.value === lang);
  return result?.mode;
};
// getLangData
export const getLang = (lang: string) => {
  const result = langs.find((item) => item.value === lang);
  return result;
};

// we'll use it to find elapsedtime for code execution
export const getElapsedTime = ({
  createdAt,
  finishedAt,
}: {
  createdAt: string;
  finishedAt: string;
}) => {
  const startTime = new Date(createdAt).getTime();
  const endTime = new Date(finishedAt).getTime();
  const elapsedTime = endTime - startTime;
  return elapsedTime;
};

// copy roomId
export const handleCopy = async () => {
  window.location.pathname;
  const pathname = window.location.pathname;
  const id = pathname.split("/")[2];
  try {
    await navigator.clipboard.writeText(id);
    showToast({ message: "RoomId copied." });
  } catch (err) {
    showToast({ message: "Failed to copy RoomId", type: "error" });
  }
};

// show toaster function
export const showToast = ({
  message = "Done!",
  type = "success",
  icon,
}: {
  message?: string;
  type?: "success" | "error" | "icon";
  icon?: string;
}) => {
  toast.dismiss();
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "icon":
      toast(message, { icon: icon || "ℹ" });
      break;
    default:
      break;
  }
};

// query keys
export const KEYS = {
  SIGNUP: "SIGNUP",
  SIGNIN: "SIGNIN",
  GET_ME: "GET_ME",
  VERIFY: "VERIFY",
  GET_USER: "GET_USER",
  SEARCH_USERS: "SEARCH_USERS",
  USERNAME_AVAIL: "USERNAME_AVAIL",
  // rooms
  GET_ROOM: "GET_ROOM",
  JOIN_ROOM: "JOIN_ROOM",
  CREATE_ROOM: "CREATE_ROOM",
  SEARCH_PROJECTS: "SEARCH_PROJECTS",
  // discussions
  GET_DISCUSSION: "GET_DISCUSSION",
  // run code
  GET_SUBMISSION: "GET_SUBMISSION",
};

// socket events
// have same object in BE
export const ev = {
  // backend emit
  "b:join": "b:join",
  "b:code_load": "b:code_load",
  "b:create": "b:create",
  "b:code_change": "b:code_change",
  "b:leave": "b:leave",
  "b:code_req": "b:code_req",
  "b:message": "b:message",
  "b:chat_load": "b:chat_load",
  "b:chat_req": "b:chat_req",
  // frontend emit
  "f:join": "f:join",
  "f:code_load": "f:code_load",
  "f:create": "f:create",
  "f:code_change": "f:code_change",
  "f:leave": "f:leave",
  "f:code_req": "f:code_req",
  "f:message": "f:message",
  "f:chat_load": "f:chat_load",
  "f:chat_req": "f:chat_req",
};
