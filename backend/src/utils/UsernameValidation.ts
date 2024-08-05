import User from "../model/User";

class UsernameValidation {
  username: string;
  constructor(username: string) {
    this.username = username;
  }
  isValid = () => {
    // Check if the username length is between 1 and 32 characters
    if (this.username.length < 1 || this.username.length > 32) {
      return false;
    }

    // Check if the username starts with a letter
    if (!/^[a-zA-Z]/.test(this.username)) {
      return false;
    }

    // Check for invalid characters
    if (!/^[a-zA-Z0-9._]+$/.test(this.username)) {
      return false;
    }

    // Check for consecutive underscores or periods
    if (/[_]{2,}|[.]{2,}/.test(this.username)) {
      return false;
    }

    // Check if the username ends with a period
    if (/[.]$/.test(this.username)) {
      return false;
    }
    return true;
  };
  isAvailable = async () => {
    const isAvailable = await User.exists({ username: this.username });
    return !isAvailable;
  };
}
export default UsernameValidation;
