export const isValidUsername = (username: string) => {
  // Check if the username length is between 1 and 32 characters
  if (username.length < 3 || username.length > 32) {
    return "Username length must be 3-32";
  }

  // Check if the username starts with a letter
  if (!/^[a-zA-Z]/.test(username)) {
    return "Username can only start with a letter or an underscore.";
  }

  // Check for invalid characters
  if (!/^[a-zA-Z0-9._]+$/.test(username)) {
    return "Username contains invalid characters. Use only letters, numbers, underscores, and periods.";
  }

  // Check for consecutive underscores or periods
  if (/[_]{2,}|[.]{2,}/.test(username)) {
    return "Consecutive underscores or periods are not allowed.";
  }

  // Check if the username ends with a period
  if (/[.]$/.test(username)) {
    return "Username can't end with a period.";
  }
  return null;
};

// format date chatgpt
export const formatDate = (dateString: string): string => {
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
      return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
        -count,
        unit as Intl.RelativeTimeFormatUnit,
      );
    }
  }

  return "just now";
};

// query keys
export const KEYS = {
  USERNAME_AVAIL: "USERNAME_AVAIL",
  SIGNUP: "SIGNUP",
  SIGNIN: "SIGNIN",
  GET_USER: "GET_USER",
  GET_ME: "GET_ME",
  VERIFY: "VERIFY",
  SEARCH_USERS: "SEARCH_USERS",
  SEARCH_PROJECTS: "SEARCH_PROJECTS",
};
